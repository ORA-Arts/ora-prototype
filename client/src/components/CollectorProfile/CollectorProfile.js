import React, {useState, useEffect} from "react";
import './CollectorProfile.css';
import {fetchCollector, addNewCollector, editCollector} from '../../api/service'



const CollectorProfile =(props) => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    address: '',
    behaviour : '',
    budget: '',
    newsletter: ''
  };

  const [data, setData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCollectorExist, setIsCollectorExist] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const startEditing = () => {
    setIsEditMode(!isEditMode);
  };

  
  return (
    <div className="app-container">
    <div className="collectorProfile">
      <div> 
      {data.name}
      </div>
      <hr/>
      <div className="edit-button">
        <button className="btn-edit" onClick={startEditing}>Edit</button>
      </div>
    </div>
          
    </div>
  )
}

export default CollectorProfile