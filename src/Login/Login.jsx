import React, { useState } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  // Google-ով մուտք
  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await set(ref(db, 'users/' + user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSeen: new Date().toISOString()
      });

      console.log("Google-ով մուտքն հաջողվեց:", user);
    } catch (err) {
      if (err.code === 'auth/api-key-not-valid') {
        setError("Firebase API Key-ը սխալ է: Ստուգիր firebase.js ֆայլը:");
      } else if (err.code === 'auth/configuration-not-found') {
        setError("Google Auth-ը ակտիվացված չէ Firebase Console-ում:");
      } else {
        setError("Google մուտքի սխալ: " + err.message);
      }
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError("Լրացրեք բոլոր դաշտերը");
      return;
    }

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await set(ref(db, 'users/' + user.uid), {
          uid: user.uid,
          displayName: displayName || email.split('@')[0],
          email: user.email,
          photoURL: 'https://via.placeholder.com/150',
          lastSeen: new Date().toISOString()
        });

        console.log("Գրանցումն հաջողվեց:", user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Մուտքն հաջողվեց:", userCredential.user);
      }
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError("Էլ․ հասցեն կամ գաղտնաբառը սխալ է (կամ հաշիվը ստեղծվել է Google-ով):");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("Այս էլ․ հասցեով հաշիվ արդեն գոյություն ունի:");
      } else if (err.code === 'auth/weak-password') {
        setError("Գաղտնաբառը պետք է լինի առնվազն 6 նիշ:");
      } else {
        setError("Սխալ: " + err.message);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>{isRegister ? 'Ստեղծել հաշիվ' : 'Մուտք համակարգ'}</h2>

        {error && <p className="error-msg">{error}</p>}

        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          <FcGoogle size={22} />
          {isRegister ? 'Գրանցվել Google-ով' : 'Մուտք Google-ով'}
        </button>

        <div className="divider">
          <span>կամ</span>
        </div>

        <form onSubmit={handleEmailAuth}>
          {isRegister && (
            <div className="input-group">
              <label>Անուն</label>
              <input 
                type="text" 
                placeholder="Անուն Ազգանուն" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Էլ․ հասցե</label>
            <input 
              type="email" 
              placeholder="example@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Գաղտնաբառ</label>
            <input 
              type="password" 
              placeholder="******" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            {isRegister ? 'Գրանցվել' : 'Մուտք գործել'}
          </button>
        </form>

        <div className="toggle-mode">
          {isRegister ? (
            <p>
              Արդեն ունե՞ս հաշիվ: {' '}
              <span onClick={() => setIsRegister(false)}>Մուտք գործել</span>
            </p>
          ) : (
            <p>
              Չունե՞ս հաշիվ: {' '}
              <span onClick={() => setIsRegister(true)}>Գրանցվել</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;