import React, {useState, useEffect} from "react";
import "./GalleryProfile.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchGallery, addNewGallery, editGallery } from '../../api/service';
import imageDefault from './image-default.png';

const GalleryProfile = (props) => {
  const initialState = {
    name: "",
    firstName: "",
    lastName: "",
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
    let resData;
    if (isEditMode && isGalleryExist) {
      resData = await editGallery(uploadData);
    } else {
      resData = await addNewGallery(uploadData);
    }
    setData(resData);
    setIsEditMode(false);
    setIsGalleryExist(true);
    props.changeGalleryName(resData.name);
    // const resData = await addNewGallery(uploadData);
    // setData(resData);
  };

  useEffect(() => {
    async function fetchData() {
      await props.setUser(props.user);
      const resData = await fetchGallery();
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
    setIsEditMode(!isEditMode);
  };

  return (
  <div className="app-container">
      <div className="container-profile">
      <div className="gallery-name">
        {data.name}
      </div>
      <hr/>
      {isGalleryExist ?
      <div className="edit-button">
        <button className="btn-edit" onClick={startEditing}>Edit</button>
      </div>
      : null }
      <div className="container-profile-content">
        <ProfileSideBar content="my-gallery-profile"/>
        <div className="gallery-profile">
          <div className="gallery-content">
            <div className="profile-title">
              <hr />
              <span className="title-text">
                PERSONAL INFORMATION
              </span>
            </div>
            <div className="input-block">
              {/* replace input by real information later */}
              <div className="input-container-half">
                  <span className="input-label input-lable-right">First Name/ </span>
                  {/* <input type="text" name="username" onChange={e => setUsername(e.target.value.toUpperCase())} value={username} className="input-no-border" placeholder="THOMAS BALLOT" role="textbox"></input> */}
                  {isEditMode ? 
                    <input type="text" name="firstName" onChange={onChange} value={data.firstName} className="input-no-border" placeholder="Your First Name" role="textbox"></input> :
                    <span>{data.firstName}</span>
                  }
              </div>
              <div className="input-container-half">
                  <span className="input-label input-lable-right">Last Name/ </span>
                  {isEditMode ? 
                    <input type="text" name="lastName" onChange={onChange} value={data.lastName} className="input-no-border" placeholder="Your Last Name"></input> :
                    <span>{data.lastName}</span>
                    
                  }
              </div>
              <div className="input-container-half">
                  {/* should not display even in edit */}
                  <span className="input-label input-lable-right">EMAIL/ </span>
                  {isEditMode ? 
                    <input type="email" name="email" onChange={onChange} value={data.email} className="input-no-border" placeholder="youremail@mail.com"></input> :
                    <span>{data.email}</span>
                  }
              </div>
              <div className="input-container-half">
                  <span className="input-label input-lable-right">GALLERY POSITION/ </span>
                  {isEditMode ? 
                    <input type="text" name="position" onChange={onChange} value={data.position} className="input-no-border" placeholder="Position at the gallery (ie. Director)"></input> :
                    <span>{data.position}</span>
                  }
              </div>
            </div>
            <div className="profile-title space-top">
              <hr />
              <span className="title-text">
                PRACTICAL INFORMATION
              </span>
            </div>
            <div className="input-block">
              <div className="input-container-full">
                  <span className="input-label">NAME OF THE GALLERY/ </span>
                  {isEditMode ? 
                    <input type="text" name="name" onChange={onChange} value={data.name} className="input-no-border" placeholder="name of the gallery"></input> :
                    <span>{data.name}</span>
                  }
              </div>
              <div className="input-container-full">
                  <span className="input-label">ADDRESS/ </span>
                  {isEditMode ? 
                    <input type="text" name="address" onChange={onChange} value={data.address} className="input-no-border" placeholder="address of the gallery"></input> :
                    <span>{data.address}</span>
                  } 
              </div>
            </div>
            <div className="input-block large-box">
              <div className="input-container-half">
                  <div className="biography-box">
                      <div className="input-label input-lable-left">GALLERY BIOGRAPHY</div>
                      <div>
                        {isEditMode ? 
                          <textarea name="biography" onChange={onChange} value={data.biography} id="biography" className="input-no-border" rows="24" placeholder="your gallery biography"></textarea> :
                        <div className="biography-text">{data.biography}</div>
                        } 
                      </div>
                  </div>
              </div>
              <div className="input-container-half remove-border">
                  <div className="image-container">
                      <img className="gallery-image" src={image ? URL.createObjectURL(image) : data.imageUrl ? data.imageUrl : imageDefault} alt={image ? image.name.split(".")[0] : "default-image"} />
                      {isEditMode ? 
                      <>
                      <input type={(isGalleryExist && !isEditMode) ? "hidden" : "file"} id="file" className="input-hidden" onChange={fileHandler}  />
                      <label htmlFor="file" className="btn-image">CHANGE IMAGE</label>
                      </>
                      : null }
                      {/* <button className="btn-image">CHANGE IMAGE</button> */}
                  </div>
                  <div className="input-container-half">
                      <div className="website-box">
                          <div className="input-label input-lable-left">WEBSITE </div>
                          <div className="input-lable-left">
                              {isEditMode ? 
                                <input type="text" name="website" id="website" onChange={onChange} value={data.website} className="input-no-border" placeholder="yourgallerywebsite@website.com"></input> :
                                <span>{data.website}</span>
                              } 
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <div className="profile-title space-top">
              <hr />
              <span className="title-text">
                SHIPPING INFORMATION
              </span>
            </div>
            <div className="shipping-info">
              <span className="shipping-title">CONVELIO</span>
              
              <div id="selectTopic">
                {isEditMode ? 
                  <>
                  <input type="radio" id="yes" name="convelio" onChange={e => setConvelio(true)} checked={convelio} />
                  <label htmlFor="yes">YES</label>
                  <input type="radio" id="no" name="convelio" onChange={e => setConvelio(false)} checked={!convelio}/>
                  <label htmlFor="no">NO</label>
                  </>
                : convelio ? "YES" : "NO" }
              </div>
              
            </div>
            {isEditMode ? 
            <button className="btn-edit save-change space-top" onClick={submitHandler}>SAVE CHANGES</button>
            : null}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default GalleryProfile;
