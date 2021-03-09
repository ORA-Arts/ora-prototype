import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './ContactForm.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactModal from 'react-modal'
export default function ContactFormHooks(props) {
    const initialState = {
        name: '',
        email: '',
        topic: '',
        body: ''
    }

    const [data, setData] = useState(initialState)
    const [sent, setSent] = useState(false)
    const [checkedOption, setCheckedOption] = useState('personal')

    const onChange = (event) => {
        const { value } = event.target;
        setData({ ...data, 'topic': value });
        setCheckedOption(value)
        console.log('select topic ' + data.topic)
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
        console.log('data: ' + data)
    }
    const submitEmail = (event) => {
        event.preventDefault();
        axios.post('/api/contact', data)
            .then(res => {
                console.log(res)
            })
            .catch((err) => {
                console.log('Message not sent', err)
            })
        setSent(true)
        console.log('sent: ', sent)
        resetForm()
    }

    const resetForm = () => {
        setData({ name: '', email: '', topic: '', body: '' })
    }

    return (
        <div className="contactContainer">
            <div className="contactImage">
            </div>
            <div className="formContainer">
                <Tabs className="tabContact">
                    <div className='contactHeader'>
                    <TabList>
                        <Tab>CONTACT US</Tab> <span>/</span> <Tab>TEAM</Tab>
                    </TabList>
                    </div>
                    <TabPanel>
                        <h2>GET IN TOUCH WITH OUR TEAM REGARDING ANY QUESTIONS YOU MIGHT HAVE WITH OUR ACTIVITIES</h2>
                        <form id="contactForm" onSubmit={submitEmail} method='POST'>
                            <div id="emailAndName">
                                <input type="text" name="name" value={data.name} onChange={handleInputChange} placeholder="NAME" required />
                                <input type="email" name="email" value={data.email} onChange={handleInputChange} placeholder="EMAIL" required />
                            </div>
                            <div id="topicContainer">
                                <p>TOPIC</p>
                                <div className='radio-toolbar'>
                                    <div>
                                        <input onChange={onChange} id="radioSupport" type="radio" value="SUPPORT AN ARTIST PROJECT"
                                            checked={(checkedOption === 'SUPPORT AN ARTIST PROJECT')}></input>
                                        <label htmlFor='radioSupport'>SUPPORT AN ARTIST PROJECT</label>
                                    </div>

                                    <div>
                                        <input onChange={onChange} id="radioPersonal" type="radio" value="PERSONAL ADVISOR"
                                            checked={(checkedOption === 'PERSONAL ADVISOR')}></input>
                                        <label htmlFor='radioPersonal'>PERSONAL ADVISOR</label>
                                    </div>

                                    <div>
                                        <input onChange={onChange} type="radio" id="radioSpecial" value="SPECIAL SOURCING"
                                            checked={(checkedOption === 'SPECIAL SOURCING')}></input>
                                        <label htmlFor='radioSpecial'>SPECIAL SOURCING</label>
                                    </div>

                                    <div>
                                        <input onChange={onChange} type="radio" id="radioArtist" value="ARTIST OPEN CALL"
                                            checked={(checkedOption === 'ARTIST OPEN CALL')}></input>
                                        <label htmlFor='radioArtist'>ARTIST OPEN CALL</label>
                                    </div>
                                </div>
                            </div>
                            <div id="inquireAndButton">
                                <textarea type="text" name="body" value={data.body} id="body" placeholder="INQUIRE ABOUT*" required rows="25" cols="30" onChange={handleInputChange}> </textarea>
                                <div className="contactFooter">
                                    <div className='sentMessage'>
                                        {sent ? <span>YOUR MESSAGE HAS BEEN SENT</span> : <span> </span>}
                                    </div>
                                    <Link to='mailto:info@ora-arts.com'><h3 className='contact-email'>INFO@ORA-ARTS.COM</h3></Link>
                                    <button type="submit" className="btnWhite">SEND MESSAGE</button>
                                </div>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <div className="teamTab">
                            <div className='teamMember'>
                                <h3>THIBAULT HENRIET</h3>
                                       <span>PRESIDENT AND FOUNDER</span> 
                                    </div>
                            <div className='teamMember'>
                                <h3>LAURELINE CALASTRENG</h3>
                                    <span>EXECUTIVE DIRECTOR</span>     
                                    </div>
                            <div className='teamMember'>
                                <h3>RACHEL LEQUESNE</h3>
                                       <span>HEAD OF DIFFUSION</span> 
                                    </div>
                            <div className='teamMember'>
                                <h3>ARTHUR MORISSET</h3>
                                       <span>ARTISTIC DIRECTOR / HEAD OF PRODUCTION</span> 
                                    </div>
                            <div className='teamMember'>
                                <h3>CORENTINE PIETTE</h3>
                                       <span>CTO</span> 
                                    </div>
                            <div className='teamMemberF'>
                                <Link to='mailto:info@ora-arts.com'><h3 className='contact-email'>INFO@ORA-ARTS.COM</h3></Link>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}