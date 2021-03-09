import React, {useState, useEffect} from "react";
import "./CollectorProfile.css";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { fetchGallery, addNewGallery, editGallery } from '../../api/service';

const CollectorProfile = (props) => {
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

  return (
  // <div className="app-container">
  //   <div className="collector-container-profile">
  //     <div className="collector-header">
  //       <div className="collector-name">
  //         LISA ABRAHAM
  //         {/* {data.name} */}
  //       </div>
  //       {/* <div className="request-source-button"> */}
  //         <button className="btn-request">REQUEST A SPECIAL SOURCING</button>
  //       {/* </div> */}
  //     </div>
  //     <hr/>
  //   </div>
  //   <div className="container-profile-content">
  //     <CollectorSideBar content="my-collector-profile" />
  //   </div>
  // </div>
  <div className="app-container-collector-profile">
    <div className="collector-container-profile">
      <div className="collector-header">
        <div className="collector-name">
          LISA ABRAHAM
        </div>
        <button className="btn-request">REQUEST A SPECIAL SOURCING</button>
      </div>
      <div className="container-profile-content">
        <CollectorSideBar content="my-collector-profile"/>
        <div className="collector-profile">
          <div className="collector-profile-header">
            <div className="header-text">Welcome to private sales ! Thanks to this feature, you can directly connect with</div>
            <div className="header-text">each of our partner galleries to find out about their available artworks.</div>
          </div>
          <div className="collector-profile-title">
            <hr />
            <span className="collector-title-text">
              Are you interested in a particular artist represented by one of ORA’s partner galleries ?
            </span>
          </div>
          <div className="presented-galleries-selection">
            <div className="search-for-artist">
              <div className="text-label">YES, TYPE IN ARTIST/ </div>
              <input type="text" className="collector-artist-search" placeholder="TYPE HERE" name="query" />
            </div>
            <div className="receive-suggestion">
              <input type="checkbox" id="receive-suggestion" />
              <label className="label-button-like" htmlFor="receive-suggestion">SORT BY VALUE</label>
              {/* <input type="checkbox" id="sort-by-value" onChange={toggleSortPrice} checked={sortByPrice}/>
              <label className="label-button-like" htmlFor="sort-by-value">SORT BY VALUE</label> */}
            </div>
          </div>
          <div className="collector-profile-title">
            <hr />
            <span className="collector-title-text">
              Which of the following are you looking for ?
            </span>
          </div>
          <div className="type-of-artwork">
            <input type="radio" id="unique" name="type" />
            <label htmlFor="unique">
              <div>
                <div className="artwork-type-title">A UNIQUE ARTWORK</div>
                <div className="artwork-type-remark">(please note unique artworks for name of the artist approximately range from 3keu - 25keu)</div>
              </div>
            </label>
            <input type="radio" id="edition" name="type" />
            <label htmlFor="edition">
              <div>
                <div className="artwork-type-title">AN EDITION</div>
                <div className="artwork-type-remark">(please note editions for name of the artist approximately range from estimation basse - haute)</div>
              </div>
            </label>
            {/* <input type="radio" id="yes" name="convelio" onChange={e => setConvelio(true)} checked={convelio} />
            <label htmlFor="yes">YES</label>
            <input type="radio" id="no" name="convelio" onChange={e => setConvelio(false)} checked={!convelio}/>
            <label htmlFor="no">NO</label> */}
          </div>
          <div className="collector-profile-title">
            <hr />
            <span className="collector-title-text">
              IS THERE A MEDIUM IN WHICH YOU WERE PARTICULARLY INTERESTED IN ?
            </span>
          </div>
          <div className="type-of-medium">
            <input type="radio" id="Sculpture" name="medium" />
            <label htmlFor="Sculpture">SCULPTURE</label>
            <input type="radio" id="Painting" name="medium" />
            <label htmlFor="Painting">Painting</label>
            <input type="radio" id="Photography" name="medium" />
            <label htmlFor="Photography">Photography</label>
            <input type="radio" id="Drawing" name="medium" />
            <label htmlFor="Drawing">Drawing</label>
            <input type="radio" id="Performance" name="medium" />
            <label htmlFor="Performance">Performance</label>
            {/* <input type="radio" id="yes" name="convelio" onChange={e => setConvelio(true)} checked={convelio} />
            <label htmlFor="yes">YES</label>
            <input type="radio" id="no" name="convelio" onChange={e => setConvelio(false)} checked={!convelio}/>
            <label htmlFor="no">NO</label> */}
          </div>
          <div className="collector-profile-title">
            <hr />
            <span className="collector-title-text">
              WHAT KIND OF BUDGET DO YOU HAVE IN MIND ?
            </span>
          </div>
          <div className="target-budget-gallery">
            <div className="collector-budget">
              <div className="text-label">Budget in KEUR/ </div>
              <input type="text" placeholder="TYPE HERE" name="buget" />
            </div>
          </div>

          <div className="collector-profile-title">
            <hr />
            <span className="collector-title-text">
              WHICH OF THE FOLLOWING GALLERIES WOULD YOU LIKE TO ADDRESS THIS REQUEST TO ?
            </span>
          </div>
          <div className="target-budget-gallery">
            <div className="collector-gallery">
              <div className="text-label">Select a gallery/ </div>
              <select name="gellery">
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>

          <div className="collector-profile-title">
            <hr />
            <span className="collector-title-text">
              DO YOU HAVE ANY OTHER INFORMATION YOU WANTED TO SHARE WITH GALERIE NEU ?
            </span>
          </div>
          <div className="collector-request-message">
            <div className="collector-text-area">GALLERY BIOGRAPHY</div>
            <div>
              <textarea name="biography" id="request-message" rows="8" placeholder="your gallery biography"></textarea> :
              {/* <div className="biography-text"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CollectorProfile;
