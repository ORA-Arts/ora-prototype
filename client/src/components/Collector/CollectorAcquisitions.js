import React, {useState, useEffect} from "react";
import "./CollectorAcquisitions.css";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { fetchAllAcquisitions } from '../../api/service';

const CollectorAcquisitions = (props) => {

  const [acquisitions, setAcquisitions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resAcquisitions = await fetchAllAcquisitions();
      setAcquisitions(resAcquisitions);
    }
    fetchData();
  }, []);

  return (
  <div className="app-container-collector-acquisitions">
    <div className="collector-container-acquisitions">
      <div className="collector-acquisitions-header">
        <div className="collector-acquisitions-name">
          LISA ABRAHAM
        </div>
        <div>
            <button className="btn-request">MAKE A PRIVATE SALE</button>
            <button className="btn-request">REQUEST A SPECIAL SOURCING</button>
        </div>
        
      </div>
      <div className="container-acquisitions-content">
        <CollectorSideBar content="my-acquisitions"/>
        <div className="collector-acquisitions">
            <div className="acquisitions-status-bar">
                
                
            </div>
            <div>
                { acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
                    return (
                        <div className="acquisitions-pending-item">
                            <span className="status">PENDING</span>
                            <span>{acquisition.gallery.name}</span>
                            <span>{acquisition.preferredArtist ? acquisition.preferredArtist : "No Preferred artist"}</span>
                            <span>{acquisition.medium}</span>
                            <span>{acquisition.budget}K</span>
                            <span>{Math.floor((Date.now() - (new Date(acquisition.createdAt)).getTime())/(100*60*60))} HOUR/S</span>
                            <span>OPEN</span>
                        </div>
                    )
                }) : null }
                
                <div className="acquisitions-status-bar">

                </div>
            </div>
            
      </div>
    </div>
  </div>
  </div>
  );
};

export default CollectorAcquisitions;
