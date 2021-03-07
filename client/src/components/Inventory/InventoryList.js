import React, {useState, useEffect} from "react";
import "./Inventory.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import house from './house-test.jpg';
import axios from 'axios';
import { fetchArtworks, addNewGallery } from '../../api/service';

const InventoryList = (props) => {
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
  console.log("checkdata: ", data);
//   const [isEditMode, setIsEditMode] = useState(true);
//   const [isGalleryExist, setIsGalleryExist] = useState(false);
//   const [convelio, setConvelio] = useState(true);
//   const [image, setImage] = useState(null);
  // const [password, setPassword] = useState("")


//   const onChange = (event) => {
//     const { name, value } = event.target;
//     setData({...data, [name]: value.toUpperCase()});
//   };


//   const fileHandler = e => {
//     setImage(e.target.files[0]);
//   };

//   const submitHandler = async () => {
//     // console.log(data.ownerName, data.email, data.password, data.position, data.name, data.address, data.biography, data.website, convelio, image);
//     const uploadData = new FormData();
//     const dataCopy = data;
//     dataCopy.convelio = convelio;
//     uploadData.append("image", image);
//     for (let key in dataCopy) {
//       uploadData.append(key, dataCopy[key]);
//     }
//     const resData = await addNewGallery(uploadData);
//     setData(resData);
//   };

  useEffect(() => {
    async function fetchData() {
      await props.setUser(props.user);
      const resData = await fetchArtworks();
      console.log("fetch the artworks", resData);
      if (!resData) {
          console.log("No availabe artworks")
        // setIsGalleryExist(false);
      } else {
        // setIsGalleryExist(true);
        // setIsEditMode(false);
        // setData(resData);
        setData(resData);
        // console.log(resData);
      }
    }
    fetchData();
  }, []);



//   const startEditing = () => {
//     setIsEditMode(true);
//   };
  const renderItems = (resData) => {
    return resData.map(artwork => {
          return(
            <div className="artwork-list-item">
                <img src={artwork.imageUrl} alt={artwork.imgPublicId} className="artwork-list-item-thumbnail" />
                <div className="artwork-list-item-info">
                    <span className="artwork-list-item-name">{artwork.artist.name}</span>
                    , {artwork.title} {artwork.realisationYear}, Signed: {artwork.signed ? "yes" : "no"}
                    , {artwork.materialsAndTechnique}, {artwork.height + "x" + artwork.width + "x" + artwork.length + "(mm x mm x mm)"}
                    , Stock number: {artwork.stockNumber}, Price: {artwork.price}€, Location: {artwork.location}
                </div>
            </div>
          )
      })
  }

  return (
  <div className="app-container">
      <div className="container-inventory">
      <div className="gallery-name">
        {/* later move the fetch to to root of gallery components */}
        {/* {data.name} */}
      </div>
      <hr/>
      <div className="container-inventory-content">
        <ProfileSideBar content="my-inventory"/>
        <div className="gallery-profile">
          <div className="gallery-content">
            <div className="flex-inventory-between">
                <div className="filter-box">
                    {/* implement later */}
                    Unique artworks / Edition and multiples / Products / Artist books & Publications
                </div>
                <button className="btn-add-artwork">ADD A NEW ARTWORK</button>
            </div>
            <div className="flex-inventory-between ">
                <input type="text" className="inventory-search" placeholder="SEARCH" />
                <div className="inventory-sort">
                    <input type="checkbox" id="sort-by-value"/>
                    <label className="label-button-like" htmlFor="sort-by-value">SORT BY VALUE</label>
                </div>
            </div>
            {/* <hr/> */}
            <div className="artwork-list">
                {!data ? null : renderItems(data)}
                {/* <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default InventoryList;
