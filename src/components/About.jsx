import React from 'react'

const About = () => {
  return (
    <>
    <div className="banner-header section-padding valign bg-img bg-fixed back-position-center" data-overlay-dark="5"
    data-background="/assets/img/slider/15.jpg">
    <div className="container">
        <div className="row">
            <div className="col-md-7 caption mt-90">
                <h5>The best travel agency</h5>
                <h1>We helping you find <span>your dream</span> vacation</h1>
            </div>
        </div>
    </div>
</div>

<section className="about cover section-padding">
    <div className="container">

        <div className="row">
            <div className="col-md-6 mb-30 ">
                DITW Holidays is based in New Delhi and provides the highest quality travel services to travelers
                from all over the world. We have 13 years’ expertise in the travel and tourism industry. We
                specialize in outbound customized holiday packages.
                We understand the expectations of foreign business travelers and adapt our services to exceed them.
                With local operations covering the bulk of our destinations, we have personal knowledge of each
                distinct region and its transportation infrastructure, ensuring timely, professional service
                regardless of location.
                From top to bottom, our company is dedicated to customer experience excellence. This culture is
                nurtured through professional operational management,
                Working with us affords visitors to any Destination greater travel flexibility – you control where
                and when you go efficiently, safely, and comfortably. With our comprehensive range of services, we
                ensure you, your guests or clients enjoy a smooth journey throughout.
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
                    <div className="icon"><span className="flaticon-phone-call"></span></div>
                    <div className="text">
                        <p>For information</p><a href="tel:+919891777910">+91 98917 77910</a>
                    </div>
                </div>
            </div>
            <div className="col-md-5 offset-md-1 " >
                <div className="img-exp">
                    <div className="about-img">
                        <div className="img"> <img src="/assets/img/about2.png" className="img-fluid" alt=""/> </div>
                    </div>
                    <div id="circle">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px"
                            viewBox="0 0 300 300" enableBackground="new 0 0 300 300" xmlSpace="preserve">
                            <defs>
                                <path id="circlePath"
                                    d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 " />
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

<section>
    <div className="container">
        <div className="section-subtitle text-center">
            <h2>Our Core Values</h2>
        </div>
        <div className="row">

            <div className="col-md-4">
                <div className=" card provide-world__card nb3-bg px-3 mb-3 text-center cus-rounded-1 pt-3 ">
                    <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                        <img src="/assets/img/icons/travel.png" alt=""/>
                    </span>

                    <p>All Travel Related Solution Under one roof, with good price and Service.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className=" card provide-world__card nb3-bg px-3  mb-3 text-center cus-rounded-1 pt-3 ">
                    <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                        <img src="/assets/img/icons/budget.png" alt=""/>
                    </span>

                    <p> We design your plan as per your Budget or Comfort.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className=" card provide-world__card nb3-bg px-3 mb-3 text-center cus-rounded-1 pt-3 ">
                    <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                        <img src="/assets/img/icons/support.png" alt=""/>
                    </span>

                    <p>Quick response with inquiry. Can help planning itinerary.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className=" card provide-world__card px-3 mb-3 nb3-bg text-center cus-rounded-1 pt-3 ">
                    <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                        <img src="/assets/img/icons/transportation.png" alt=""/>
                    </span>

                    <p> We have private transport and tour packages with great services and reasonable price.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className=" card provide-world__card nb3-bg px-3 mb-3 text-center cus-rounded-1 pt-3 ">
                    <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                        <img src="/assets/img/icons/vendor.png" alt=""/>
                    </span>

                    <p>We have Direct Contract with our Local vendor each and every destination. </p>
                </div>
            </div>

        </div>
    </div>
</section>
</>
  )
}

export default About