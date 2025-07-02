import React from 'react'
import ContactForm from './ContactForm'
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { MdMarkEmailUnread } from 'react-icons/md';


const Contact = () => {
    return (
        <>
            <div className="banner-header section-padding back-position-center valign bg-img bg-fixed" data-overlay-dark="5" data-background="img/slider/15.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 caption mt-90">
                            <h5>Get in touch</h5>
                            <h1>Contact <span>Us</span></h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact --> */}
            <section className="contact section-padding">
                <div className="container">
                    <div className="row mb-90">
                        <div className="col-md-6 mb-60">
                            <h3>DITW HOLIDAYS</h3>
                            <p></p>
                            <div className="phone-call mb-30">
                                <div className="icon"><FaPhoneVolume /></div>
                                <div className="text">
                                    <p>Phone</p> <a href="tel:+91-9891777910">+91-9891777910</a>
                                </div>
                            </div>
                            <div className="phone-call mb-30">
                                <div className="icon"><MdMarkEmailUnread /></div>
                                <div className="text">
                                    <p>e-Mail Address</p> <a href="mailto:ops@ditwholidays.com">ops@ditwholidays.com</a>
                                </div>
                            </div>
                            <div className="phone-call">
                                <div className="icon"><FaLocationDot /></div>
                                <div className="text">
                                    <p>217A-B Block,  </p>Aya Nagar, Phase 4
                                    <br />New Delhi 110047
                                    India
                                </div>
                            </div>
                        </div>

                        <ContactForm />

                    </div>

                    <div className="row">
                        <div className="col-md-12 ">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14028.758217022032!2d77.12344833624277!3d28.473837572623367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f003fbb6f47%3A0x61a09eba790d819d!2sAya%20nagar%20phase%20-4!5e0!3m2!1sen!2sin!4v1739947765689!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: "none" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Contact