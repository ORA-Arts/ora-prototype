import './ArtistProfile.css'
import React, { useState, useEffect } from 'react'
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { fetchArtist, addNewArtist, fetchArtistById } from '../../api/service';
import artistImage from './artist.jpg'

const ArtistProfileHooks = (props) => {
    const initialState = {
        name: '',
        birthYear: 0,
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
    const [isArtistExist, setIsArtistExist] = useState(false);
    const [isEditMode, setIsEditMode] = useState(true);
    const [image, setImage] = useState(null);
    const [checkedItems, setCheckedItems] = useState({})
    const [checkedRel, setCheckedRel] = useState("")
    const [artistId, setArtistId] = useState(null);

    console.log("data", data);

    const mediums = ['Painting', 'Sculpture', 'Photography', 'Video Art', 'Performance', 'Drawing', 'Mixed Media']
    const relationships = ['represented', 'works available']

    const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
        console.log("Checkbox: ", name, checked);
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
        console.log("checkedItems: ", checkedItems);
        selMediums = Object.keys(checkedItems)
        setData({ ...data, 'medium': selMediums })
    
    }

    const handleCheckboxRel = event => {
    //relationship
    
    let selRelationships = ''
    setCheckedRel(event.target.name);
    console.log("checked Relationships: ", checkedRel);
    
    setData({ ...data, 'relationship': event.target.name })
    }

    console.log(checkedRel)

    const checkboxes = mediums.map(medium => {
        return {
            name: medium,
            key: medium,
            label: medium.toUpperCase
        }
    })
    console.log(checkboxes)

    const relCheckboxes = relationships.map(rel => {
        return {
            name: rel,
            key: rel,
            label: rel.toUpperCase
        }
    })
    console.log(relCheckboxes)

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
        uploadData.append("image", image);
        for (let key in dataCopy) {
            uploadData.append(key, dataCopy[key]);
        }
        const resData = await addNewArtist(uploadData);
        console.log('res data' + resData)
        setData(resData);
    }
    const startEditing = () => {
        setIsEditMode(true)
    }

    useEffect(() => {
        async function fetchData() {
            await props.setUser(props.user);
            const resData = await fetchArtist();
            console.log("fetch the artist", resData);
            if (!resData) {
                setIsArtistExist(false);
            } else {
                setIsArtistExist(true);
                setIsEditMode(false);
                setData(resData);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            if (artistId) {
                const artist = await fetchArtistById(artistId);
                setData(artist);
                setIsEditMode(false);
            }
        }
        fetchData();
    }, [artistId]);


    return (
        <>
            <div className='myArtists'>
                <ProfileSideBar content="my-artists" />
                <div className='artistsContainer'>
                    <div className='myArtistsHeader'>
                        <hr />
                        <span className='subtitle'>ARTIST INFORMATION</span>
                    </div>
                    <div className="artist-name">
                        {data.name}
                    </div>
                    <div className='artistsInfo'>
                        <div className="edit-button">
                            <button className="btn-edit" onClick={startEditing}>Edit</button>
                        </div>
                        <div className='topInfo'>
                            <div className='left'>
                                <div className="artist-input">
                                    <span className="inputLabel">NAME/ </span>
                                    {isEditMode ?
                                        <input type="text" name="name" onChange={onChange} value={data.name} className="inputClear name" placeholder="THOMAS BALLOT" ></input> :
                                        <span> {data.name} </span>
                                    }
                                </div>
                                <div className="artist-input">
                                    <span className="inputLabel">BIRTH YEAR/ </span>
                                    {isEditMode ?
                                        <input type="text" name="birthYear" onChange={onChange} value={data.birthYear} className="inputClear year" placeholder="1989"></input> :
                                        <span> {data.birthYear} </span>}
                                </div>.
                <div className="artist-input">
                                    <span className="inputLabel">BIRTH PLACE/ </span>
                                    {isEditMode ?
                                        <input type="text" name="birthPlace" onChange={onChange} value={data.birthPlace} className="inputClear city" placeholder="Berlin"></input> :
                                        <span> {data.birthPlace} </span>}
                                </div>
                            </div>
                            <div className='right'>

                                <div className="image-container">
                                    <img className="artist-image" src={image ? URL.createObjectURL(image) : data.imageUrl} alt={image ? data.name.split(".")[0] : 'artistImage'} />
                                    <input type={(isArtistExist && !isEditMode) ? "hidden" : "file"} id="file" className="input-hidden" onChange={fileHandler} />
                                    <label htmlFor="file" className="btn-image">CHANGE IMAGE</label>
                                    {/* <button className="btn-image">CHANGE IMAGE</button> */}
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
                                    <span className="inputLabel">UNIQUE ARTWORKS PRICE RANGE/ </span>
                                    {isEditMode ?
                                        <>
                                            <input type="text" name="artwork_min" onChange={onChange} value={data.artwork_min} className="inputClear min" placeholder="3"></input>
                                            <input type="text" name="artwork_max" onChange={onChange} value={data.artwork_max} className="inputClear min" placeholder="3"></input>
                                        </> : <span> {data.artwork_min} K - {data.artwork_max} K </span>}
                                </div>
                            </div>
                            <div className='right'>
                                <div className="artist-input">
                                    <span className="inputLabel">UNIQUE ARTWORKS PRICE RANGE/ </span>
                                    {isEditMode ?
                                        <>
                                            <input type="text" name="editions_min" onChange={onChange} value={data.editions_min} className="inputClear min" placeholder="3"></input>
                                            <input type="text" name="editions_max" onChange={onChange} value={data.editions_max} className="inputClear min" placeholder="3"></input>
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
                            <textarea name="mainQuote" onChange={onChange} value={data.mainQuote} id="biography" className="biography-text" rows="5" placeholder="your gallery biography"></textarea> :
                            <span className="biography-text"> {data.mainQuote} </span>}
                    </div>
                    <button className='btnBlack' onClick={submitHandler}> SAVE ARTIST </button>
                </div>
            </div>
        </>
    )
}

export default ArtistProfileHooks
