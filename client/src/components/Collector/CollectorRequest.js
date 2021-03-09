import React, {useState, useEffect} from "react";
import "./CollectorRequest.css";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { fetchAllGalleries, sendRequestToGallery } from '../../api/service';

const CollectorRequest = (props) => {
  const initialState = {
    artist: "",
    suggestion: true,
    type: "Unique",
    medium: "Sculpture",
    budget: 10,
    gallery: null,
    requestMessage: "",
  };

  const [data, setData] = useState(initialState);
  const [galleries, setGalleries] = useState([]);
  console.log(data);

  useEffect(() => {
    async function fetchData() {
      // await props.setUser(props.user);
      const resGalleries = await fetchAllGalleries();
      if (resGalleries.length) {
        setData({...data, gallery: resGalleries[0].id});
      }
      setGalleries(resGalleries);
    }
    fetchData();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "suggestion") {
      return setData({...data, suggestion: !data.suggestion, artist: ""});
    } else if (name === "artist") {
      if (value === "") {
        return setData({...data, suggestion: true, artist: value});
      } else {
        return setData({...data, suggestion: false, artist: value});
      }
    }
    setData({...data, [name]: value});
  };

  const submitHandler = async () => {
    const resData = await sendRequestToGallery(data);
    if (resData.success) {
      setData({...initialState, gallery: galleries[0].id});
      // redirect later
    } else {
      alert("Sometime when wrong with our server");
    }
    // setData(initialState);
    
  };

  return (
  <div className="app-container-collector-request">
    <div className="collector-container-request">
      <div className="collector-header">
        <div className="collector-name">
          LISA ABRAHAM
        </div>
        <button className="btn-request">REQUEST A SPECIAL SOURCING</button>
      </div>
      <div className="container-request-content">
        <CollectorSideBar content="create-request"/>
        <div className="collector-request">
          <div className="collector-request-header">
            <div className="header-text">Welcome to private sales ! Thanks to this feature, you can directly connect with</div>
            <div className="header-text">each of our partner galleries to find out about their available artworks.</div>
          </div>
          <div className="collector-request-title">
            <hr />
            <span className="collector-title-text">
              Are you interested in a particular artist represented by one of ORA’s partner galleries ?
            </span>
          </div>
          <div className="presented-galleries-selection">
            <div className="search-for-artist">
              <div className="text-label">YES, TYPE IN ARTIST/ </div>
              <input onChange={onChange} value={data.artist} type="text" className="collector-artist-search" placeholder="TYPE HERE" name="artist" />
            </div>
            <div className="receive-suggestion">
              <input type="checkbox" id="receive-suggestion" name="suggestion" onChange={onChange} checked={data.suggestion} />
              <label className="label-button-like" htmlFor="receive-suggestion">NO, I WOULD LIKE TO RECEIVE SOME SUGGESTIONS</label>
            </div>
          </div>
          <div className="collector-request-title">
            <hr />
            <span className="collector-title-text">
              Which of the following are you looking for ?
            </span>
          </div>
          <div className="type-of-artwork">
            <input type="radio" id="unique" name="type" value="Unique" onChange={onChange} checked={data.type === "Unique"}/>
            <label htmlFor="unique">
              <div>
                <div className="artwork-type-title">A UNIQUE ARTWORK</div>
                <div className="artwork-type-remark">(please note unique artworks for name of the artist approximately range from 3keu - 25keu)</div>
              </div>
            </label>
            <input type="radio" id="edition" name="type" value="Editions" onChange={onChange} checked={data.type === "Editions"} />
            <label htmlFor="edition">
              <div>
                <div className="artwork-type-title">AN EDITION</div>
                <div className="artwork-type-remark">(please note editions for name of the artist approximately range from estimation basse - haute)</div>
              </div>
            </label>
          </div>
          <div className="collector-request-title">
            <hr />
            <span className="collector-title-text">
              IS THERE A MEDIUM IN WHICH YOU WERE PARTICULARLY INTERESTED IN ?
            </span>
          </div>
          <div className="type-of-medium">
            <input type="radio" id="Sculpture" value="Sculpture" onChange={onChange} name="medium" />
            <label htmlFor="Sculpture">SCULPTURE</label>
            <input type="radio" id="Painting" value="Painting" onChange={onChange} name="medium" />
            <label htmlFor="Painting">Painting</label>
            <input type="radio" id="Photography" value="Photography" onChange={onChange} name="medium" />
            <label htmlFor="Photography">Photography</label>
            <input type="radio" id="Drawing" value="Drawing" onChange={onChange} name="medium" />
            <label htmlFor="Drawing">Drawing</label>
            <input type="radio" id="Performance" value="Performance" onChange={onChange} name="medium" />
            <label htmlFor="Performance">Performance</label>
          </div>
          <div className="collector-request-title">
            <hr />
            <span className="collector-title-text">
              WHAT KIND OF BUDGET DO YOU HAVE IN MIND ?
            </span>
          </div>
          <div className="target-budget-gallery">
            <div className="collector-budget">
              <div className="text-label">Budget in KEUR/ </div>
              <input onChange={onChange} value={data.budget} type="number" placeholder="TYPE HERE" name="budget" />
            </div>
          </div>

          <div className="collector-request-title">
            <hr />
            <span className="collector-title-text">
              WHICH OF THE FOLLOWING GALLERIES WOULD YOU LIKE TO ADDRESS THIS REQUEST TO ?
            </span>
          </div>
          <div className="target-budget-gallery">
            <div className="collector-gallery">
              <div className="text-label">Select a gallery/ </div>
              <select name="gallery" onChange={onChange}>
                {galleries ? galleries.map((gallery, index) => <option key={index} value={gallery.id}>{gallery.name}</option>) : null}
              </select>
            </div>
          </div>

          <div className="collector-request-title">
            <hr />
            <span className="collector-title-text">
              DO YOU HAVE ANY OTHER INFORMATION YOU WANTED TO SHARE WITH GALERIE NEU ?
            </span>
          </div>
          <div className="collector-request-message">
            <div className="collector-text-area">GALLERY BIOGRAPHY</div>
            <div>
              <textarea onChange={onChange} value={data.requestMessage} name="requestMessage" id="request-message" rows="8" placeholder="your gallery biography"></textarea>
            </div>
          </div>
          <button className='send-request-btn' onClick={submitHandler}> SAVE ARTIST </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CollectorRequest;
