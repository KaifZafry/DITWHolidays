const DestinationCard = ({ title, image, pdf, description }) => {
    return (
        <div className="col-md-4">
        <a target="_blank" rel="noopener noreferrer" href={pdf}>
            <div className="item">
                <div className="position-re o-hidden"><img src={image} alt="" /></div>
                <div className="con">
                    <h5><span href={pdf}><i className="ti-location-pin"></i> {title}</span></h5>
                    <div className="line"></div>
                    <div className="row facilities">
                        <div className="col col-md-12">
                            <p>{description}</p>
                        </div>
                        <div className="col col-md-4 text-right">
                            <div className="permalink"><span href={pdf}>Explore <i className="ti-arrow-right"></i></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    );
  };
  
  export default DestinationCard;
  