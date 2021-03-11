import React, { useState, useEffect } from "react";
import "./CollectorAcquisitions.2.css";
import "./tailwind.css";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { fetchAllAcquisitions, makingCollectorDecision } from '../../api/service';
import artworkImage from '../../images/artwork.jpg'

const CollectorAcquisitions2 = (props) => {
  const thClass = "uppercase py-6 text-center text-black text-sm font-medium border-l-0 border-r-0";
  const tdClass = "px-4 py-8 border-b uppercase border-gray-900 text-sm border-l-0 border-r-0";
  const trClass = "border-black border-l-0 border-r-0"

  const thClassR = " py-6 text-left text-black text-sm font-medium border-l-0 border-r-0";
  const tdClassR = "text-left px-4 py-8 border-b border-gray-900 text-sm border-l-0 border-r-0";
  const trClassR = "border-black border-l-0 border-r-0";

  const [acquisitions, setAcquisitions] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [list, toggleList] = useState(true);
  // const [offer, setOffer] = useState(null);
  const [activeAcquisition, setActiveAcquisition] = useState(null);

  console.log(activeAcquisition);

  useEffect(() => {
    async function fetchData() {
      const resAcquisitions = await fetchAllAcquisitions();
      console.log(resAcquisitions);
      setAcquisitions(resAcquisitions);
    }
    fetchData();
  }, []);

  const openRequestDetails = (acquisition) => {
    toggleList(false);
    return requestDetails;
  }
  const openRequestList = (status) => {
    toggleList(true)
    setStatus(status);
  };

  const decisionHandler = async (decision, requestId) => {
    console.log(decision, requestId);
    const resDataAPI = await makingCollectorDecision(decision, requestId);
    console.log(resDataAPI);
  };

  const timeRemain = (time) => {
    const pastHours = Math.floor(
      (Date.now() - new Date(time).getTime()) / (1000 * 60 * 60)
    );
    const leftHours = 92 - pastHours;
    return leftHours < 0 ? "Outdated" : `${leftHours}h Left`;
  };

  const pendingRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Pending").map((acquisition, index) => {
    return (
      <tr key={index} className={trClass}>
        <td className={tdClass}><span className="status-pending">PENDING</span></td>
        <td className={tdClass}>{acquisition.gallery.name}</td>
        <td className={tdClass}>{acquisition.preferredArtist ? acquisition.preferredArtist.name : "No Preferred artist"}</td>
        <td className={tdClass}>{acquisition.medium}</td>
        <td className={tdClass}>{acquisition.budget}K€</td>
        <td className={tdClass}>{timeRemain(acquisition.createdAt)}</td>
        {/* <td className={tdClass}><button onClick={openRequestDetails('acquisition')} className='openRequest'>OPEN</button></td> */}
      </tr>
    )
  }) : null;

  const checkOfferStatus = (offerStatus) => {
    if (offerStatus === "Sent") return <span className="status-in-progress-received">Offer Recieved</span>
    if (offerStatus === "Accepted") return <span className="status-in-progress-accepted">Offer Accepted</span>
    // ["Sent", "Accepted", "Cancelled"]
    const confirmedRequest = (offerStatus) => {
      if (offerStatus === "Cancelled") return <span className="status-in-progress-cancelled">Offer Cancelled</span>
      if (offerStatus === "Paid") return <span className="status-in-progress-accepted">Offer Paid</span>
    }
  }
  const inProgessRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "In Progress").map((acquisition, index) => {
    return (
      <tr key={index} className={trClass}>
        <td className={tdClass}>{checkOfferStatus(acquisition.offerStatus)}</td>
        <td className={tdClass}>{acquisition.gallery.name}</td>
        <td className={tdClass}>{acquisition.offeredArtwork.artist.name}</td>
        <td className={tdClass}>{acquisition.offeredArtwork.title}</td>
        <td className={tdClass}>{acquisition.offeredArtwork.price}K€</td>
        <td className={tdClass}>{timeRemain(acquisition.createdAt)}</td>
        {acquisition.offerStatus === "Sent" ?
        <td className={tdClass}><button onClick={() => (setActiveAcquisition(acquisition), openRequestDetails())} className='btnAccept'>ACCEPT/CANCEL</button></td>
        : <td className={tdClass}><button className='openRequest-green'>PAY</button></td>
        }
      </tr>
    )
  }) : null;

  const confirmedRequest = acquisitions.length ? acquisitions.filter(acquisition => acquisition.status === "Confirmed").map((acquisition, index) => {
    return (
      <tr key={index} className={trClass}>
        <td className={tdClass}>{confirmedRequest(acquisition.offerStatus)}</td>
        <td className={tdClass}>{acquisition.gallery.name}</td>
        <td className={tdClass}>{acquisition.offeredArtwork.artist.name}</td>
        <td className={tdClass}>{acquisition.offeredArtwork.title}</td>
        <td className={tdClass}>{acquisition.offeredArtwork.price}K€</td>
        <td className={tdClass}><button className='openRequest'>VIEW</button></td>
      </tr>
    )
  }) : null;

  const dateConverter = (mongoDate) => {
    const date = new Date(mongoDate);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  };

  const requestDetails = activeAcquisition ?
    <>
      <tr className={trClassR}>
        <td className={tdClassR}>
          <div>{`${activeAcquisition.collector.firstName} ${activeAcquisition.collector.lastName}`}</div>
          <div>{dateConverter(activeAcquisition.createdAt)}</div>
        </td>
        <td className={tdClassR}>
          <article>
            {activeAcquisition.messages[0].message}
          </article>
        </td>
      </tr>
      <tr className={trClassR}>
        <td className={tdClassR}>
          <div className='text-medium'>{activeAcquisition.gallery.name}</div>
          <div className='text-sm'>{dateConverter(activeAcquisition.offeredArtwork.createdAt)}</div>
        </td>
        <td className={tdClassR}>
          <article className='pb-5'>
            {activeAcquisition.messages[1].message}
          </article>
          <div className="offerDetails">
            <article>
              <img src={artworkImage} alt="Artwork" />
              <ul>
               <li className="offer-artist-name">{activeAcquisition.offeredArtwork.artist.name}</li> 
               <li>Title & Year: {activeAcquisition.offeredArtwork.title} {activeAcquisition.offeredArtwork.realisationYear}</li>
               <li>Signed: {activeAcquisition.offeredArtwork.signed ? "Yes" : "No" }</li>  
               <li>Material: {activeAcquisition.offeredArtwork.materialsAndTechnique}</li> 
               <li>Dimension: {`${activeAcquisition.offeredArtwork.height}mm x ${activeAcquisition.offeredArtwork.width}mm x ${activeAcquisition.offeredArtwork.length}mm`}</li> 
               <li>Stock number: {activeAcquisition.offeredArtwork.stockNumber}</li> 
               <li>Price: {activeAcquisition.offeredArtwork.price}</li> 
               <li>Location: {activeAcquisition.offeredArtwork.location}</li>
               <li><div><u style={{cursor: "pointer"}}>View More Photos</u></div></li> 
              </ul>
            </article>
            <div className="actionButtons">
              <button className='btnAccept' onClick={() => decisionHandler("accept", activeAcquisition._id)}>ACCEPT OFFER</button>
              <button className='btnCancel' onClick={() => decisionHandler("cancel", activeAcquisition._id)}>CANCEL OFFER</button>
              <button className='openRequest'>REQUEST ANOTHER ARTWORK</button>
            </div>
          </div>

        </td>
      </tr>
    </> : null;

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
          <CollectorSideBar content="my-acquisitions" />
          <div className="collector-acquisitions">
            {/* ACQUISITIONS TABLE */}
            <table className="w-full table-fixed acquisitions-status-bar">
              <thead>
                <tr>
                  <th className={thClass}>
                    <input type="radio" id="pending" name="status" onChange={() => openRequestList("Pending")} checked={status === "Pending"} />
                    <label htmlFor="pending">PENDING REQUESTS</label>
                  </th>
                  <th className={thClass}>
                    <input type="radio" id="inProgress" name="status" onChange={() => openRequestList("In Progress")} checked={status === "In Progress"} />
                    <label htmlFor="inProgress">IN PROGRESS</label>
                  </th>
                  <th className={thClass}>
                    <input type="radio" id="confirmed" name="status" onChange={() => openRequestList("Confirmed")} checked={status === "Confirmed"} />
                    <label htmlFor="confirmed">CONFIRMED</label>
                  </th>
                </tr>
              </thead>
            </table>
            <table className="w-full table-auto">
              <tbody>
                {(status === "Pending" && list) ? pendingRequest : (status === "Pending" && !list) && requestDetails}
                {(status === "In Progress" && list) ? inProgessRequest : (status === "In Progress" && !list) && requestDetails}
                {(status === "Confirmed" && list) ? confirmedRequest : (status === "Confirmed" && !list) && requestDetails}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorAcquisitions2;