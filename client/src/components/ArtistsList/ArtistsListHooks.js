import React, { useState, useEffect } from "react";
import './ArtistsList.css'
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import axios from 'axios';
import { Link } from "react-router-dom";


const ArtistListHooks = (props) => {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        axios
            .get('/api/gallery/artists')
            .then(res => {
                setArtists(res.data)
            })
            .catch(err => {
                console.log('Error from show artists list', err);
            })
    }, []);

    return (
        <div >
            <div className="gallery-name-artists">
                {props.galleryName}
            </div>
            <hr id="hr"/> 
            <div className='myArtists'>
                <ProfileSideBar content="my-artists" />
                <div className='artistsContainer'>
                    <div className='myArtistsHeader'>
                        <hr /> <span className='subtitle'>REPRESENTED ARTISTS OR WORKS AVAILABLE BY</span>
                    </div>
                    <div className='artistsList'>
                        {artists.map(artist => {
                            return (
                                <Link className='artistBtn' key={artist._id} to={{pathname:`/gallery/artists/${artist._id}`}}>
                                    <span className='btnWhite'>
                                        {artist.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                    <div className='myArtistsHeader'>
                        <hr /> <span className='subtitle'>ADD AN ARTIST</span>
                    </div>
                    <div className='addArtist'>
                        <h4>GALLERY BIOGRAPHY</h4>
                        <article>
                            <p> We are happy to assist you in adding a new artist to your program, {props.galleryName} ! </p>
                            <p>Please, note that all required fields will need to be completed on your end. Once validated by ORA, we will publish the artist page officially onto ORA’s artist glossary and to your gallery page, in ORA’s gallery network. You’ll be able to manage your artist’s data, private sales and advisory requests as well as inventory directly from your interface.</p>
                            <p> You can complete your artist’s profile all at once or start now and save your changes for later validation ! </p>
                            <p>If you have any questions, please contact our support team. </p>
                        </article>
                        <div className="btn-add-artist">
                            <Link to={{ pathname: '/gallery/artists/new'}}>
                                <span className='btnBlack space-top'> ADD AN ARTIST + </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArtistListHooks