import React, {useState, useEffect} from "react";
import "./GalleryProfile.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import house from './house-test.jpg';

const GalleryProfile = (props) => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    position: "",
    name: "",
    address: "",
    website: "",
  };

  const [data, setData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(true);
  const [convelio, setConvelio] = useState(true);
  const [image, setImage] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setData({...data, [name]: value.toUpperCase()});
  };


  const fileHandler = e => {
    setImage(e.target.files[0]);
  };

  const submitHandler = () => {
    // console.log(username, email, password, position, name, address, biography, website, convelio, image);
  };

  const startEditing = () => {
    setIsEditMode(true);
  };

  return (
  <div className="app-container">
      <div className="container-profile">
      <div className="edit-button">
        <button className="btn-edit" onClick={startEditing}>Edit</button>
      </div>
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
                  <span className="input-label input-lable-right">USER NAME/ </span>
                  {/* <input type="text" name="username" onChange={e => setUsername(e.target.value.toUpperCase())} value={username} className="input-no-border" placeholder="THOMAS BALLOT" role="textbox"></input> */}
                  {isEditMode ? 
                    <input type="text" name="username" onChange={onChange} value={data.username} className="input-no-border" placeholder="THOMAS BALLOT" role="textbox"></input> :
                    <span>{data.username}</span>
                  }
              </div>
              <div className="input-container-half">
                  <span className="input-label input-lable-right">EMAIL/ </span>
                  {isEditMode ? 
                    <input type="email" name="email" onChange={onChange} value={data.email} className="input-no-border" placeholder="THIBAULT.HENRIET@ORA-ARTS.COM"></input> :
                    <span>{data.email}</span>
                  }
              </div>
              <div className="input-container-half">
                  {/* should not display even in edit */}
                  <span className="input-label input-lable-right">PASSWORD/ </span>
                  {isEditMode ? 
                    <input type="password" name="password" onChange={onChange} value={data.password} className="input-no-border" placeholder="Password"></input> :
                    <span>{data.password}</span>
                  }
              </div>
              <div className="input-container-half">
                  <span className="input-label input-lable-right">GALLERY POSITION/ </span>
                  {isEditMode ? 
                    <input type="text" name="position" onChange={onChange} value={data.position} className="input-no-border" placeholder="Director"></input> :
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
                    <input type="text" name="name" onChange={onChange} value={data.name} className="input-no-border" placeholder="GALLERY NEU"></input> :
                    <span>{data.name}</span>
                  }
              </div>
              <div className="input-container-full">
                  <span className="input-label">ADDRESS/ </span>
                  {isEditMode ? 
                    <input type="text" name="address" onChange={onChange} value={data.address} className="input-no-border" placeholder="435 Broadway New York 10013 Manhattan"></input> :
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
                        <span>{data.biography}</span>
                        } 
                      </div>
                  </div>
              </div>
              <div className="input-container-half remove-border">
                  <div className="image-container">
                      <img className="gallery-image" src={image ? URL.createObjectURL(image) : house} alt={image ? image.name.split(".")[0] : "house sample"} />
                      <input type="file" id="file" className="input-hidden" onChange={fileHandler}  />
                      <label htmlFor="file" className="btn-image">CHANGE IMAGE</label>
                      {/* <button className="btn-image">CHANGE IMAGE</button> */}
                  </div>
                  <div className="input-container-half">
                      <div className="website-box">
                          <div className="input-label input-lable-left">WEBSITE </div>
                          <div className="input-lable-left">
                              {isEditMode ? 
                                <input type="text" name="website" onChange={onChange} value={data.website} className="input-no-border" placeholder="www.gallerieneu.com"></input> :
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
              {/* checked={this.state.convelio === true} */}
                  <input type="radio" id="yes" name="convelio" onChange={e => setConvelio(true)} checked={convelio} />
                  <label htmlFor="yes">YES</label>
                  <input type="radio" id="no" name="convelio" onChange={e => setConvelio(false)} checked={!convelio}/>
                  <label htmlFor="no">NO</label>
              </div>
            </div>
            <button className="btn-edit save-change space-top" onClick={submitHandler}>SAVE CHANGES</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default GalleryProfile;
