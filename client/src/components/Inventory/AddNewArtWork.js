import React, {useState, useEffect} from "react";
import "./Inventory.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import image from './image-default.png';
import { addNewArtWork, fetchArtworkById, editArtWork } from '../../api/service';
import {withRouter} from 'react-router-dom';

const AddNewArtWork = (props) => {
  const initialState = {
    artist: null,
    title: "",
    realisationYear: 1990,
    type: "Unique",
    signed: true,
    medium: "Painting",
    materialsAndTechnique: "",
    height: 0,
    length: 0,
    width: 0,
    stockNumber: 0,
    status: "Available",
    market: "Primary",
    seller: "",
    price: 0,
    seeInPerson: false,
    location: "",
    description: "",
    images: [],
  };

  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [artworkId, setArtworkId] = useState(null);
  const [data, setData] = useState(initialState);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [activeImage, setActiveImage] = useState(image);

    
    useEffect(() => {
        if (!props.isViewMode) {
            setData(initialState);
            setIsViewMode(false);
            setIsEditMode(true);
        } else {
            setArtworkId(props.match.params.id);
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (artworkId) {
                const artwork = await fetchArtworkById(artworkId);
                setData(artwork);
                setIsViewMode(true);
                setIsEditMode(false);
            }
        }
        fetchData();
    }, [artworkId]);
    
    useEffect(() => {
        console.log("run here");
        currentActiveImage();
    }, [uploadedImages, data.images]);


    const onChange = (event) => {
        const { name, value } = event.target;
        setData({...data, [name]: value});
    };

    const fileHandler = e => {
        let imagesCopy = uploadedImages.slice();
        imagesCopy.push(e.target.files[0]);
        setUploadedImages(imagesCopy);
    };


    const startEditing = () => {
        setIsEditMode(!isEditMode);
    };

  const currentActiveImage = () => {
    if (data.images.length !==0 && uploadedImages.length===0) {
        setActiveImage(data.images[0].imageUrl);
    } else if (uploadedImages.length !== 0) {
        setActiveImage(URL.createObjectURL(uploadedImages[uploadedImages.length-1]));
    } else {
        setActiveImage(image);
    }
};

  const submitHandler = async () => {
    const uploadData = new FormData();
    const dataCopy = data;
    uploadData.append("uploadedImages", uploadedImages);
    for (let key in dataCopy) {
      uploadData.append(key, dataCopy[key]);
    }
    uploadedImages.forEach(file => uploadData.append('images[]', file));
    let resData;
    if (isEditMode && isViewMode) {
        resData = await editArtWork(artworkId, uploadData);
    } else {
        resData = await addNewArtWork(uploadData);
    }
    if (resData) props.history.push(`/gallery/inventory/${resData._id}`);
    setData(resData);
    setUploadedImages([]);
    setIsEditMode(false);
    setIsViewMode(true);
  };

  const clickedImageHandler = (index) => {
    if (index > data.images.length-1) {
        setActiveImage(URL.createObjectURL(uploadedImages[index - data.images.length]));
    } else {
        setActiveImage(data.images[index].imageUrl);
    }
  };

  const generateThumbnails = () => {
    if (!data.images.length && !uploadedImages.length) {
        return <img src={image} alt="artwork" className="artwork-detail-thumbnail" />;
    }
    let images = [];
    if (data.images.length) {
        data.images.forEach(image => images.push(image.imageUrl));
    }
    if (uploadedImages.length) {
        uploadedImages.forEach(image => images.push(URL.createObjectURL(image)));
    }
    return images.map((image, index) => <img key={index} src={image} onClick={() => clickedImageHandler(index)} alt="artwork" className="artwork-detail-thumbnail existing-image" />);
  };

  const mediumOption = () => {
      const mediums = ["Painting", "Sculpture", "Photography", "Video Art", "Performance", "Drawing", "Mixed Media"];
      return mediums.map((medium, index) => <option key={index} value={medium}>{medium}</option>)
  }


  return (
  <div className="app-container">
      <div className="container-inventory container-inventory-detail">
      <div className="gallery-name">
        {props.galleryName}
      </div>
      <hr/>
      {isViewMode ?
      <div className="edit-button">
        <button className="btn-edit" onClick={startEditing}>Edit</button>
      </div>
      : null  }
      <div className="container-inventory-content">
        <ProfileSideBar content="my-inventory"/>
        <div className="gallery-profile">
          <div className="gallery-content">
            <div className="profile-title">
              <hr />
              <span className="title-text">
                ADD A NEW ARTWORK
              </span>
            </div>
            <div className="artwork-detail">
                {/* if data exist generate all data, if not form ready    */}
                <div className="artwork-detail-images">
                    {/* dynamic later, if having time, add a remove button for image*/}
                    <div className="artwork-detail-image-container">
                        <img src={activeImage} alt="artwork" className="artwork-detail-image" />
                    </div>
                    <div className="artwork-detail-footer">
                        <div className="artwork-detail-thumbnails">
                            {generateThumbnails()}
                        </div>
                        <div className="inventory-upload-container">
                            {isEditMode ? 
                            <>
                                <input onChange={fileHandler} id="inventory-file" type="file" className="inventory-input-hidden" />
                                <label htmlFor="inventory-file" className="inventory-btn-image">ADD IMAGE</label>
                            </>
                            : null }
                        </div>
                    </div>
                </div>
                <div className="artwork-detail-info">
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label inventory-artist">ARTIST </div>
                        {/* add a select for artist field here width value = artist ID */}
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <select name="artist" onChange={onChange}>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select> :
                            <span><b>{data.artist.name}</b></span>
                            }
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">TITLE </div>
                        <div className="detail-info-field">
                        {isEditMode ? 
                            <input onChange={onChange} value={data.title} name="title" type="text" placeholder="Untitled"/>
                        : <span>{data.title}</span> }
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Year of realization </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <input onChange={onChange} value={data.realisationYear} name="realisationYear" type="number" placeholder="1937"/>
                            : <span>{data.realisationYear}</span> }   
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Artwork type </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <select onChange={onChange} name="type">
                                <option value="Unique">Unique</option>
                                <option value="Editions">Editions</option>
                            </select>
                            : <span>{data.type}</span> }   
                        </div>
                    </div>
                    
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Signed & Dated </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <select onChange={onChange} name="signed">
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                            : <span>{data.signed ? "YES" : "NO"}</span> } 
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Medium </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <select onChange={onChange} name="medium">
                                {mediumOption()}
                            </select>
                            : <span>{data.medium}</span> } 
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Materials and technique </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <input onChange={onChange} value={data.materialsAndTechnique} name="materialsAndTechnique" type="text" placeholder="Chalk, Charcoal, Underpainting"/>
                            : <span>{data.materialsAndTechnique}</span> }   
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Dimensions </div>
                        <div className="detail-info-field detail-info-space-between">
                            {isEditMode ? 
                            <>
                            <input onChange={onChange} value={data.height} name="height" type="number" className="detail-info-field-small" placeholder="Height"/>
                            <input onChange={onChange} value={data.length} name="length" type="number" className="detail-info-field-small" placeholder="Length"/>
                            <input onChange={onChange} value={data.width} name="width" type="number" className="detail-info-field-small" placeholder="Width"/>
                            </>
                            : <span>{data.height}mm x {data.length}mm x {data.width}mm</span> }   
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Stock number </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <input onChange={onChange} value={data.stockNumber} name="stockNumber" type="number" placeholder="Stock number"/>
                            : <span>{data.stockNumber}</span> }   
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Availability status </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <select onChange={onChange} name="status">
                                <option value="Available">Available</option>
                                <option value="Offered">Offered</option>
                                <option value="Sold">Sold</option>
                            </select>
                            : <span>{data.status}</span> }   
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Market </div>
                        <div className="detail-info-field">
                            {isEditMode ? 
                            <select onChange={onChange} name="market">
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                            </select>
                            : <span>{data.market}</span> }   
                        </div>
                    </div>
                    {/* Do we need this */}
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Seller </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <input onChange={onChange} value={data.seller} name="seller" type="text" placeholder="Name of the gallery"/>
                            : <span>{data.seller}</span> }
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Price (excl. taxes) </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <input onChange={onChange} value={data.price} name="price" type="number" placeholder="In Eur"/>
                            : <span>{data.price}</span> }
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">See in person </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <select onChange={onChange} name="seeInPerson">
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                            : <span>{data.seeInPerson ? "YES" : "NO"}</span> }
                        </div>
                    </div>
                    
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Storage location </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <input onChange={onChange} value={data.location} name="location" type="text" placeholder="Address"/>
                            : <span>{data.location}</span> }
                        </div>
                    </div>
                    {/* what is this */}
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Artist’s proof </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <input type="text" placeholder="Type in number to enter"/>
                            : <span>{"Unknown"}</span> }
                        </div>
                    </div>
                    {/* what is this */}
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">CERTIFICATE OF AUTHENTICITY </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <select name="cars" id="cars">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            : <span>{"Unknown"}</span> }
                            
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Description </div>
                        <div className="detail-info-field">
                            {isEditMode ?
                            <textarea onChange={onChange} value={data.description} name="description" rows="4" placeholder="Short description about the artwork"></textarea>
                            : <span>{data.description}</span> }
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory-btn-bottom">
                <button onClick={() => props.history.push('/gallery/inventory')} className="btn-back-inventory">BACK TO MY INVENTORY</button>
                {isEditMode ? <button onClick={submitHandler} className="btn-edit save-change">SAVE CHANGES</button> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default withRouter(AddNewArtWork);
