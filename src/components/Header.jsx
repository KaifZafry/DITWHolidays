import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="position-fixed top-0 left-0 w-100 shadow-sm" style={{ background: '#000000ad', zIndex: '100' }}>
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="d-flex align-items-center">
          <img src="assets/img/logo-light.png" alt="logo" className="logo foot-logo" style={{ width: '120px' }} />
        </Link>
        <nav className="d-none d-md-flex">
          {['/', '/about', '/services', '/package', '/rail', '/transfer', '/contact'].map((path) => (
            <Link
              key={path}
              to={path}
              className={`nav-link text-white mx-2 ${location.pathname === path ? 'active' : ''}`}
            >
              {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
        </nav>
        <div className="d-flex align-items-center">
          <Link to="/contact" className="btn btn-primary d-none d-md-inline-block me-2">
            Get a Quote
          </Link>
          <button className="navbar-toggler d-md-none" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"><img src="/assets/img/icons/hamburger.png" alt="" /></span>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-white shadow-sm d-md-none">
          <ul className="list-unstyled m-0 p-3">
            {['/', '/about', '/services', '/package', '/rail', '/transfer', '/contact'].map((path) => (
              <li key={path} className="mb-2">
                <Link
                  to={path}
                  className={`text-dark ${location.pathname === path ? 'fw-bold' : ''}`}
                  onClick={toggleMenu}
                >
                  {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
