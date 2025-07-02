const destinations = [
    {
      title: "Australia with Bali",
      image: "/assets/img/destination/australia-2.jpg",
      pdf: "/assets/pdf/14 Days Australia with Bali 03N Melbourne 04N-Sydney-3N Cairns-3N Bali.pdf",
      description: "14 Days Australia with Bali 03N Melbourne 04N-Sydney-3N Cairns-3N Bali",
    },
    {
      title: "Australia with New Zealand",
      image: "/assets/img/destination/australia-1.jpg",
      pdf: "/assets/pdf/15 Days Australia with New Zealand-04N Sydney-03N Gold Coast-02N Auckland-02N Queenstown-01N Franz Josef-02N Christchurch.pdf",
      description: "15 Days Australia with New Zealand-04N Sydney-03N Gold Coast-02N Auckland-02N Queenstown-01N Franz Josef-02N Christchurch",
    },
    {
      title: "Australia with Singapore",
      image: "/assets/img/destination/singapore2.jpg",
      pdf: "/assets/pdf/14 Days Australia with Singapore 04N Sydney-03N Melbourne-3N Gold Coast-3N Singapore.pdf",
      description: "14 Days Australia with Singapore 04N Sydney-03N Melbourne-3N Gold Coast-3N Singapore",
    },
    {
      title: "Australia with Singapore",
      image: "/assets/img/destination/singapore1.jpg",
      pdf: "/pdf/13 Days Australia with Singapore 03N Melbourne-03N Sydney-3N Cairns-3N Singapore.pdf",
      description: "13 Days Australia with Singapore 03N Melbourne-03N Sydney-3N Cairns-3N Singapore",
    },
    {
      title: "Azerbaijan with Kazakhstan",
      image: "/assets/img/destination/baku.png",
      pdf: "/assets/pdf/11 Days Azerbaijan with Kazakhastan-04N Baku-03N Astana-03N Almaty.pdf",
      description: "11 Days Azerbaijan with Kazakhstan-04N Baku-03N Astana-03N Almaty",
    },
    {
      title: "Australia",
      image: "/assets/img/destination/australia-4.jpg",
      pdf: "/assets/pdf/10 Days Australia 03N Sydney-03N Melbourne-3N Gold Coast.pdf",
      description: "10 Days Australia 03N Sydney-03N Melbourne-3N Gold Coast",
    },
    {
      title: "Azerbaijan with Kazakhstan",
      image: "/assets/img/destination/amlaty.png",
      pdf: "/assets/pdf/08 Days Azerbaijan with Kazakhastan 04N Almaty-03N Baku.pdf",
      description: "08 Days Azerbaijan with Kazakhstan 04N Almaty-03N Baku",
    },
    {
      title: "Georgia",
      image: "/assets/img/destination/georgia.jpg",
      pdf: "/assets/pdf/05 Days Georgia-04 Tbilisi.pdf",
      description: "05 Days Georgia-04 Tbilisi",
    },
    {
      title: "Kazakhstan",
      image: "/assets/img/destination/canada1.jpg",
      pdf: "/assets/pdf/06 Days Kazakhastan-05N Almaty.pdf",
      description: "06 Days Kazakhstan-05N Almaty",
    },
    {
      title: "Austria with Czech-Germany-France-Netherland-Finland-London ",
      image: "/assets/img/destination/czech.png",
      pdf: "/assets/pdf/Austria-Czech-Germany-France-Netherland-Finland-London 25 Night 05Dec-30Dec -Anytime.pdf",
      description: "Austria-Czech-Germany-France-Netherland-Finland-London 25 Night 05Dec-30Dec -Anytime",
    },
    {
      title: "Central and Eastern Europe",
      image: "/assets/img/destination/centeral_europe1.png",
      pdf: "/assets/pdf/Central and Eastern Europe 09 Night.pdf",
      description: "Central and Eastern Europe 09 Night",
    },
    {
      title: "Central and Eastern Europe",
      image: "/assets/img/destination/eastern_europe1.jpg",
      pdf: "/assets/pdf/Central and Eastern Europe 10 Night.pdf",
      description: "Central and Eastern Europe 10 Night",
    },
    {
      title: " Eastern Europe",
      image: "/assets/img/destination/eastern_europe2.jpg",
      pdf: "/assets/pdf/Eastern Europe 12 Night.pdf",
      description: "Eastern Europe 12 Night",
    },
    {
      title: "Azerbaijan and Baku",
      image: "/assets/img/destination/baku.jpg",
      pdf: "/assets/pdf/05 Days Azerbaijan-04N Baku.pdf",
      description: "05 Days Azerbaijan-04N Baku",
    },
    {
      title: "Spain with Portugal and Italy",
      image: "/assets/img/destination/italy1.jpg",
      pdf: "/assets/pdf/Spain-Portugal-Italy 13 Night -31May-13Jun.pdf",
      description: "Spain-Portugal-Italy 13 Night -31May-13Jun",
    },
  ];
  
 
  


import React from 'react'
import ContactForm from './ContactForm'
import DestinationCard from './Destination'

const Package = () => {
    return (
        <>
            <div className="banner-header section-padding valign bg-img bg-fixed back-position-center" data-overlay-dark="6" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 caption mt-90">
                            <h5>Choose your destination</h5>
                            <h1>Popular <span>Packages</span></h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="destination1 section-padding">
                <div className="container">
                    <div className="row">
                       
                    {destinations.map((destination, index) => (
                        <DestinationCard key={index} {...destination} />
                    ))}
                     
                    </div>
                </div>
            </section>
            <section className="form section">
                <div className="container">
                    <div className="row justify-content-center">
                        <ContactForm />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Package