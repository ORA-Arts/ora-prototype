import React from 'react';
import './ProfileSideBar.css';
import { Link } from 'react-router-dom';

const ProfileSideBar = (props) => {
    const enumPos = ["my-gallery-profile", "my-sales", "my-artists", "my-inventory", "my-collection", "my-gallery-features", "my-ora-activity"]
    let currentContent = props.content;
    return (
        <div className="gallegy-sidebar text-left">
            <div className="sidebar-box">
                <div className={`sidebar-text ${currentContent === enumPos[0] ? "sidebar-text-bold" : null }`}><Link to={'/gallery/profile'}>MY GALLERY PROFILE</Link></div>
                <div className={`sidebar-text ${currentContent === enumPos[1] ? "sidebar-text-bold" : null }`}><Link to={'/gallery/sales'}>MY SALES</Link></div>
                <div className={`sidebar-text ${currentContent === enumPos[2] ? "sidebar-text-bold" : null }`}><Link to={'/gallery/artists'}>MY ARTISTS</Link></div>
                <div className={`sidebar-text ${currentContent === enumPos[3] ? "sidebar-text-bold" : null }`}><Link to={'/gallery/inventory'}>MY INVENTORY</Link></div>
                <div className={`sidebar-text ${currentContent === enumPos[4] ? "sidebar-text-bold" : null }`}>MY COLLECTIONS</div>
                <div className={`sidebar-text ${currentContent === enumPos[5] ? "sidebar-text-bold" : null }`}>MY GALLERY FEATURES</div>
                <div className={`sidebar-text ${currentContent === enumPos[6] ? "sidebar-text-bold" : null }`}>MY ORA ACTIVITY</div>
            </div>
        </div>
    )
}

export default ProfileSideBar;