import React, {useState, useEffect} from "react";
import "./Inventory.css";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchArtworks, fetchGallery } from '../../api/service';
import { Link, withRouter } from 'react-router-dom';

const InventoryList = (props) => {

  const [data, setData] = useState(null);
  const [fetchedData, setFetchedData] =  useState(null);
  // refactor later
  const [dataBeforeSorted, setDataBeforeSorted] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      await props.setUser(props.user);
      const gallery = await fetchGallery();
        if (!gallery) {
            alert("You need to create the gallery profile first");
            return props.history.push(`/gallery/profile`);
        }
      const resData = await fetchArtworks();
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

  const renderItems = (resData) => {
    return resData.map(artwork => {
          return(
            <div className="artwork-list-item" key={artwork._id}>
                <Link className="link-artwork" to={`/gallery/inventory/${artwork._id}`}></Link>
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
  <div className="app-container-inventory-list">
      <div className="container-inventory">
      <div className="gallery-name">
        {/* later move the fetch to to root of gallery components */}
        {props.galleryName}
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
                <button onClick={() => props.history.push('/gallery/inventory/new')} className="btn-add-artwork">ADD A NEW ARTWORK</button>
            </div>
            <div className="flex-inventory-between ">
                <input type="text" className="inventory-search" placeholder="SEARCH" name="query" onChange={searchHandler} />
                <div className="inventory-sort">
                    <input type="checkbox" id="sort-by-value" onChange={toggleSortPrice} checked={sortByPrice}/>
                    <label className="label-button-like" htmlFor="sort-by-value">SORT BY VALUE</label>
                </div>
            </div>
            {/* <hr/> */}
            <div className="artwork-list">
                {!data ? null : renderItems(data)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default withRouter(InventoryList);
