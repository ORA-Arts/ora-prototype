import React from "react";
import "./GalleryProfile.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import image from './image-default.png';

class GalleryProfile extends React.Component {
  constructor(props) {
    super(props);
    // replace by props. if the gallery information exist
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      name: "",
      address: "",
      website: "",
      imageFile: null,
      convelio: true,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    let { name, value } = event.target;
    console.log(name, value);
    if (name === "convelio") {
      value = value === "YES";
    } else {
      value = value.toUpperCase();
    }
    this.setState(() => ({
      [name]: value
    }));
  }

  render() {
    console.log(this.state);
    return (
      <div className="app-container">
        <div className="container-profile">
          <div className="edit-button">
            <button className="btn-edit">Edit</button>
          </div>
          <div className="container-profile-content">
            <ProfileSideBar content="my-gallery-profile" />
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
                    <input type="text" name="firstName" onChange={this.onChangeHandler} value={this.state.firstName} className="input-hidden" placeholder="Your First Name" role="textbox"></input>
                  </div>
                  <div className="input-container-half">
                    <span className="input-label input-lable-right">Last Name/ </span>
                    <input type="password" name="lastName" onChange={this.onChangeHandler} value={this.state.lastName} className="input-hidden" placeholder="Your Last Name"></input>
                  </div>
                  <div className="input-container-half">
                    {/* should not display even in edit */}
                    <span className="input-label input-lable-right">EMAIL/ </span>
                    <input type="email" name="email" onChange={this.onChangeHandler} value={this.state.email} className="input-hidden" placeholder="youremail@mail.com"></input>
                  </div>
                  <div className="input-container-half">
                    <span className="input-label input-lable-right">GALLERY POSITION/ </span>
                    <input type="text" name="position" onChange={this.onChangeHandler} value={this.state.position} className="input-hidden" placeholder="Your position at the gallery"></input>
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
                    <input type="text" name="name" onChange={this.onChangeHandler} value={this.state.name} className="input-hidden" placeholder="Enter the name of the gallery"></input>
                  </div>
                  <div className="input-container-full">
                    <span className="input-label">ADDRESS/ </span>
                    <input type="text" name="address" onChange={this.onChangeHandler} value={this.state.address} className="input-hidden" placeholder="Enter the address of the gallery"></input>
                  </div>
                </div>
                <div className="input-block large-box">
                  <div className="input-container-half">
                    <div className="biography-box">
                      <div className="input-label input-lable-left">GALLERY BIOGRAPHY</div>
                      <div>
                        <textarea name="biography" onChange={this.onChangeHandler} value={this.state.biography} id="biography" className="input-hidden" rows="24" placeholder="your gallery biography"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="input-container-half remove-border">
                    <div className="image-container">
                      <img className="gallery-image" src={image} alt="gallery house" />
                      {/* Upload image here */}
                      <button className="btn-image">CHANGE IMAGE</button>
                    </div>
                    <div className="input-container-half">
                      <div className="website-box">
                        <div className="input-label input-lable-left">WEBSITE </div>
                        <div className="input-lable-left">
                          <input type="text" name="website" onChange={this.onChangeHandler} value={this.state.website} className="input-hidden" placeholder="www.gallerieneu.com"></input>
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
                    <input type="radio" id="yes" name="convelio" onChange={this.onChangeHandler} value="YES" checked={this.state.convelio} />
                    <label htmlFor="yes">YES</label>
                    <input type="radio" id="no" name="convelio" onChange={this.onChangeHandler} value="NO" checked={!this.state.convelio} />
                    <label htmlFor="no">NO</label>
                  </div>
                </div>
                <button className="btn-edit save-change space-top">SAVE CHANGES</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryProfile;
