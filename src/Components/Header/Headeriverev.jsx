import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaQuestionCircle, 
  FaGlobe, 
  FaSearch, 
  FaChevronDown 
} from 'react-icons/fa';
import UserMapModal from './UserMapModal'; 

function Headeriverev() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  // 📌 1. ԱՅՍՏԵՂ ԳՐԻՐ ՔՈ ԷՋԻ PATH-Ը (ՕՐԻՆԱԿ՝ "/about" ԿԱՄ "/about-us" ԿԱՄ "/about-general")
  const ABOUT_PAGE_PATH = "/about-general"; 

  return (
    <>
      <style>{`
        .HeaderIverevContainer {
          padding: 0px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          background-color: #ffffff;
        }
        .Link {
          display: flex;
          gap: 20px;
          font-family: 'Montserratarm-Regular', 'Helvetica', 'Arial', 'sans-serif';
          font-weight: normal;
          white-space: nowrap;
          height: 100%;
          align-items: center;
        }
        .Link a {
          text-decoration: none;
          color: #111111;
          transition: color 0.3s ease, border-color 0.3s ease;
          display: flex;
          align-items: center;
          height: 100%;
          box-sizing: border-box;
          border-top: 2px solid transparent;
        }
        .Link a:hover {
          color: rgba(127, 127, 127);
        }
        .Link a.active {
          color: #6400DC;
          border-top: 2px solid #6400DC;
          font-weight: 600;
        }
        .RightSide {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .DropdownWrapper {
          position: relative;
          padding: 10px 0;
        }
        .DropdownTrigger {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #6c11d9;
          font-weight: bold;
          font-size: 13px;
          cursor: pointer;
          user-select: none;
        }
        .DropdownMenu {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #ffffff;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 15px 20px;
          min-width: 200px;
          z-index: 100;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .DropdownWrapper:hover .DropdownMenu {
          display: flex;
        }

        .DropdownItem {
          font-weight: bold;
          color: #111111;
          font-size: 14px;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .PhoneItem {
          font-weight: bold;
          color: #111111;
          font-size: 14px;
          cursor: default;
          white-space: nowrap;
        }

        .CallOrder {
          font-weight: bold;
          color: #111111;
          font-size: 14px;
          margin-top: 5px;
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: none;
        }

        .Icons {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #333333;
        }
        .Icons a, .Icons button {
          color: inherit;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        @media screen and (max-width: 768px) {
          .HeaderIverevContainer {
            display: none !important;
          }
        }
      `}</style>

      <div className='HeaderIverevContainer'>
        <div className='Link'>
          <NavLink to="/" end><span>Անհատ</span></NavLink>
          <NavLink to="/business"><span>Բիզնես</span></NavLink>
          <NavLink to="/instant-payments"><span>Ակնթարթային վճարումներ</span></NavLink>
          
          <NavLink to={ABOUT_PAGE_PATH}><span>Մեր մասին</span></NavLink>
          
          <NavLink to="/news"><span>Նորություններ</span></NavLink>
        </div> 

        <div className='RightSide'>
          <div className='DropdownWrapper'>
            <div className='DropdownTrigger'>
              <span>Առցանց հայտեր</span>
              <FaChevronDown style={{ fontSize: '10px' }} />
            </div>

            <div className='DropdownMenu'>
              <Link to="/online-application-1" className='DropdownItem'>Հայտ 1</Link>
              <Link to="/online-application-2" className='DropdownItem'>Հայտ 2</Link>
              <Link to="/online-application-3" className='DropdownItem'>Հայտ 3</Link>
            </div>
          </div>

          <div className='DropdownWrapper'>
            <div className='DropdownTrigger'>
              <span>Հետադարձ կապ</span>
              <FaChevronDown style={{ fontSize: '10px' }} />
            </div>

            <div className='DropdownMenu'>
              <span className='PhoneItem'>+374 10 605555</span>
              <span className='PhoneItem'>+374 98 205555</span>
              <span className='PhoneItem'>+374 99 605555</span>
              <span className='PhoneItem'>8444</span>
              <Link to="/order-call" className='CallOrder'>Պատվիրել զանգ</Link>
            </div>
          </div>

          <div className='Icons'>
            <Link to="/locations"><FaMapMarkerAlt /></Link>
            <Link to="/faq"><FaQuestionCircle /></Link>
            <button type="button" onClick={() => setIsMapOpen(true)} title="Քարտեզ">
              <FaGlobe />
            </button>
            <button type="button"><FaSearch /></button>
          </div>
        </div>
      </div>

      {isMapOpen && <UserMapModal onClose={() => setIsMapOpen(false)} />}
    </> 
  );
}

export default Headeriverev;