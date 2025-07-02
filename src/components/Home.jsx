import React from 'react'
import OwlCarousel from "react-owl-carousel";
import { Link } from 'react-router-dom';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";

const Home = () => {
    const options = {
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      };

      const slides = [
        {
          imgSrc: "/assets/img/destination/australia-2.jpg",
          title: "Australia with Bali",
          pdfLink: "/assets/pdf/14 Days Australia with Bali 03N Melbourne 04N-Sydney-3N Cairns-3N Bali.pdf",
          description: "14 Days Australia with Bali 03N Melbourne 04N-Sydney-3N Cairns-3N Bali",
        },
        {
          imgSrc: "/assets/img/destination/singapore2.jpg",
          title: "Australia with Singapore",
          pdfLink: "./pdf/14 Days Australia with Singapore 04N Sydney-03N Melbourne-3N Gold Coast-3N Singapore.pdf",
          description: "14 Days Australia with Singapore 04N Sydney-03N Melbourne-3N Gold Coast-3N Singapore",
        },
        {
          imgSrc: "/assets/img/destination/baku.png",
          title: "Azerbaijan with Kazakhstan",
          pdfLink: "/assets/pdf/11 Days Azerbaijan with Kazakhastan-04N Baku-03N Astana-03N Almaty.pdf",
          description: "11 Days Azerbaijan with Kazakhastan-04N Baku-03N Astana-03N Almaty",
        },
        {
          imgSrc: "/assets/img/destination/singapore1.jpg",
          title: "Australia with Singapore",
          pdfLink: "/assets/pdf/11 Days Azerbaijan with Kazakhastan-04N Baku-03N Astana-03N Almaty.pdf",
          description: "13 Days Australia with Singapore 03N Melbourne-03N Sydney-3N Cairns-3N Singapore",
        },
        {
          imgSrc: "/assets/img/destination/georgia.jpg",
          title: "Georgia",
          pdfLink: "#",
          description: "05 Days Georgia-04 Tbilisi",
        },
        {
          imgSrc: "/assets/img/destination/australia-4.jpg",
          title: "Australia",
          pdfLink: "/assets/pdf/10 Days Australia 03N Sydney-03N Melbourne-3N Gold Coast.pdf",
          description: "10 Days Australia 03N Sydney-03N Melbourne-3N Gold Coast",
        },
      ];
  return (
    <div>
        <header className="header">
        <div className="video-fullscreen-wrap">
            
            <div className='h-100'>
                <div className="img-container h-100">
                  <div className='d-md-block d-none'>
                  <img src="/assets/img/bg2.jpg" alt="Header Image"/>
                  </div>
                  <div className='d-block d-md-none h-100'>
                  <img className='h-100' src="/assets/img/bg-1.jpg" alt="Header Image"/>
                  </div>
                    
                </div>
            </div>
            <div className="v-middle caption overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <h4>Let's travel the world with us</h4>
                               <h1><span>DITW Holidays</span></h1> 
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </header>

    <section className="about cover section-padding">
        <div className="container">
            
            <div className="row">
                <div className="col-md-6 mb-30 " data-animate-effect="fadeInUp">
                    <div className="section-subtitle">The best travel agency</div>
                    <div className="section-title">Discover the <span>world</span> with DITW Holidays</div>
                    <p>Discover the world through skillfully selected travel experiences suited to your specific preferences.</p>
                    <p>Our dedicated professionals ensure seamless journeys, offering unparalleled service and attention to detail.</p>
                    <p>Trust us to plan the ideal itinerary for an unforgettable experience.</p>
                    <ul className="list-unstyled about-list mb-30">
                        <li>
                            <div className="about-list-icon"> <span className="ti-check"></span> </div>
                            <div className="about-list-text">
                                <p>13+ Years of Experience</p>
                            </div>
                        </li>
                        <li>
                            <div className="about-list-icon"> <span className="ti-check"></span> </div>
                            <div className="about-list-text">
                                <p>150+ Tour Destinations</p>
                            </div>
                        </li>
                    </ul>
                   
                    <div className="phone-call mb-30">
                        <div className="icon"><FaPhoneVolume /></div>
                        <div className="text">
                            <p>For information</p> <a href="tel:+919891777910">+91 98917 77910</a>
                        </div>
                       
                    </div>
                    <div className="phone-call mb-30">
                        <div className="icon"><MdMarkEmailUnread /></div>
                        <div className="text">
                            <p>For information</p> <a href="mailto:ops@ditwholidays.com">ops@ditwholidays.com</a>
                        </div>
                       
                    </div>
                </div>
                <div className="col-md-5 offset-md-1 " data-animate-effect="fadeInUp">
                    <div className="img-exp position-relative">
                        <div className="about-img">
                            <div className="img"> <img src="/assets/img/about.png" className="img-fluid" alt=""/> </div>
                        </div>
                        <div id="circle">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enableBackground="new 0 0 300 300" xmlSpace="preserve">
                                <defs>
                                    <path id="circlePath" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 " />
                                </defs>
                                <circle cx="150" cy="100" r="75" fill="none" />
                                <g>
                                    <use xlinkHref="#circlePath" fill="none" />
                                    <text fill="#0f2454">
                                        <textPath xlinkHref="#circlePath"> . DITW HOLIDAYS . DITW HOLIDAYS </textPath>
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="destination1 bg-lightnav">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-subtitle">Top Destination</div>
                    <div className="section-title">Popular <span>Destination</span></div>
                </div>
            </div>
            <OwlCarousel className="owl-theme" {...options}>
        {slides.map((slide, index) => (
          <div className="item" key={index}>
            <div className="position-re o-hidden">
              <img src={slide.imgSrc} alt={slide.title} />
            </div>
            <div className="con">
              <h5>
                <a target="_blank" rel="noopener noreferrer" href={slide.pdfLink}>
                  <i className="ti-location-pin"></i> {slide.title}
                </a>
              </h5>
              <div className="line"></div>
              <div className="row facilities">
                <div className="col col-md-12">
                  <p>{slide.description}</p>
                </div>
                <div className="col col-md-4 text-right">
                  <div className="permalink">
                    <a target="_blank" rel="noopener noreferrer" href={slide.pdfLink}>
                      Explore <i className="ti-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
        </div>

        <div className='text-center mb-3'>
          <Link to="package" className='packages'><button>All Packages</button></Link>
        </div>
    </section>
    </div>
  )
}

export default Home