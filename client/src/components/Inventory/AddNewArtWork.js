import React, {useState, useEffect} from "react";
import "./Inventory.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import house from './house-test.jpg';
import axios from 'axios';
import { fetchArtworks, addNewGallery } from '../../api/service';

const AddNewArtWork = (props) => {
//   const initialState = {
//     title: ,
//     realisationYear: ,
//     type: ,
//     signed: ,
//     medium: ,
//     materialsAndTechnique: ,
//     height: ,
//     length: ,
//     width: ,
//     stockNumber: ,
//     status: ,
//     market: ,
//     seller: ,
//     price: ,
//     seeInPerson: ,
//     location: ,
//     description: ,
//     imageUrl: ,
//     imgPublicId: ,
//   };

  const [data, setData] = useState(null);
  const [fetchedData, setFetchedData] =  useState(null);
  // refactor later
  const [dataBeforeSorted, setDataBeforeSorted] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [query, setQuery] = useState("");



  useEffect(() => {
    async function fetchData() {
      await props.setUser(props.user);
      const resData = await fetchArtworks();
      console.log("fetch the artworks", resData);
      if (!resData) {
          console.log("No availabe artworks")
      } else {
        // find the way to refactor/reduce state momory later (still better than fetch new ones from database)
        setData(resData);
        setFetchedData(resData);
        setDataBeforeSorted(resData);
      }
    }
    fetchData();
  }, []);

  // for search
  useEffect(() => {
    if (!data) return;
    let regex = new RegExp(query, 'i');
    const matchedArtworks = fetchedData.filter(artwork => {
        return artwork.title.match(regex) || mediumFilter(artwork.medium, regex) || artwork.artist.name.match(regex);
    });
    setData(matchedArtworks);
    setDataBeforeSorted(matchedArtworks);
  }, [query]);

  // for price filter
  useEffect(() => {
    if (!data) return;
    let dataCopy = data.slice();
    if (sortByPrice) {
        dataCopy.sort((a, b) => a.price - b.price);
        setData(dataCopy);
    } else {
        setData(dataBeforeSorted);
    }
  }, [sortByPrice]);

  const mediumFilter = (list, regex) => {
    for (let el of list) {
      if (el.match(regex)) return true;
    }
    return false;
  };

  const toggleSortPrice = () => {
    setSortByPrice(!sortByPrice);
  };

  const searchHandler = (event) => {
    const query = event.target.value;
    setSortByPrice(false);
    if (query === "") {
        setData(fetchedData);
    }
    setQuery(query);
  };

  const startEditing = () => {
    // setIsEditMode(true);
  };

  const mediumOption = () => {
      const mediums = ["Painting", "Sculpture", "Photography", "Video Art", "Performance", "Drawing", "Mixed Media"];
      return mediums.map(medium => <option value={medium}>{medium}</option>)
  }


  return (
  <div className="app-container">
      <div className="container-inventory container-inventory-detail">
      <div className="gallery-name">
        {/* later move the fetch to to root of gallery components */}
        {/* {data.name} */}
        GALLERY NEU
      </div>
      <hr/>
      <div className="edit-button">
        <button className="btn-edit" onClick={startEditing}>Edit</button>
      </div>
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
                    <img src={house} alt="artwork image" className="artwork-detail-image" />
                    <div className="artwork-detail-footer">
                        <div className="artwork-detail-thumbnails">
                            <img src={house} alt="artwork image" className="artwork-detail-thumbnail" />
                            <img src={house} alt="artwork image" className="artwork-detail-thumbnail" />
                            <img src={house} alt="artwork image" className="artwork-detail-thumbnail" />
                            <img src={house} alt="artwork image" className="artwork-detail-thumbnail" />
                        </div>
                        <div className="inventory-upload-container">
                            <input id="inventory-file" type="file" className="inventory-input-hidden" />
                            <label htmlFor="inventory-file" className="inventory-btn-image">ADD IMAGE</label>
                        </div>
                    </div>
                </div>
                <div className="artwork-detail-info">
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label inventory-artist">ARTIST </div>
                        {/* add a select for artist field here width value = artist ID */}
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">TITLE </div>
                        <div className="detail-info-field">
                            <input type="text" placeholder="Untitled"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Year of realization </div>
                        <div className="detail-info-field">
                            <input type="number" placeholder="1937"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Artwork type </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="Unique">Unique</option>
                                <option value="Editions">Editions</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Signed & Dated </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="volvo">Yes</option>
                                <option value="saab">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Medium </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                {mediumOption()}
                            </select>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Materials and technique </div>
                        <div className="detail-info-field">
                            <input type="text" placeholder="Chalk, Charcoal, Underpainting"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Dimensions </div>
                        <div className="detail-info-field detail-info-space-between">
                            <input type="number" className="detail-info-field-small" placeholder="Height"/>
                            <input type="number" className="detail-info-field-small" placeholder="Length"/>
                            <input type="number" className="detail-info-field-small" placeholder="Width"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Stock number </div>
                        <div className="detail-info-field">
                            <input type="number" placeholder="Stock number"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Availability status </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="Available">Available</option>
                                <option value="Offered">Offered</option>
                                <option value="Sold">Sold</option>
                            </select>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Market </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                            </select>
                        </div>
                    </div>
                    {/* Do we need this */}
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Seller </div>
                        <div className="detail-info-field">
                            <input type="text" placeholder="Name of the gallery"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Price (excl. taxes) </div>
                        <div className="detail-info-field">
                            <input type="text" placeholder="In Eur"/>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">See in person </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Storage location </div>
                        <div className="detail-info-field">
                            <input type="text" placeholder="Address"/>
                        </div>
                    </div>
                    {/* what is this */}
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Artist’s proof </div>
                        <div className="detail-info-field">
                            <input type="text" placeholder="Type in number to enter"/>
                        </div>
                    </div>
                    {/* what is this */}
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">CERTIFICATE OF AUTHENTICITY </div>
                        <div className="detail-info-field">
                            <select name="cars" id="cars">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="artwork-detail-info-field">
                        <div className="detail-info-label">Description </div>
                        <div className="detail-info-field">
                            <textarea name="" id="" rows="4" placeholder="Short description about the artwork"></textarea>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddNewArtWork;
