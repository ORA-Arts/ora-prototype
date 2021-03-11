import React, { useState } from "react";
import "./CollectorAcquisitions.2.css";
import imageDefault from "./image-default.png";

const ArtworkView = (props) => {

  const [activeImage, setActiveImage] = useState(props.artwork.images.length ? props.artwork.images[0].imageUrl : imageDefault);
  console.log(props);

  const clickedImageHandler = (index) => {
    setActiveImage(props.artwork.images[index].imageUrl);
  };

  const generateThumbnails = () => {
    if (!props.artwork.images.length) {
      return (
        <img
          src={imageDefault}
          alt="artwork"
          className="artwork-detail-thumbnail"
        />
      );
    }
    return props.artwork.images.map((image, index) => (
      <img
        key={index}
        src={image.imageUrl}
        onClick={() => clickedImageHandler(index)}
        alt="artwork"
        className="artwork-detail-thumbnail existing-image"
      />
    ));
  };

  return (
    <div className="offer-artwork-view">
      <div className="offer-artwork-view-container">
        <div className="artwork-detail">
          <div className="artwork-detail-images">
            <div className="offer-artwork-view-image-container">
              <img
                src={activeImage}
                alt="artwork"
                className="artwork-detail-image"
              />
            </div>
            <div className="artwork-view-detail-footer">
              <div className="artwork-detail-thumbnails">
                {generateThumbnails()}
              </div>
            </div>
          </div>
          <div className="artwork-detail-info">
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label inventory-artist">ARTIST </div>
              <div className="artwork-view-info-field">
                <span>
                  <b>{props.artwork.artist.name}</b>
                </span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">TITLE </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.title}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Year of realization </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.realisationYear}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Artwork type </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.type}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Signed & Dated </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.signed ? "YES" : "NO"}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Medium </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.medium}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Materials and technique </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.materialsAndTechnique}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Dimensions </div>
              <div className="artwork-view-info-field detail-info-space-between">
                <span>
                  {props.artwork.height}mm x {props.artwork.length}mm x{" "}
                  {props.artwork.width}mm
                </span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Stock number </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.stockNumber}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Availability status </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.status}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Market </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.market}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Seller </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.seller}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Price (excl. taxes) </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.price}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">See in person </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.seeInPerson ? "YES" : "NO"}</span>
              </div>
            </div>

            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Storage location </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.location}</span>
              </div>
            </div>
            <div className="artwork-view-info-field">
              <div className="artwork-view-info-label">Description </div>
              <div className="artwork-view-info-field">
                <span>{props.artwork.description}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="inventory-btn-bottom">
          <button onClick={props.closeArtworkView} className="btn-back-inventory">BACK TO MY INVENTORY</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkView;
