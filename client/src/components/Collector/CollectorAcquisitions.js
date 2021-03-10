import React, {useState, useEffect} from "react";
import "./CollectorAcquisitions.css";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { fetchAllAcquisitions } from '../../api/service';

const CollectorAcquisitions = (props) => {

  const [acquisitions, setAcquisitions] = useState([]);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    async function fetchData() {
      const resAcquisitions = await fetchAllAcquisitions();
      setAcquisitions(resAcquisitions);
    }
    fetchData();
  }, []);

    const pendingRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
        return (
            <div className="acquisitions-pending-item">
                <span className="status">PENDING</span>
                <span>{acquisition.gallery.name}</span>
                <span>{acquisition.preferredArtist ? acquisition.preferredArtist : "No Preferred artist"}</span>
                <span>{acquisition.medium}</span>
                <span>{acquisition.budget}K</span>
                <span>{Math.floor((Date.now() - (new Date(acquisition.createdAt)).getTime())/(1000*60*60))} HOURS</span>
                <button>OPEN</button>
            </div>
        )
    }) : null;

    const inProgessRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
        return (
            <div className="acquisitions-pending-item">
                <span className="status">PENDING</span>
                <span>{acquisition.gallery.name}</span>
                <span>{acquisition.preferredArtist ? acquisition.preferredArtist : "No Preferred artist"}</span>
                <span>{acquisition.medium}</span>
                <span>{acquisition.budget}K</span>
                <span>{Math.floor((Date.now() - (new Date(acquisition.createdAt)).getTime())/(100*60*60))} HOUR/S</span>
                <button>OPEN</button>
            </div>
        )
    }) : null;

    const confirmedRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
        return (
            <div className="acquisitions-pending-item">
                <span className="status">PENDING</span>
                <span>{acquisition.gallery.name}</span>
                <span>{acquisition.preferredArtist ? acquisition.preferredArtist : "No Preferred artist"}</span>
                <span>{acquisition.medium}</span>
                <span>{acquisition.budget}K</span>
                <span>{Math.floor((Date.now() - (new Date(acquisition.createdAt)).getTime())/(1000*60*60))} HOURS</span>
                <button>OPEN</button>
            </div>
        )
    }) : null;

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
                <input type="radio" id="pending" name="status" onChange={() => setStatus("Pending")} checked={status === "Pending"} />
                <label htmlFor="pending">PENDING REQUESTS</label>
                <input type="radio" id="inProgress"name="status" onChange={() => setStatus("In Progress")} checked={status === "In Progress"} />
                <label htmlFor="inProgress">IN PROGRESS</label>
                <input type="radio" id="confirmed"name="status" onChange={() => setStatus("Confirmed")}  checked={status === "Confirmed"} />
                <label htmlFor="confirmed">CONFIRMED</label>
            </div>
            <div>
                {status === "Pending" ? pendingRequest : null}
                {status === "In Progress" ? inProgessRequest : null}
                {status === "Confirmed" ? confirmedRequest : null}
            </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default CollectorAcquisitions;
