import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaQuestionCircle, 
  FaGlobe, 
  FaSearch, 
  FaBars, 
  FaTimes,
  FaChevronDown 
} from 'react-icons/fa';

function Headeriverev() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <style>{`
      .Container {
        padding: 0px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
      }
      .Link {
        display: flex;
        gap: 20px;
        font-family: 'Montserratarm-Regular', 'Helvetica', 'Arial', 'sans-serif';
        font-weight: normal;
        white-space: nowrap;
      }
      .Link a {
        text-decoration: none;
        color: #111111;
        transition: color 0.3s ease;
      }
      .Link a:hover {
        color: rgba(127, 127, 127);
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

      .DropdownItem:hover {
        color: #6c11d9;
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
      .CallOrder:hover {
        color: #6c11d9;
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

      /* Side Menu Overlay */
      .SideMenuOverlay {
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease-in-out;
      }

      .SideMenuOverlay.active {
        opacity: 1;
        visibility: visible;
      }

      /* Side Menu Main Drawer */
      .SideMenuContainer {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        max-width: 900px;
        height: 100vh;
        background-color: #1a1a24;
        z-index: 1001;
        display: flex;
        transition: right 0.4s ease-in-out;
        color: white;
      }

      .SideMenuContainer.active {
        right: 0;
      }

      .CloseBtn {
        position: absolute;
        top: 25px;
        right: 25px;
        font-size: 24px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1002;
      }

      /* Side Menu Content Structure */
      .SideMenuLeft {
        width: 35%;
        padding: 50px 30px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .SideMenuRight {
        width: 65%;
        background-color: #6c11d9;
        padding: 50px 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        overflow-y: auto;
      }

      .LeftMenuItem {
        font-size: 18px;
        font-weight: 600;
        color: #a0a0a0;
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .LeftMenuItem:hover, .LeftMenuItem.active {
        color: #a855f7;
      }

      .SectionTitle {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #ffffff;
      }

      .SectionItem {
        display: block;
        font-size: 14px;
        color: #e2d8f7;
        text-decoration: none;
        margin-bottom: 8px;
        transition: color 0.2s ease;
      }

      .SectionItem:hover {
        color: #ffffff;
      }

      /* Animation for sequential text drop in */
      @keyframes slideDownFade {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .SideMenuContainer.active .animate-item {
        animation: slideDownFade 0.4s forwards ease-out;
        opacity: 0;
      }

      .delay-1 { animation-delay: 0.2s !important; }
      .delay-2 { animation-delay: 0.3s !important; }
      .delay-3 { animation-delay: 0.4s !important; }
      .delay-4 { animation-delay: 0.5s !important; }
      .delay-5 { animation-delay: 0.6s !important; }
      .delay-6 { animation-delay: 0.7s !important; }
    `}</style>

      <div className='Container'>
        <div className='Link'>
          <Link to="/individual"><span>Անհատ</span></Link>
          <Link to="/business"><span>Բիզնես</span></Link>
          <Link to="/instant-payments"><span>Ակնթարթային վճարումներ</span></Link>
          <Link to="/about"><span>Մեր մասին</span></Link>
          <Link to="/news"><span>Նորություններ</span></Link>
          <Link to="/blog"><span>Բլոգ</span></Link>
          <Link to="/career"><span>Կարիերա</span></Link>
        </div> 

        <div className='RightSide'>
          {/* Առցանց հայտեր */}
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

          {/* Հետադարձ կապ */}
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
            <button><FaGlobe /></button>
            <button><FaSearch /></button>
            <button onClick={() => setIsMenuOpen(true)}><FaBars /></button>
          </div>
        </div>
      </div>

      {/* Side Menu Drawer & Overlay */}
      <div 
        className={`SideMenuOverlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className={`SideMenuContainer ${isMenuOpen ? 'active' : ''}`}>
        <button className='CloseBtn' onClick={() => setIsMenuOpen(false)}>
          <FaTimes />
        </button>

        {/* Ձախ կողմի մենյուն */}
        <div className='SideMenuLeft'>
          <Link to="/individual" className='LeftMenuItem animate-item delay-1'>Անհատ</Link>
          <Link to="/business" className='LeftMenuItem active animate-item delay-2'>Բիզնես</Link>
          <Link to="/instant-payments" className='LeftMenuItem animate-item delay-3'>Ակնթարթային վճարումներ</Link>
          <Link to="/about" className='LeftMenuItem animate-item delay-4'>Մեր մասին</Link>
          <Link to="/news" className='LeftMenuItem animate-item delay-5'>Նորություններ</Link>
          <Link to="/blog" className='LeftMenuItem animate-item delay-6'>Բլոգ</Link>
          <Link to="/career" className='LeftMenuItem animate-item delay-6'>Կարիերա</Link>
        </div>

        {/* Աջ մանուշակագույն բաժինը */}
        <div className='SideMenuRight'>
          <div className='animate-item delay-1'>
            <div className='SectionTitle'>Վարկեր</div>
            <Link to="/business-loans" className='SectionItem'>Բիզնես վարկեր</Link>
          </div>

          <div className='animate-item delay-2'>
            <div className='SectionTitle'>Լիզինգ</div>
            <Link to="/leasing" className='SectionItem'>Evoca Leasing</Link>
            <Link to="/special-offer" className='SectionItem'>Հատուկ առաջարկ</Link>
          </div>

          <div className='animate-item delay-3'>
            <div className='SectionTitle'>Հաշիվներ</div>
            <Link to="/accounts" className='SectionItem'>Հաշիվների բացում և սպասարկում</Link>
            <Link to="/metal-accounts" className='SectionItem'>Առարկայազուրկ մետաղական հաշիվներ</Link>
          </div>

          <div className='animate-item delay-4'>
            <div className='SectionTitle'>Ավանդներ</div>
            <Link to="/deposits" className='SectionItem'>Դասական ավանդ</Link>
          </div>

          <div className='animate-item delay-5'>
            <div className='SectionTitle'>Արժեթղթերի շուկա</div>
            <Link to="/investment" className='SectionItem'>Ներդրումային ծառայություններ</Link>
            <Link to="/bonds" className='SectionItem'>Պարտատոմսեր</Link>
          </div>

          <div className='animate-item delay-6'>
            <div className='SectionTitle'>Առևտրի ֆինանսավորում</div>
            <Link to="/guarantees" className='SectionItem'>Երաշխիք</Link>
            <Link to="/factoring" className='SectionItem'>Ֆակտորինգային ֆինանսավորում</Link>
          </div>
        </div>
      </div>
    </> 
  );
}

export default Headeriverev;