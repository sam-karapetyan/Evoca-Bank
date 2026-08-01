import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';

function UserMapModal({ onClose }) {
  const [users, setUsers] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    let intervalId;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const sendLocation = () => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                set(ref(db, `users/${user.uid}/location`), {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                  updatedAt: Date.now()
                });
              },
              (err) => console.log('Geolocation error:', err),
              { enableHighAccuracy: true }
            );
          }
        };

        sendLocation(); 
        intervalId = setInterval(sendLocation, 3000); 
      }
    });

    return () => {
      unsubscribe();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => initMap();
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (!window.L || mapInstanceRef.current || !mapRef.current) return;

    const map = window.L.map(mapRef.current).setView([40.1792, 44.4991], 12);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;
  };

  useEffect(() => {
    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.keys(data).map(key => ({
          uid: key,
          ...data[key]
        }));
        setUsers(userList);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    users.forEach(u => {
      if (u.location && u.location.lat && u.location.lng) {
        const customIcon = window.L.divIcon({
          className: 'custom-user-marker',
          html: `
            <div style="
              width: 38px; 
              height: 38px; 
              border-radius: 50%; 
              border: 3px solid ${u.status === 'online' ? '#4caf50' : '#888'}; 
              overflow: hidden; 
              background: #fff;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            ">
              <img src="${u.photoURL || 'https://via.placeholder.com/40'}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        if (markersRef.current[u.uid]) {
          markersRef.current[u.uid].setLatLng([u.location.lat, u.location.lng]);
        } else {
          const marker = window.L.marker([u.location.lat, u.location.lng], { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<b>${u.displayName || 'Անանուն'}</b><br/>Կարգավիճակ՝ ${u.status === 'online' ? 'Օնլայն 🟢' : 'Օֆլայն ⚪'}`);
          
          markersRef.current[u.uid] = marker;
        }
      }
    });
  }, [users]);

  return (
    <div className="map-modal-overlay">
      <div className="map-modal-container">
        <div className="map-modal-header">
          <h3>Օգտատերերի տեղադրությունը քարտեզի վրա (Real-time)</h3>
          <button type="button" onClick={onClose} className="map-close-btn">
            <FaTimes />
          </button>
        </div>
        <div className="map-body" ref={mapRef} id="map"></div>
      </div>

      <style>{`
        .map-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          z-index: 99999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .map-modal-container {
          width: 90%;
          max-width: 1000px;
          height: 80vh;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .map-modal-header {
          padding: 15px 20px;
          background: #6c11d9;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .map-modal-header h3 {
          margin: 0;
          font-size: 16px;
        }
        .map-close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        .map-body {
          flex: 1;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default UserMapModal;