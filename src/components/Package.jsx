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
    {
    title: " Malaysia & Thailand",
    image: "/assets/img/destination/Malaysia.jpg",
    pdf: "/assets/pdf/06 Days-Malaysia & Thailand.pdf",
    description: "06 Days - Malaysia & Thailand"
  },
  {
    title: " Singapore Malaysia Thailand",
    image: "/assets/img/destination/Thailand-1.jpg",
    pdf: "/assets/pdf/08 Days Singapore-Malaysia-Thailand.pdf",
    description: "08 Days - Singapore Malaysia Thailand"
  },
  {
    title: " Macau & Hong Kong",
    image: "/assets/img/destination/Hong-kong-1.jpg",
    pdf: "/assets/pdf/07 Days-Macau & HongKong.pdf",
    description: "07 Days - Macau & Hong Kong"
  },
  {
    title: " Thailand",
    image: "/assets/img/destination/Thailand-2.jpg",
    pdf: "/assets/pdf/07 Days-Thailand.pdf",
    description: "07 Days - Thailand"
  },
  {
    title: "Iceland & Finland",
    image: "/assets/img/destination/Finland-1.jpg",
    pdf: "/assets/pdf/08 Days Iceland & Finland.pdf",
    description: "08 Days - Iceland & Finland"
  },
  {
    title: "Swiss with Paris",
    image: "/assets/img/destination/Switzerland-4.jpg",
    pdf: "/assets/pdf/08 Days Swiss with Paris.pdf",
    description: "08 Days - Swiss with Paris"
  },
  {
    title: "Iceland",
    image: "/assets/img/destination/Iceland-1.jpg",
    pdf: "/assets/pdf/08 Days-Iceland.pdf",
    description: "08 Days - Iceland"
  },
  {
    title: "Finland",
    image: "/assets/img/destination/Finland-2.jpg",
    pdf: "/assets/pdf/08 Days-Finland.pdf",
    description: "08 Days - Finland"
  },
  {
    title: " Switzerland & France",
    image: "/assets/img/destination/Switzerland-3.jpg",
    pdf: "/assets/pdf/08 Days-Switzerland & France.pdf",
    description: "08 Days - Switzerland & France"
  },
  {
    title: " Singapore with Cruise",
    image: "/assets/img/destination/Singapore-cruise.jpg",
    pdf: "/assets/pdf/08 Days-Singapore with Cruise.pdf",
    description: "08 Days - Singapore with Cruise"
  },
  {
    title: " Eastern Europe: Czech, Austria, Slovakia, Hungary",
    image: "/assets/img/destination/Eastern-europe.jpg",
    pdf: "/assets/pdf/09 Days Eastern Europe- Czech Republic-Austria-Slovakia-Hungary.pdf",
    description: "09 Days - Eastern Europe: Czech, Austria, Slovakia, Hungary"
  },
  {
    title: " Indonesia",
    image: "/assets/img/destination/Indonesia.jpg",
    pdf: "/assets/pdf/09 Days- Indonesia.pdf",
    description: "09 Days - Indonesia"
  },
  {
    title: " Australia",
    image: "/assets/img/destination/australia-3.jpg",
    pdf: "/assets/pdf/09 Days Australia.pdf",
    description: "09 Days - Australia"
  },
  {
    title: " Eastern Europe: Austria & Czech Republic",
    image: "/assets/img/destination/spain.png",
    pdf: "/assets/pdf/09 Days-Eastern Europe-Austia & Czech Republic.pdf",
    description: "09 Days - Eastern Europe: Austria & Czech Republic"
  },
  {
    title: " Europe: Switzerland & France",
    image: "/assets/img/destination/Paris-1.jpg",
    pdf: "/assets/pdf/10 Days-Europe-Switzerland & France.pdf",
    description: "10 Days - Europe: Switzerland & France"
  },
  {
    title: " Norway",
    image: "/assets/img/destination/Norway-1.jpg",
    pdf: "/assets/pdf/12 Days Norway.pdf",
    description: "12 Days - Norway"
  },
  {
    title: "Spain",
    image: "/assets/img/destination/Spain.jpg",
    pdf: "/assets/pdf/12 Days-Spain.pdf",
    description: "12 Days - Spain"
  },
  {
    title: "Western Europe: France, Netherlands, Germany, Switzerland",
    image: "/assets/img/destination/Germany.jpg",
    pdf: "/assets/pdf/12 Days-Western Europe-France-Netherlands-Germany-Switzerland.pdf",
    description: "12 Days - Western Europe: France, Netherlands, Germany, Switzerland"
  },
  {
    title: "Europe: Italy, Greece, Netherlands",
    image: "/assets/img/destination/australia-2.jpg",
    pdf: "/assets/pdf/13 Days- Europe- Italy-Greece-Netherlands.pdf",
    description: "13 Days - Europe: Italy, Greece, Netherlands"
  },
  {
    title: "Europe: Spain, Portugal",
    image: "/assets/img/destination/Spain-2.jpg",
    pdf: "/assets/pdf/13 Days-Europe-Spain-Portugal.pdf",
    description: "13 Days - Europe: Spain, Portugal"
  },
  {
    title: "UK & Ireland",
    image: "/assets/img/destination/eastern_europe1.jpg",
    pdf: "/assets/pdf/12 Days UK & Ireland.pdf",
    description: "12 Days - UK & Ireland"
  },
  {
    title: "Europe: Czech Republic, Germany",
    image: "/assets/img/destination/Germany-2.jpg",
    pdf: "/assets/pdf/14 Days-Europe-Czech Republic-Germany-Switzerland.pdf",
    description: "14 Days - Europe: Czech Republic, Germany"
  },
  {
    title: "Europe: Switzerland & France",
    image: "/assets/img/destination/switzerland.jpg",
    pdf: "/assets/pdf/14 Days-Europe-Switzerland & France.pdf",
    description: "14 Days - Europe: Switzerland & France"
  },
  {
    title: "Greece & Italy",
    image: "/assets/img/destination/Greece.jpg",
    pdf: "/assets/pdf/15 Days Greece & Italy.pdf",
    description: "15 Days - Greece & Italy"
  },
  {
    title: "Europe: Italy, Switzerland, France",
    image: "/assets/img/destination/Italy-1.jpg",
    pdf: "/assets/pdf/15 Days-Europe-Italy-Switzerland-France.pdf",
    description: "15 Days - Europe: Italy, Switzerland, France"
  },
  {
    title: "UK, France, Switzerland, Italy",
    image: "/assets/img/destination/italy1.jpg",
    pdf: "/assets/pdf/17 Days-UK-France-Switzerland-Italy.pdf",
    description: "17 Days - UK, France, Switzerland, Italy"
  },
   {
    title: "Spain, Portugal, Italy",
    image: "/assets/img/destination/Portugal.jpg",
    pdf: "/assets/pdf/16 Days-Spain-Portugal-Italy.pdf",
    description: "16 Days - Spain, Portugal, Italy"
  },
  {
    title: "Italy, Czech, Netherland, France, UK",
    image: "/assets/img/destination/Italy-3.jpg",
    pdf: "/assets/pdf/18 Days-Italy-Czech-Netherland-France-UK.pdf",
    description: "18 Days - Italy, Czech, Netherland, France, UK"
  },
  {
    title: "South East Europe-Hungary-Croatia-Albania-Serbia-Bulgaria",
    image: "/assets/img/destination/Hungary.jpg",
    pdf: "/assets/pdf/22 Days-South East Europe-Hungary-Croatia-Albania-Serbia-Bulgaria.pdf",
    description: "22 Days - South East Europe: Hungary, Croatia, Albania"
  },
  {
    title: "Eastern and South East Europe-Hungary-Czech Republic-Serbia-Croatia-Albania-Turkey",
    image: "/assets/img/destination/serbia.jpg",
    pdf: "/assets/pdf/26 Days-Eastern and South East Europe-Hungary-Czech Republic-Serbia-Croatia-Albania-Turkey.pdf",
    description: "26 Days - Eastern and South East Europe: Hungary, Czech Republic"
  }

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