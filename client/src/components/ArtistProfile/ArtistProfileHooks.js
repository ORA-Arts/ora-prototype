import './ArtistProfile.css'
import React, { useState, useEffect } from 'react'
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchArtist, addNewArtist, fetchArtistById, fetchGallery, editArtist } from '../../api/service';
import imageDefault from './image-default.png';
import {withRouter} from 'react-router-dom';


// only allow when user create the profile, so if the gallery exist, else redirect to profile.
const ArtistProfileHooks = (props) => {
    const initialState = {
        name: '',
        birthYear: 1980,
        birthPlace: '',
        imageUrl: '',
        imgPublicId: '',
        caption: '',
        medium: [],
        relationship: [],
        meta_data: '',
        artwork_min: 0,
        artwork_max: 0,
        editions_min: 0,
        editions_max: 0,
        artistBiography: '',
        mainQuote: '',
    }
    const [data, setData] = useState(initialState);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(true);
    const [image, setImage] = useState(null);
    const [checkedItems, setCheckedItems] = useState({})
    const [checkedRel, setCheckedRel] = useState("")
    const [artistId, setArtistId] = useState(null);
    const [gallery, setGallery] = useState(null);

    // console.log("data", data);

    const mediums = ['Painting', 'Sculpture', 'Photography', 'Video Art', 'Performance', 'Drawing', 'Mixed Media']
    const relationships = ['represented', 'works available']

    const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
        // console.log("Checkbox: ", name, checked);
        return (
            <input type={type} name={name} checked={checked} onChange={onChange} />
        );
    };
    

    const handleCheckboxChange = event => {
        //medium
        let selMediums = []
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
        // console.log("checkedItems: ", checkedItems);
        selMediums = Object.keys(checkedItems)
        setData({ ...data, 'medium': selMediums })
    
    }

    const handleCheckboxRel = event => {
    //relationship
    
    let selRelationships = ''
    setCheckedRel(event.target.name);
    // console.log("checked Relationships: ", checkedRel);
    
    setData({ ...data, 'relationship': event.target.name })
    }

    // console.log(checkedRel)

    const checkboxes = mediums.map(medium => {
        return {
            name: medium,
            key: medium,
            label: medium.toUpperCase
        }
    })
    // console.log(checkboxes)

    const relCheckboxes = relationships.map(rel => {
        return {
            name: rel,
            key: rel,
            label: rel.toUpperCase
        }
    })
    // console.log(relCheckboxes)

    const onChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };


    const fileHandler = e => {
        setImage(e.target.files[0]);
    };

    const submitHandler = async () => {
        const uploadData = new FormData();
        const dataCopy = data;
        dataCopy.gallery = gallery._id;
        dataCopy.birthYear = Number(dataCopy.birthYear);
        uploadData.append("image", image);
        for (let key in dataCopy) {
            uploadData.append(key, dataCopy[key]);
        }
        let resData;
        if (isEditMode && isViewMode) {
            resData = await editArtist(artistId, uploadData);
        } else {
            resData = await addNewArtist(uploadData);
        }
        if (resData) props.history.push(`/gallery/artists/${resData._id}`);
        // console.log('res data' + resData);
        setIsViewMode(true);
        setData(resData);
        setIsEditMode(false);
        setImage(null);
        setArtistId(resData._id);
        
    }
    const startEditing = () => {
        setIsEditMode(!isEditMode);
    };

    useEffect(() => {
        console.log(props.match.params.id);
        if (!props.isViewMode) {
            setData(initialState);
            setIsViewMode(false);
            setIsEditMode(true);
        } else {
            setArtistId(props.match.params.id);
        }
        async function fetchData() {
            await props.setUser(props.user);
            const gallery = await fetchGallery();
            if (!gallery) {
                alert("You need to create the gallery profile first");
                return props.history.push(`/gallery/profile`);
            }
            setGallery(gallery);
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log("run here");
        console.log("artistID: ", artistId)
        async function fetchData() {
            if (artistId) {
                const artist = await fetchArtistById(artistId);
                console.log("artist data: ", artist);
                setData(artist);
                setIsEditMode(false);
                setIsViewMode(true);
            }
        }
        fetchData();
    }, [artistId]);


    return (
        <>
            <div className="gallery-name-artists">
                {props.galleryName}
            </div>
            <hr/>
            <div className='myArtists'>
                <ProfileSideBar content="my-artists" />
                <div className='artistsContainer'>
                        {isViewMode ?
                        <div className="edit-button">
                            <button className="btn-edit" onClick={startEditing}>Edit</button>
                        </div>
                        : null }
                    <div className='myArtistsHeader'>
                        <hr />
                        <span className='subtitle'>ARTIST INFORMATION</span>
                    </div>
                    <div className="artist-name">
                        {data.name}
                    </div>
                    <div className='artistsInfo'>
                        <div className='topInfo'>
                            <div className='left'>
                                <div className="artist-input">
                                    <span className="inputLabel">FULL NAME/ </span>
                                    {isEditMode ?
                                        <input type="text" name="name" onChange={onChange} value={data.name} className="inputClear name" placeholder="artist full name" ></input> :
                                        <span> {data.name} </span>
                                    }
                                </div>
                                <div className="artist-input">
                                    <span className="inputLabel">BIRTH YEAR/ </span>
                                    {isEditMode ?
                                        <input type="text" name="birthYear" onChange={onChange} value={data.birthYear} className="inputClear year" placeholder="number"></input> :
                                        <span> {data.birthYear} </span>}
                                </div>.
                <div className="artist-input">
                                    <span className="inputLabel">BIRTH PLACE/ </span>
                                    {isEditMode ?
                                        <input type="text" name="birthPlace" onChange={onChange} value={data.birthPlace} className="inputClear city" placeholder="Place of birth"></input> :
                                        <span> {data.birthPlace} </span>}
                                </div>
                            </div>
                            <div className='right'>

                                <div className="image-container" id='artistImgC'>
                                    <img className="artist-image" src={image ? URL.createObjectURL(image) : data.imageUrl ? data.imageUrl : imageDefault} alt={image ? data.name.split(".")[0] : 'artistImage'} />
                                    {isEditMode ?
                                    <>
                                    <input type={(isViewMode && !isEditMode) ? "hidden" : "file"} id="file" className="input-hidden" onChange={fileHandler} />
                                    <label htmlFor="file" className="btn-image">CHANGE IMAGE</label>
                                    </>
                                    : null }   
                                </div>
                            </div>
                        </div>
                        <div className='middleInfo'>
                            <div className="medium-input">
                                <span className="inputLabel">MEDIUM/ </span>
                                {isEditMode ?
                                    checkboxes.map(item => (
                                        <div id="ck-button" className="inputClear">
                                            <label key={item.key} >
                                                <Checkbox
                                                    name={item.name}
                                                    checked={checkedItems[item.name]}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span>{item.name}</span>
                                            </label>
                                        </div>
                                    )) :
                                    // <input type="text" name="medium" onChange={onChange} value={data.medium} className="inputClear medium" placeholder="Medium"></input> :
                                    <span> {data.medium} </span>}
                            </div>
                            <div className="medium-input">
                                <span className="inputLabel">RELATIONSHIP WITH THE GALLERY/ </span>
                                {isEditMode ?
                                    relCheckboxes.map(item => (
                                        <div id="ck-button" className="inputClear">
                                            <label key={item.key} >
                                                <Checkbox
                                                    name={item.name}
                                                    checked={checkedRel === item.name}
                                                    onChange={handleCheckboxRel}
                                                />
                                                <span>{item.name}</span>
                                            </label>
                                        </div>
                                    ))
                                    : <span> {data.relationship} </span>}
                            </div>
                            <div className="medium-input">
                                <span className="inputLabel">KEYWORDS/ </span>
                                {isEditMode ?
                                    <input type="text" name="meta_data" onChange={onChange} value={data.meta_data} className="inputClear medium" placeholder="Keywords"></input> :
                                    <span> {data.meta_data} </span>}
                            </div>
                        </div>
                        <div className='topInfo'>
                            <div className='left'>
                                <div className="artist-input">
                                    <span className="inputLabel">UNIQUE ARTWORKS PRICE RANGE <br/> (MIN MAX IN k€) / </span>
                                    {isEditMode ?
                                        <>
                                            <input type="text" name="artwork_min" onChange={onChange} value={data.artwork_min} className="inputClear min" placeholder="3"></input><span>-</span>
                                            <input type="text" name="artwork_max" onChange={onChange} value={data.artwork_max} className="inputClear min" placeholder="3"></input><span className='textkEur'>k€</span>
                                        </> : <span> {data.artwork_min} K - {data.artwork_max} K </span>}
                                </div>
                            </div>
                            <div className='right'>
                                <div className="artist-input">
                                    <span className="inputLabel">EDITIONS AND MULTIPLIES <br/> (MIN MAX IN k€)/ </span>
                                    {isEditMode ?
                                        <>
                                            <input type="text" name="editions_min" onChange={onChange} value={data.editions_min} className="inputClear min" placeholder="3"></input><span>-</span>
                                            <input type="text" name="editions_max" onChange={onChange} value={data.editions_max} className="inputClear min" placeholder="3"></input><span className='textkEur'>k€</span>
                                        </> : <span> {data.editions_min} K - {data.editions_max} K </span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='myArtistsHeader'>
                        <hr />
                        <span className='subtitle'>BIOGRAPHY, EXHIBITION, PRESS</span>
                    </div>

                    <div className='addArtist'>
                        <h4>ARTIST BIOGRAPHY</h4>
                        {isEditMode ?
                            <textarea name="artistBiography" onChange={onChange} value={data.artistBiography} id="biography" className="biography-text" rows="15" placeholder="your gallery biography"></textarea> :
                            <span className="biography-text"> {data.artistBiography} </span>}

                    </div>
                    <div className='addArtist'>
                        <h4>MAIN QUOTE</h4>
                        {isEditMode ?
                            <textarea name="mainQuote" onChange={onChange} value={data.mainQuote} id="biography" className="biography-text" rows="5" placeholder="Your quote"></textarea> :
                            <span className="biography-text"> {data.mainQuote} </span>}
                    </div>
                    {isEditMode ? <button className='btnBlack' onClick={submitHandler}> SAVE ARTIST </button> : null }
                </div>
            </div>
        </>
    )
}

export default withRouter(ArtistProfileHooks);
