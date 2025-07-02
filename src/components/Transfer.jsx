import React, { useState } from "react";
import countryData from "../utils/countryData";


const Transfer = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <>
      <div className="banner-header section-padding valign bg-img bg-fixed back-position-center" data-overlay-dark="6" >
        <div className="container">
          <div className="row">
            <div className="col-md-12 caption mt-90">
              <h5>Choose your destination</h5>
              <h1>Transfer <span>Details</span></h1>
            </div>
          </div>
        </div>
      </div>
      <section className="destination1 section-padding Rail">
        <div className="container">
          <div className="row justify-content-center">
            {Object.keys(countryData).map((country) => (
              <div key={country} className="col-md-2 col-6">
                <div
                  className="card provide-world__card nb3-bg px-3 mb-3 text-center cus-rounded-1 pt-2"
                  onClick={() => setSelectedCountry(country)}
                  style={{ cursor: "pointer" }}
                >
                  <span>{country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCountry && (
        <section className="destination1 transfer-det mb-5">
          <div className="container">
            <h3 className="text-center">Transfer Details for {selectedCountry}</h3>
            <div className="row justify-content-center">
              {countryData[selectedCountry].map((item, index) => (
                <div className="col-md-8 mb-3" key={index}>

                  <div className="transfer-card border-1">
                    <h6 className="mb-3" style={{color:'#0c6228'}}>{item.title}</h6>
                    <div className="row">
                      <div className="col-2">
                        <div className="SRM_4e7f56f4">
                          <img width="60" src="/assets/img/icons/sedan.png" alt="" />
                        </div>
                      </div>
                      <div className="col-9">
                        <div className="d-flex flex-md-row flex-column justify-content-between ">
                          <div className="">
                            <div className="d-flex gap-2">
                              <h5>Car type:</h5>
                              <h6>{item.carType}</h6>
                            </div>

                            <h6>{item.price.join(" / ")}</h6>

                          </div>
                          <div className=" img-20">
                            <div className="d-flex gap-4">
                              <div className="d-flex gap-2">
                                <div>
                                  <img width="16" src="/assets/img/icons/manager.png" alt="" />
                                </div>

                                <p>{item.pax}</p>
                              </div>
                              {
                                item.luggage &&  <div className="d-flex gap-2">
                                <div>
                                  <img width="16" src="/assets/img/icons/suitcase.png" alt="" />
                                </div>

                                <p> {item.luggage} suitcases</p>
                              </div>
                              }
                             
                            </div>
                          </div>
                        </div>
                        <div className="img-20">
                          <div>
                            <img width="16" src="/assets/img/icons/free.png" alt="" />
                            <span className="ms-3">Free Cancelation</span>

                          </div>
                          <div>
                            <img width="16" src="/assets/img/icons/welcome.png" alt="" />
                            <span className="ms-3">Meet and Greet </span>

                          </div>

                        </div>


                      </div>
                    </div>

                  </div>
                </div>

              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding text-center">
        <div className="container">
          
          <p><span className="font-bold text-dark">Note: </span>Call your driver after landing to agree upon a meeting place. Make sure that your phone is turned on so that the carrier can reach you. And driver will wait outside arrival exit area with placard on your name.
            We will send you driver details on your mobile number minimum 04 hrs. Before arrival.
            Delayed flights won't cause problems for your ride, as long as the carrier knows the flight number. The carrier will wait for up to 1 hour after you landed. Then, the carrier has the choice to go back home or charge waiting fee.
            Free Waiting time 60 minutes after the actual landing time. This also takes any delay of your flight into account. After 60 minutes of waiting, the driver may ask waiting Charge.
          </p>
        </div>
      </section>
    </>
  );
};

export default Transfer;
