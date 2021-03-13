import React, { useState, useEffect } from "react";
import "./CollectorProfile.css";
import {
  fetchCollector,
  addNewCollector,
  editCollector,
} from "../../api/service";
import CollectorSideBar from "../CollectorSideBar/CollectorSideBar";
import { Link } from "react-router-dom";

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

  const onChange = (event) => {

    const { name, value } = event.target;
    setData({ ...data, [name]: value.toUpperCase() });
  };

  const Checkbox = ({ type = "radio", name, checked = false, onChange }) => {
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

  const submitHandler = async () => {
    const dataCopy = data;
    dataCopy.newsletter = newsletter;
    dataCopy.budget = Number(dataCopy.budget);
    let resData;
    if (isEditMode && isCollectorExist) {
      resData = await editCollector(dataCopy);
    } else {
      resData = await addNewCollector(dataCopy);
    }
    setData(resData);
    setIsEditMode(false);
    setIsCollectorExist(true);
    props.changeCollectorName(resData.name);
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
    <div className="">
      <div id="collectorProfile">
        <div className="collectorHeader">
          <div className="collector-name">
            <h1>{`${data.firstName} ${data.lastName}`}</h1>
            <Link to='/collector/acquisitions'><button className="btnPrivate">MAKE A PRIVATE SALES REQUEST</button></Link>
          </div>
          <hr />
        </div>
        <div id="formContainer">
          <CollectorSideBar content="my-collector-profile" />
          <div id="formContainerField">
            <div className="personalInformation">
              <h1 className="title-text" >PERSONAL INFORMATION</h1>
              <hr />
              <div className="btnContainer">
                <button className="btn-edit" onClick={startEditing}>
                  Edit
                </button>
              </div>
            </div>
            <div className="input-block">
              <div className="input-container-half">
                <span className="input-label input-lable-right">
                  FIRST NAME/{" "}
                </span>
                {isEditMode ? (
                  // eslint-disable-next-line jsx-a11y/no-redundant-roles
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
                <span className="input-label input-lable-left">
                  LAST NAME/{" "}
                </span>
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
            </div>
            <div className="input-block">
              <div className="input-container-half">
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
                <span className="input-label input-lable-left">
                  BIRTHDATE/{" "}
                </span>
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
            </div>
            <div className="input-block">
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
            </div>
            <hr />
            <div className="personalInformation">
              <h1>COLLECTOR DATA</h1>
            </div>
            <hr />
            <div className='collector-type'>
              <span >COLLECTOR TYPE/ </span>
              {isEditMode ? (
                <div className="behaviourCheck">
                  {relCheckboxes.map((item, key) => (
                    <>
                      <input key={key}
                        type="radio"
                        id={key}
                        name={item.name}
                        onChange={handleCheckboxRel}
                        checked={checkedRel === item.name}
                      />
                      <label key={key} htmlFor={key}>{item.name}</label>
                      {/* <label htmlFor={key} key={item.key}>
                          {item.name}
                        </label>
                        <Checkbox
                          id={item.name}
                          name={item.name}
                          checked={checkedRel === item.name}
                          onChange={handleCheckboxRel}
                        /> */}
                    </>
                  ))}
                </div>
              ) : (
                <span style={{ width: "65vw", textAlign: "start", textTransform: 'uppercase' }}> {data.behaviour} </span>
              )}
            </div>
            <div>
              <div className="input-container-half budget">
                {/* should not display even in edit */}
                <span id="bugetLabel">
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
                  <span>{data.budget} k€ per year</span>
                )}
              </div>
            </div>
            <div id="newsBool">
              <span className="input-label">
                NEWSLETTER /
                </span>
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
                "   YES"
              ) : (
                "   NO"
              )}
            </div>
            {isEditMode ? (
              <button
                id="saveButton"
                onClick={submitHandler}
              >
                SAVE CHANGES
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorProfile;
