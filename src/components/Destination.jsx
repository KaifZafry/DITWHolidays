import { Link } from 'react-router-dom';

const DestinationCard = ({ title, image, pdf, link, description, actionLabel = 'Explore' }) => {
    const content = (
        <div className="item">
            <div className="position-re o-hidden"><img src={image} alt={title || ''} /></div>
            <div className="con">
                <h5><span><i className="ti-location-pin"></i> {title}</span></h5>
                <div className="line"></div>
                <div className="row facilities">
                    <div className="col col-md-12">
                        <p>{description}</p>
                    </div>
                    <div className="col col-md-4 text-right">
                        <div className="permalink"><span>{actionLabel} <i className="ti-arrow-right"></i></span></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="col-md-4">
        {link ? (
            <Link to={link}>{content}</Link>
        ) : (
            <a target="_blank" rel="noopener noreferrer" href={pdf}>{content}</a>
        )}
    </div>
    );
  };
  
  export default DestinationCard;
  
