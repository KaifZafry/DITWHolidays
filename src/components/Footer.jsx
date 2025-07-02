import React from 'react'
import { FaFacebook,FaInstagram, FaLocationDot, FaPhoneVolume, FaTwitter, FaYoutube } from 'react-icons/fa6'
import { MdMarkEmailUnread } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer clearfix">
    <div className="container">
       
        <div className="first-footer">
            <div className="row">
                <div className="col-md-12">
                    <div className="links dark footer-contact-links">
                        <div className="footer-contact-links-wrapper">
                            <div className="footer-contact-link-wrapper">
                                <div className="image-wrapper footer-contact-link-icon">
                                    <div className="icon-footer"> <FaPhoneVolume/> </div>
                                </div>
                                <div className="footer-contact-link-content">
                                    <h6>Call us</h6>
                                    <p><a href="tel:+919891777910">+91 98917 77910</a></p>
                                </div>
                            </div>
                            <div className="footer-contact-links-divider"></div>
                            <div className="footer-contact-link-wrapper">
                                <div className="image-wrapper footer-contact-link-icon">
                                    <div className="icon-footer"><MdMarkEmailUnread /> </div>
                                </div>
                                <div className="footer-contact-link-content">
                                    <h6>Write to us</h6>
                                    <p><a href="mailto:ops@ditwholidays.com">ops@ditwholidays.com</a></p>
                                </div>
                            </div>
                            <div className="footer-contact-links-divider"></div>
                            <div className="footer-contact-link-wrapper">
                                <div className="image-wrapper footer-contact-link-icon">
                                    <div className="icon-footer"> <FaLocationDot /> </div>
                                </div>
                                <div className="footer-contact-link-content">
                                    <h6>Address</h6>
                                    <p>217A-B Block, Aya Nagar, Phase 4 New Delhi 110047
                                        Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
        <div className="second-footer">
            <div className="row">
                
                <div className="col-md-4 widget-area">
                    <div className="widget clearfix">
                        <div className="footer-logo"> <img className="img-fluid foot-logo"  src="/assets/img/logo-light.png" alt=""/> </div>
                        <div className="widget-text">
                             <div className="social-icons">
                                <ul className="list-inline">
                                    <li><a href="#"><FaInstagram /></a></li>
                                    <li><a href="#"><FaTwitter /></a></li>
                                    <li><a href="#"><FaFacebook /></a></li>
                                    <li><a href="#"><FaYoutube /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-3 offset-md-1 widget-area">
                    <div className="widget clearfix usful-links">
                        <h3 className="widget-title">Quick Links</h3>
                        <ul>
                            <li><Link to="/about" >About</Link></li>
                            <li><Link to="/package">Packages</Link></li>
                            <li><Link to="/transfer" >Transfer</Link></li>
                            <li><Link to="/contact" >Contact</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="col-md-4 widget-area">
                    <div className="widget clearfix">
                        <h3 className="widget-title">Subscribe</h3>
                        <p>Sign up for our monthly blogletter to stay informed about travel and tours</p>
                        <div className="widget-newsletter">
                            <form action="#">
                                <input type="email" placeholder="Email Address" required/>
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="bottom-footer-text">
            <div className="row copyright">
                <div className="col-md-12">
                    <p className="mb-0">©2025 <a href="#">DITWHOLIDAYS</a>. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer