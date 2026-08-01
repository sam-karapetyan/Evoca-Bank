import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function SlideDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const slide = location.state?.slide;

  if (!slide) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Տվյալները չեն գտնվել</h2>
        <button 
          onClick={() => navigate('/')}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Վերադառնալ գլխավոր էջ
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: 'none',
          background: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}
      >
        <FaArrowLeft /> Հետ
      </button>

      <div 
        style={{
          backgroundColor: slide.bg || '#ffffff',
          color: slide.textColor || '#121216',
          borderRadius: '30px',
          padding: '50px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h1 style={{ fontSize: '38px', marginBottom: '20px', lineHeight: '1.2' }}>
            {slide.title}
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0.9 }}>
            {slide.description}
          </p>
        </div>

        {slide.img && (
          <div style={{ flex: '1', minWidth: '280px', textAlign: 'center' }}>
            <img 
              src={slide.img} 
              alt={slide.title} 
              style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SlideDetail;