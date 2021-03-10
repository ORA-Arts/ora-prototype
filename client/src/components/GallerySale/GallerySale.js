import React, {useState, useEffect} from "react";
import "./GallerySale.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchAllRequests } from '../../api/service';

const GallerySale = (props) => {

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("Pending");

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
                <span className="status">PENDING</span>
                <span>{request.gallery.name}</span>
                <span>{request.preferredArtist ? request.preferredArtist : "No Preferred artist"}</span>
                <span>{request.medium}</span>
                <span>{request.budget}K</span>
                <span>{Math.floor((Date.now() - (new Date(request.createdAt)).getTime())/(1000*60*60))} HOURS</span>
                <button>OPEN</button>
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
            <div>
                {status === "Pending" ? pendingRequest : null}
                {/* {status === "In Progress" ? inProgessRequest : null}
                {status === "Confirmed" ? confirmedRequest : null} */}
            </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default GallerySale;
