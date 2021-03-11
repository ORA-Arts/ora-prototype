import React, { useState, useEffect } from "react";
import "./CollectorAcquisitions.2.css";
import "./tailwind.css";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { fetchAllAcquisitions } from '../../api/service';
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
    toggleList(false)
    return requestDetails
  }
  const openRequestList = (status) => {
    toggleList(true)
    setStatus(status);
  }

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


  const requestDetails = activeAcquisition ?
    <>
      <tr className={trClassR}>
        <td className={tdClassR}>
          <div>LISA ABRAHAM</div>
          <div>15.02.21</div>
        </td>
        <td className={tdClassR}>
          <article>
            Dear Neu Galerie,

            My name is Lisa and I am based in New York.
            I discovered Birgit Megerle’s work by accident and was immediately struck : I’d really like to find out about available works if there are any.

            Looking forward to hearing from you and my best,
            Lisa
          </article>
        </td>
      </tr>
      <tr className={trClassR}>
        <td className={tdClassR}>
          <span className='text-medium'>GALERIE NEU</span>
          <span className='text-sm'>16.02.21</span>
        </td>
        <td className={tdClassR}>
          <article className='pb-5'>
            Dear Lisa,

            Thank you for reaching out, it’s a pleasure to meet !

            And thank you for your interest in Birgit Megerle
            We do have available paintings, I have attached an offer below for one of her paintings !
            </article>
          <div className="offerDetails">
            <article>
              <img src={artworkImage} alt="Artwork" />
              <ul>
               <li>Brigit Megerle</li> 
               <li>Title & Year</li>
               <li>Signed, dated and numbered</li>  
               <li>Material</li> 
               <li>Dimension</li> 
               <li>Stock number</li> 
               <li>Price</li> 
               <li>Location</li> 
              </ul>
            </article>
            <div className="actionButtons">
              <button className='btnAccept'>ACCEPT OFFER</button>
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