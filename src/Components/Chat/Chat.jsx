import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../firebase';
import { ref, onValue, push, set, remove, onChildAdded } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  FaPaperPlane, 
  FaMicrophone, 
  FaStop, 
  FaPhone, 
  FaVideo, 
  FaPhoneSlash, 
  FaMicrophoneSlash,
  FaPhoneAlt
} from 'react-icons/fa';
import './Chat.css';

const ICE_SERVERS = {
  iceServers: [
    { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
  ]
};

function Chat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const pcRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        set(ref(db, `users/${user.uid}/status`), 'online');

        const callRef = ref(db, `calls/${user.uid}`);
        onValue(callRef, (snapshot) => {
          const callData = snapshot.val();
          if (callData && callData.status === 'calling') {
            setIncomingCall(callData);
          } else if (!callData) {
            setIncomingCall(null);
            if (pcRef.current) cleanupWebRTC();
            setActiveCall(null);
          }
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, activeCall]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, activeCall]);

  useEffect(() => {
    if (!currentUser) return;
    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredUsers = Object.keys(data)
          .map((key) => ({ uid: key, ...data[key] }))
          .filter((u) => u.uid !== currentUser.uid);
        setUsers(filteredUsers);
      } else {
        setUsers([]);
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  // 4. Նամակագրություն
  useEffect(() => {
    if (!currentUser || !selectedUser) return;
    const chatId = currentUser.uid < selectedUser.uid 
      ? `${currentUser.uid}_${selectedUser.uid}` 
      : `${selectedUser.uid}_${currentUser.uid}`;

    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.keys(data).map((key) => data[key]));
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser || !currentUser) return;

    const chatId = currentUser.uid < selectedUser.uid 
      ? `${currentUser.uid}_${selectedUser.uid}` 
      : `${selectedUser.uid}_${currentUser.uid}`;

    push(ref(db, `chats/${chatId}/messages`), {
      senderId: currentUser.uid,
      text: text,
      type: 'text',
      timestamp: Date.now()
    });

    setText('');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => sendAudioMessage(reader.result);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Միկրոֆոնի թույլտվություն չկա: " + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const sendAudioMessage = (audioUrl) => {
    if (!selectedUser || !currentUser) return;
    const chatId = currentUser.uid < selectedUser.uid 
      ? `${currentUser.uid}_${selectedUser.uid}` 
      : `${selectedUser.uid}_${currentUser.uid}`;

    push(ref(db, `chats/${chatId}/messages`), {
      senderId: currentUser.uid,
      audioUrl: audioUrl,
      type: 'audio',
      timestamp: Date.now()
    });
  };

  // WebRTC Զանգերի Կարգավորում
  const setupWebRTC = async (isCaller, targetUid, callType) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    pcRef.current = pc;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: callType === 'video',
      audio: true
    });
    setLocalStream(stream);

    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    const candidatesQueue = [];
    const candidatePath = isCaller 
      ? `calls/${targetUid}/callerCandidates` 
      : `calls/${currentUser.uid}/receiverCandidates`;

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        push(ref(db, candidatePath), e.candidate.toJSON());
      }
    };

    if (isCaller) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      await set(ref(db, `calls/${targetUid}`), {
        callerId: currentUser.uid,
        callerName: currentUser.displayName || 'Անանուն',
        callerPhoto: currentUser.photoURL || '',
        type: callType,
        status: 'calling',
        offer: { type: offer.type, sdp: offer.sdp }
      });

      const answerRef = ref(db, `calls/${targetUid}/answer`);
      onValue(answerRef, async (snapshot) => {
        const answer = snapshot.val();
        if (answer && !pc.currentRemoteDescription) {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
          while (candidatesQueue.length > 0) {
            const cand = candidatesQueue.shift();
            await pc.addIceCandidate(cand);
          }
        }
      });

      const remoteCandidatesRef = ref(db, `calls/${targetUid}/receiverCandidates`);
      onChildAdded(remoteCandidatesRef, async (snapshot) => {
        const candidate = snapshot.val();
        if (candidate) {
          const cand = new RTCIceCandidate(candidate);
          if (pc.remoteDescription) {
            await pc.addIceCandidate(cand);
          } else {
            candidatesQueue.push(cand);
          }
        }
      });

    } else {
      const callSnapshotRef = ref(db, `calls/${currentUser.uid}`);
      onValue(callSnapshotRef, async (snapshot) => {
        const callData = snapshot.val();
        if (callData && callData.offer && !pc.currentRemoteDescription) {
          await pc.setRemoteDescription(new RTCSessionDescription(callData.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          await set(ref(db, `calls/${currentUser.uid}/answer`), {
            type: answer.type,
            sdp: answer.sdp
          });

          while (candidatesQueue.length > 0) {
            const cand = candidatesQueue.shift();
            await pc.addIceCandidate(cand);
          }
        }
      }, { onlyOnce: true });

      const remoteCandidatesRef = ref(db, `calls/${currentUser.uid}/callerCandidates`);
      onChildAdded(remoteCandidatesRef, async (snapshot) => {
        const candidate = snapshot.val();
        if (candidate) {
          const cand = new RTCIceCandidate(candidate);
          if (pc.remoteDescription) {
            await pc.addIceCandidate(cand);
          } else {
            candidatesQueue.push(cand);
          }
        }
      });
    }
  };

  const startCall = async (type) => {
    if (!selectedUser) return;
    setActiveCall({ type, role: 'caller', target: selectedUser });
    await setupWebRTC(true, selectedUser.uid, type);
  };

  const acceptCall = async () => {
    if (!incomingCall) return;
    setActiveCall({ type: incomingCall.type, role: 'receiver', target: incomingCall });
    setIncomingCall(null);
    await setupWebRTC(false, currentUser.uid, incomingCall.type);
  };

  const endCall = async () => {
    if (activeCall?.target?.uid) {
      await remove(ref(db, `calls/${activeCall.target.uid}`));
    }
    await remove(ref(db, `calls/${currentUser.uid}`));
    cleanupWebRTC();
  };

  const cleanupWebRTC = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    setActiveCall(null);
    setIncomingCall(null);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="chat-login-warning">
        <p>Չաթից օգտվելու համար խնդրում ենք մուտք գործել համակարգ։</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Օգտատերեր</h3>
        <div className="users-list">
          {users.map((u) => (
            <div 
              key={u.uid} 
              className={`user-card ${selectedUser?.uid === u.uid ? 'active' : ''}`}
              onClick={() => setSelectedUser(u)}
            >
              <div className="avatar-wrapper">
                <img src={u.photoURL || 'https://via.placeholder.com/40'} alt="avatar" />
                <span className={`status-indicator ${u.status === 'online' ? 'online' : ''}`}></span>
              </div>
              <div className="user-info">
                <h4>{u.displayName || 'Անանուն'}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="header-user">
                <img src={selectedUser.photoURL || 'https://via.placeholder.com/40'} alt="avatar" />
                <h4>{selectedUser.displayName || 'Անանուն'}</h4>
              </div>
              <div className="call-actions">
                <button type="button" onClick={() => startCall('audio')} title="Ձայնային զանգ">
                  <FaPhone />
                </button>
                <button type="button" onClick={() => startCall('video')} title="Վիդեոզանգ">
                  <FaVideo />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message-bubble ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}
                >
                  {msg.type === 'audio' ? (
                    <audio controls src={msg.audioUrl} className="audio-player" />
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <button 
                type="button" 
                className={`icon-btn mic-btn ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>

              <input 
                type="text" 
                placeholder={isRecording ? "Ձայնագրվում է..." : "Գրեք հաղորդագրություն..."} 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                disabled={isRecording}
              />

              <button type="submit" className="send-btn" disabled={isRecording}>
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Ընտրեք օգտատիրոջ՝ զրույցը սկսելու համար</p>
          </div>
        )}
      </div>

      {incomingCall && !activeCall && (
        <div className="call-modal-overlay">
          <div className="incoming-call-card">
            <img src={incomingCall.callerPhoto || 'https://via.placeholder.com/80'} alt="caller" />
            <h3>{incomingCall.callerName}</h3>
            <p>{incomingCall.type === 'video' ? 'Վիդեոզանգ...' : 'Ձայնային զանգ...'}</p>
            <div className="incoming-actions">
              <button type="button" className="btn-accept" onClick={acceptCall}>
                <FaPhoneAlt /> Պատասխանել
              </button>
              <button type="button" className="btn-reject" onClick={endCall}>
                <FaPhoneSlash /> Մերժել
              </button>
            </div>
          </div>
        </div>
      )}

      {activeCall && (
        <div className="call-modal-overlay">
          <div className="call-modal">
            <div className="call-modal-header">
              <h3>{activeCall.type === 'video' ? 'Վիդեոզանգ' : 'Ձայնային զանգ'}</h3>
              <p>{activeCall.target?.displayName || activeCall.target?.callerName}</p>
            </div>

            <div className="video-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {activeCall.type === 'audio' && (
                <div className="audio-call-avatar" style={{ position: 'absolute', zIndex: 2 }}>
                  <img 
                    src={activeCall.target?.photoURL || activeCall.target?.callerPhoto || 'https://via.placeholder.com/100'} 
                    alt="User" 
                  />
                </div>
              )}

              {activeCall.type === 'video' && (
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    right: '20px', 
                    width: '110px', 
                    height: '150px', 
                    borderRadius: '12px', 
                    border: '2px solid #ffffff', 
                    objectFit: 'cover',
                    zIndex: 10,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                  }}
                />
              )}
            </div>

            <div className="call-controls">
              <button 
                type="button" 
                className={`call-control-btn ${isMuted ? 'muted' : ''}`}
                onClick={toggleMute}
              >
                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button type="button" className="call-control-btn end-call" onClick={endCall}>
                <FaPhoneSlash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;