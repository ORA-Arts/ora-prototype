import React, {useState, useEffect} from "react";
import "./Inventory.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import house from './house-test.jpg';
import axios from 'axios';
import { fetchGallery, addNewGallery } from '../../api/service';

const InventoryList = (props) => {
  const initialState = {
    name: "",
    ownerName: "",
    email: "",
    position: "",
    address: "",
    website: "",
    biography: "",
    imageUrl: "",
    imgPublicId: "",
    convelio: ""
  };

  const [data, setData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isGalleryExist, setIsGalleryExist] = useState(false);
  const [convelio, setConvelio] = useState(true);
  const [image, setImage] = useState(null);
  // const [password, setPassword] = useState("")


  console.log("data",data);

  const onChange = (event) => {
    const { name, value } = event.target;
    setData({...data, [name]: value.toUpperCase()});
  };


  const fileHandler = e => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async () => {
    // console.log(data.ownerName, data.email, data.password, data.position, data.name, data.address, data.biography, data.website, convelio, image);
    const uploadData = new FormData();
    const dataCopy = data;
    dataCopy.convelio = convelio;
    uploadData.append("image", image);
    for (let key in dataCopy) {
      uploadData.append(key, dataCopy[key]);
    }
    const resData = await addNewGallery(uploadData);
    setData(resData);
  };

  useEffect(() => {
    async function fetchData() {
      await props.setUser(props.user);
      const resData = await fetchGallery();
      console.log("fetch the gallery", resData);
      if (!resData) {
        setIsGalleryExist(false);
      } else {
        setIsGalleryExist(true);
        setIsEditMode(false);
        setData(resData);
      }
    }
    fetchData();
  }, []);


  const startEditing = () => {
    setIsEditMode(true);
  };

  return (
  <div className="app-container">
      <div className="container-inventory">
      <div className="gallery-name">
        {data.name}
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
                </div>
                <div className="artwork-list-item">
                    <img src={house} alt="test-image" className="artwork-list-item-thumbnail" />
                    <div className="artwork-list-item-info"><span className="artwork-list-item-name">Brigit Megerle</span>, Title & Year, Signed, dated and numbered, Material, Dimension, Stock number, Price, Location</div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default InventoryList;
