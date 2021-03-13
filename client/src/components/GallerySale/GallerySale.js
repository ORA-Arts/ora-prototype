import React, { useState, useEffect } from "react";
import "./GallerySale.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchAllRequests } from "../../api/service";
import GalleryOffer from "./GalleryOffer";

const GallerySale = (props) => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [activeRequest, setActiveRequest] = useState(null);
  const [isOffering, setIsOffering] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const resRequests = await fetchAllRequests();
      setRequests(resRequests);
    }
    fetchData();
  }, []);

  const updateSalesItems = (offer) => {
    const requestID = offer._id;
    const UpdatedRequests = [...requests].map(request => {
      if (request._id === requestID) return offer;
      return request;
    });
    setRequests(UpdatedRequests);
    setStatus("In Progress");
    setIsOffering(false);
    setActiveRequest(null);
  };


  const timeRemain = (time) => {
    const pastHours = Math.floor(
      (Date.now() - new Date(time).getTime()) / (1000 * 60 * 60)
    );
    const leftHours = 92 - pastHours;
    return leftHours < 0 ? "Outdated" : `${leftHours}h Left`;
  };

  const pendingRequest = requests.length ? requests
    .filter((request) => request.status === "Pending")
    .map((request, index) => {
      return (
        <div key={index} className="sales-pending-item">
          {/* <span className="status">PENDING</span> */}
          <span className="collector-request-name">{`${request.collector.firstName} ${request.collector.lastName}`}</span>
          <span>
            {request.preferredArtist
              ? request.preferredArtist
              : "No Preferred artist"}
          </span>
          <span>{request.medium}</span>
          <span>{request.budget}K</span>
          <span>{timeRemain(request.createdAt)}</span>
          <button onClick={() => setActiveRequest(request)}>OPEN</button>
        </div>
      );
    })
    : null;

  const inProgessRequest = requests.length
    ? requests
      .filter((request) => request.status === "In Progress")
      .map((request, index) => {
        return (
          <div key={index} className="sales-inProgress-item">
            <span
              className={
                request.offerStatus === "Sent"
                  ? "inProgress-sent"
                  : "inProgress-accepted"
              }
            >
              {request.offerStatus}
            </span>
            <span className="collector-request-name">{`${request.collector.firstName} ${request.collector.lastName}`}</span>
            <span>{request.offeredArtwork.artist.name}</span>
            <span>{request.medium}</span>
            <span>{request.offeredArtwork.price}K</span>
            <span>{timeRemain(request.createdAt)}</span>
            <button>VIEW</button>
          </div>
        );
      })
    : null;

  const checkConfirmedRequest = (offerStatus) => {
    if (offerStatus === "Cancelled") return <span className="status-confirmed-cancelled">Offer Cancelled</span>
    if (offerStatus === "Paid") return <span className="status-confirmed-paid">Offer Paid</span>
  }

  const confirmedRequest = requests.length ? requests.filter(request => request.status === "Confirmed").map((request, index) => {
    return (
      <div className="sales-pending-item">
        {checkConfirmedRequest(request.offerStatus)}
        <span>{`${request.collector.firstName} ${request.collector.lastName}`}</span>
        <span>{request.offeredArtwork.artist.name}</span>
        <span>{request.offeredArtwork.title}</span>
        <span>{request.offeredArtwork.price}K€</span>
        <button>VIEW</button>
      </div>
    )
  }) : null;

  const dateConverter = (mongoDate) => {
    const date = new Date(mongoDate);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  };

  const messageStyle = isOffering
    ? { height: "220px", overflowY: "auto" }
    : null;

  const activeRequestContainer = activeRequest ? (
    <>
      <div className="detail-request-container">
        <div className="detail-collector-left">
          <div className="detail-request-name">{`${activeRequest.collector.firstName} ${activeRequest.collector.lastName}`}</div>
          <div>{dateConverter(activeRequest.createdAt)}</div>
        </div>
        <div className="detail-collector-right">
          <div style={messageStyle}>{activeRequest.messages[0].message}</div>
          {!isOffering ? (
            <>
              <p></p>
              <div>
                <b>Artist</b>:{" "}
                {!activeRequest.suggestion
                  ? activeRequest.preferredArtist
                  : "No preferred artist"}
              </div>
              <div>
                <b>Type</b>: {activeRequest.type}
              </div>
              <div>
                <b>Medium</b>: {activeRequest.medium}
              </div>
              <div>
                <b>Budget</b>: {activeRequest.budget}KEUR
              </div>
            </>
          ) : null}
          {isOffering ? (
            <GalleryOffer
              request={activeRequest}
              collector={activeRequest.collector}
              updateSalesItems={updateSalesItems}
            />
          ) : null}
        </div>
      </div>
      <div className="detail-request-footer">
        <button onClick={() => (setActiveRequest(null), setIsOffering(false))}>
          BACK TO REQUESTS
        </button>
        {!isOffering ? (
          <div>
            <button className="sales-btn-green" onClick={() => setIsOffering(true)}>MAKE AN OFFER</button>
            <button onClick={() => setActiveRequest(null)}>
              ASK FOR INFORMATION
            </button>
          </div>
        ) : null}
      </div>
    </>
  ) : null;

  return (
    <div >
      <div className="gallery-name-artists">
        {props.galleryName}
      </div>
      <hr />
      <div className='myArtists'>
        <ProfileSideBar content="sales" />
        <div className='artistsContainer'>
          <div className='myArtistsHeader'>
            <hr /> <span className='subtitle'>MY SALES</span>
          </div>
          <div id="formContainerField">
            <div className="gallery-status-bar">
              <input
                type="radio"
                id="pending"
                name="status"
                onChange={() => setStatus("Pending")}
                checked={status === "Pending"}
              />
              <label htmlFor="pending">REQUESTS</label>
              <input
                type="radio"
                id="inProgress"
                name="status"
                onChange={() => (
                  setStatus("In Progress"),
                  setIsOffering(false),
                  setActiveRequest(null)
                )}
                checked={status === "In Progress"}
              />
              <label htmlFor="inProgress">IN PROGRESS</label>
              <input
                type="radio"
                id="confirmed"
                name="status"
                onChange={() => (
                  setStatus("Confirmed"),
                  setIsOffering(false),
                  setActiveRequest(null)
                )}
                checked={status === "Confirmed"}
              />
              <label htmlFor="confirmed">CONFIRMED</label>
            </div>
            {!activeRequest ? (
              <div>
                {status === "Pending" ? pendingRequest : null}
                {status === "In Progress" ? inProgessRequest : null}
                {status === "Confirmed" ? confirmedRequest : null}
              </div>
            ) : (
              activeRequestContainer
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySale;
