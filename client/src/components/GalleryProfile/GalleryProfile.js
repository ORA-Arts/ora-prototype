import React from "react";
import "./GalleryProfile.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import house from './house-test.jpg';

class GalleryProfile extends React.Component {
  render() {
    return (
    <div className="app-container">
        <div className="container-profile">
        <div className="edit-button">
          <button className="btn-edit">Edit</button>
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
                    <span className="input-label">USER NAME/ </span>
                    <input type="text" className="input-hidden" placeholder="THOMAS BALLOT"></input>
                </div>
                <div className="input-container-half">
                    <span className="input-label">EMAIL/ </span>
                    <input type="email" className="input-hidden" placeholder="THIBAULT.HENRIET@ORA-ARTS.COM"></input>
                </div>
                <div className="input-container-half">
                    {/* should not display even in edit */}
                    <span className="input-label">PASSWORD/ </span>
                    <input type="password" className="input-hidden" placeholder="Password"></input>
                </div>
                <div className="input-container-half">
                    <span className="input-label">GALLERY POSITION/ </span>
                    <input type="text" className="input-hidden" placeholder="Director"></input>
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
                    <input type="text" className="input-hidden" placeholder="GALLERY NEU"></input>
                </div>
                <div className="input-container-full">
                    <span className="input-label">ADDRESS/ </span>
                    <input type="text" className="input-hidden" placeholder="435 Broadway New York 10013 Manhattan"></input>
                </div>
              </div>
              <div className="input-block large-box">
                <div className="input-container-half">
                    <div className="biography-box">
                        <div className="input-label input-lable-left">GALLERY BIOGRAPHY</div>
                        <div>
                            <textarea name="biography" id="biography" rows="25"></textarea>
                        </div>
                    </div>
                </div>
                <div className="input-container-half remove-border">
                    <div className="image-container">
                        <img className="gallery-image" src={house} alt="gallery house"/>
                        <button className="btn-image">CHANGE IMAGE</button>
                    </div>
                    <div className="input-container-half">
                        <div className="website-box">
                            <div className="input-label input-lable-left">WEBSITE </div>
                            <div className="input-lable-left">
                                <input type="text" className="input-hidden" placeholder="www.gallerieneu.com"></input>
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
                    <input type="radio" id="yes" name="YES" value="YES" checked />
                    <label htmlFor="yes">YES</label>
                    <input type="radio" id="no" name="NO" value="NO" />
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
