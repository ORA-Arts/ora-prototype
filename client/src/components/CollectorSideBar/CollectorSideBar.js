import React from 'react';
import './CollectorSideBar.css';
import { Link } from 'react-router-dom';

const CollectorSideBar = (props) => {
    const enumPos = ["my-collector-profile", "create-request", "my-acquisitions", "my-galleries", "my-collection", "my-content", "customer-support"];
    let currentContent = props.content;
    return (
        <div className="collector-sidebar text-left">
            <div className="sidebar-box">
                <div className={`collector-sidebar-text ${currentContent === enumPos[0] ? "sidebar-text-bold" : null }`}><Link to={'/gallery/profile'}>MY COLLECTOR PROFILE</Link></div>
                <div className={`collector-sidebar-text ${currentContent === enumPos[1] ? "sidebar-text-bold" : null }`}>CREATE REQUEST</div>
                <div className={`collector-sidebar-text ${currentContent === enumPos[2] ? "sidebar-text-bold" : null }`}>MY ACQUISITIONS</div>
                <div className={`collector-sidebar-text ${currentContent === enumPos[3] ? "sidebar-text-bold" : null }`}><Link to={'/gallery/inventory'}>MY GALLERIES</Link></div>
                <div className={`collector-sidebar-text ${currentContent === enumPos[4] ? "sidebar-text-bold" : null }`}>MY COLLECTION</div>
                <div className={`collector-sidebar-text ${currentContent === enumPos[5] ? "sidebar-text-bold" : null }`}>MY CONTENT</div>
                <div className={`collector-sidebar-text ${currentContent === enumPos[6] ? "sidebar-text-bold" : null }`}>CUSTOMER SUPPORT</div>
            </div>
        </div>
    )
}

export default CollectorSideBar;