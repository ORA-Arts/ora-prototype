import React, {useState, useEffect} from "react";
import "./GallerySale.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchAllRequests } from '../../api/service';

const GallerySale = (props) => {

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [activeRequest, setActiveRequest] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const resRequests = await fetchAllRequests();
      setRequests(resRequests);
    }
    fetchData();
  }, []);



    const pendingRequest = requests.length ? requests.filter(request => request.status === "Pending").map((request, index) => {
        return (
            <div className="sales-pending-item">
                {/* <span className="status">PENDING</span> */}
                <span className="collector-request-name">{request.collector.name}</span>
                <span>{request.preferredArtist ? request.preferredArtist : "No Preferred artist"}</span>
                <span>{request.medium}</span>
                <span>{request.budget}K</span>
                <span>{Math.floor((Date.now() - (new Date(request.createdAt)).getTime())/(1000*60*60))} HOURS</span>
                <button onClick={() => setActiveRequest(request)}>OPEN</button>
            </div>
        )
    }) : null;

    // const inProgessRequest = requests.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
    //     return (
    //         <div className="sales-pending-item">
    //             <span className="status">PENDING</span>
    //             <span>{acquisition.gallery.name}</span>
    //             <span>{acquisition.preferredArtist ? acquisition.preferredArtist : "No Preferred artist"}</span>
    //             <span>{acquisition.medium}</span>
    //             <span>{acquisition.budget}K</span>
    //             <span>{Math.floor((Date.now() - (new Date(acquisition.createdAt)).getTime())/(100*60*60))} HOUR/S</span>
    //             <button>OPEN</button>
    //         </div>
    //     )
    // }) : null;

    // const confirmedRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
    //     return (
    //         <div className="sales-pending-item">
    //             <span className="status">PENDING</span>
    //             <span>{acquisition.gallery.name}</span>
    //             <span>{acquisition.preferredArtist ? acquisition.preferredArtist : "No Preferred artist"}</span>
    //             <span>{acquisition.medium}</span>
    //             <span>{acquisition.budget}K</span>
    //             <span>{Math.floor((Date.now() - (new Date(acquisition.createdAt)).getTime())/(100*60*60))} HOUR/S</span>
    //             <button>OPEN</button>
    //         </div>
    //     )
    // }) : null;

    const dateConverter = (mongoDate) => {
        const date = new Date(mongoDate);
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }

    const activeRequestContainer = activeRequest ?
        (<>
        <div className="detail-request-container">
            <div className="detail-collector-left">
                <div className="detail-request-name">{activeRequest.collector.name}</div>
                <div>{dateConverter(activeRequest.createdAt)}</div>
            </div>
            <div className="detail-collector-right">
                {activeRequest.messages[0].message}
                <p></p>
                <div><b>Artist</b>: {!activeRequest.suggestion ? activeRequest.preferredArtist : "No preferred artist"}</div>
                <div><b>Type</b>: {activeRequest.type}</div>
                <div><b>Medium</b>: {activeRequest.medium}</div>
                <div><b>Budget</b>: {activeRequest.budget}KEUR</div>
            </div>
        </div>
        <div className="detail-request-footer">
            <button onClick={() => setActiveRequest(null)}>BACK TO REQUESTS</button>
            <div>
                <button onClick={() => setActiveRequest(null)}>MAKE AN OFFER</button>
                <button onClick={() => setActiveRequest(null)}>ASK FOR INFORMATION</button>
            </div>
        </div>
        </>
        ) : null;
  return (
  <div className="app-container-gallery-sales">
    <div className="gallery-container-sales">
      <div className="gallery-sales-header">
        <div className="gallery-sales-name">
          {props.galleryName}
        </div>
      </div>
      <div className="container-sales-content">
        <ProfileSideBar content="my-sales"/>
        <div className="gallery-sales">
            <div className="gallery-status-bar">
                <input type="radio" id="pending" name="status" onChange={() => setStatus("Pending")} checked={status === "Pending"} />
                <label htmlFor="pending">REQUESTS</label>
                <input type="radio" id="inProgress"name="status" onChange={() => setStatus("In Progress")} checked={status === "In Progress"} />
                <label htmlFor="inProgress">IN PROGRESS</label>
                <input type="radio" id="confirmed"name="status" onChange={() => setStatus("Confirmed")}  checked={status === "Confirmed"} />
                <label htmlFor="confirmed">CONFIRMED</label>
            </div>
            {!activeRequest ?
            <div>
                {status === "Pending" ? pendingRequest : null}
                {/* {status === "In Progress" && activeRequest ? inProgessRequest : null}
                {status === "Confirmed" && activeRequest ? confirmedRequest : null} */}
            </div>
            : activeRequestContainer}
      </div>
    </div>
  </div>
  </div>
  );
};

export default GallerySale;
