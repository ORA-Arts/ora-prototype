import React, { useState, useEffect } from "react";
import "./CollectorProfile.css";
import { fetchCollector, addNewCollector, editCollector } from "../../api/service";

const CollectorProfile = (props) => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    address: "",
    behaviour: "",
    budget: "",
    newsletter: "",
  };
  const [data, setData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCollectorExist, setIsCollectorExist] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const behaviours = [
    "I am a New Collector",
    "Rarely (once per year)",
    "Regularly (more than once per year",
    "Often (every couple of months)",
  ];
  const [checkedRel, setCheckedRel] = useState("");

  const Checkbox = ({ type = "radio", name, checked = false, onChange }) => {
    // console.log("Checkbox: ", name, checked);
    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };

  const handleCheckboxRel = (event) => {
    //behaviour
    setCheckedRel(event.target.name);
    setData({ ...data, behaviour: event.target.name });
  };

  const relCheckboxes = behaviours.map((rel) => {
    return {
      name: rel,
      key: rel,
      label: rel.toUpperCase,
    };
  });

  const startEditing = () => {
    setIsEditMode(!isEditMode);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value.toUpperCase() });
  };

const submitHandler = async () => {
  const uploadData = new FormData();
  const dataCopy =data;
  dataCopy.newsletter = newsletter;
  dataCopy.budget = Number(dataCopy.budget)
  let resData;
  if (isEditMode && isCollectorExist) {
    resData = await editCollector(uploadData);
  } else {
    resData = await addNewCollector(uploadData)
  }
  setData(resData);
  setIsEditMode(false);
  setIsCollectorExist(true);
  props.changeCollectorName(resData.name)
};

useEffect(() => {
  async function fetchData() {
    await props.setUser(props.user);
    const resData = await fetchCollector();
    if (!resData) {
      setIsCollectorExist(false);
    } else {
      setIsCollectorExist(true);
      setIsEditMode(false);
      setData(resData);
    }
  }
  fetchData();
}, []);



  return (
    <div className="indexWrap">
      <div id="collectorProfile">
        <div className="collectorHeader">
          <div className="collector-name">
            <h1>{data.firstName}</h1>
            <button className="btnPrivate">
              MAKE A PRIVATE SALES REQUEST
            </button>
          </div>
        </div>
        <hr />
        <div id="formContainer">
          <div className="personalInformation">
            <h1>PERSONAL INFORMATION</h1>
            <div className="btnContainer">
              <button className="btn-edit" onClick={startEditing}>
                Edit
              </button>
            </div>
          </div>
          <hr />
          <div className="input-block">
            <div className="input-container-half">
              <span className="input-label input-lable-right">
                FIRST NAME/{" "}
              </span>
              {isEditMode ? (
                <input
                  type="text"
                  name="firstName"
                  onChange={onChange}
                  value={data.firstName}
                  className="input-no-border"
                  placeholder="Your First Name"
                  role="textbox"
                ></input>
              ) : (
                <span>{data.firstName}</span>
              )}
            </div>
            <div className="input-container-half">
              <span className="input-label input-lable-right">LAST NAME/ </span>
              {isEditMode ? (
                <input
                  type="text"
                  name="lastName"
                  onChange={onChange}
                  value={data.lastName}
                  className="input-no-border"
                  placeholder="Your Last Name"
                ></input>
              ) : (
                <span>{data.lastName}</span>
              )}
            </div>
            <div className="input-container-half">
              {/* should not display even in edit */}
              <span className="input-label input-lable-right">EMAIL/ </span>
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={data.email}
                  className="input-no-border"
                  placeholder="youremail@mail.com"
                ></input>
              ) : (
                <span>{data.email}</span>
              )}
            </div>
            <div className="input-container-half">
              {/* should not display even in edit */}
              <span className="input-label input-lable-left">BIRTHDATE/ </span>
              {isEditMode ? (
                <input
                  type="string"
                  name="birthdate"
                  onChange={onChange}
                  value={data.birthdate}
                  className="input-no-border"
                  placeholder="YOUR BIRTHDATE"
                ></input>
              ) : (
                <span>{data.email}</span>
              )}
            </div>
            <div className="input-container-full">
              <span className="input-label">ADDRESS/ </span>
              {isEditMode ? (
                <input
                  type="text"
                  name="address"
                  onChange={onChange}
                  value={data.address}
                  className="input-no-border"
                  placeholder="YOUR ADDRESS"
                ></input>
              ) : (
                <span>{data.address}</span>
              )}
            </div>
            <div className="personalInformation">
              <h1>COLLECTOR DATA</h1>
            </div>
            <div className="input-block">
              <div className="collectorType">
                <span className="inputLabel">COLLECTOR TYPE/ </span>
                {isEditMode ? (
                  relCheckboxes.map((item) => (
                    <div className="inputClear behaviourCheck">
                      <label key={item.key}>
                        <Checkbox
                          name={item.name}
                          checked={checkedRel === item.name}
                          onChange={handleCheckboxRel}
                        />
                        <span>{item.name}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <span> {data.behaviour} </span>
                )}
              </div>
              <div className="input-container-half budget">
                {/* should not display even in edit */}
                <span className="input-label input-lable-left">
                  I SPEND APPROXIMATELY (k€/Y) ON ART
                </span>
                {isEditMode ? (
                  <input
                    type="number"
                    name="budget"
                    onChange={onChange}
                    value={data.budget}
                    className="input-no-border"
                    placeholder="5"
                  ></input>
                ) : (
                  <span>{data.email}</span>
                )}
              </div>

            </div>
            <div id="selectTopic">
                <span className="input-label">NEWSLETTER</span>
                {isEditMode ? (
                  <>
                    <input
                      type="radio"
                      id="yes"
                      name="newsletter"
                      onChange={(e) => setNewsletter(true)}
                      checked={newsletter}
                    />
                    <label htmlFor="yes">YES</label>
                    <input
                      type="radio"
                      id="no"
                      name="newsletter"
                      onChange={(e) => setNewsletter(false)}
                      checked={!newsletter}
                    />
                    <label htmlFor="no">NO</label>
                  </>
                ) : newsletter ? (
                  "YES"
                ) : (
                  "NO"
                )}
            </div>
            {isEditMode ? 
            <button className="btnSave save-change space-top" onClick={submitHandler}>SAVE CHANGES</button>
            : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorProfile;
