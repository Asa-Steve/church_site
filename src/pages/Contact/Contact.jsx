import React, { useState } from 'react';
import "./Contact.scss";
import { json } from 'react-router-dom';

const Contact = () => {


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/contact", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData })
            });

            if (!res.ok) throw new Error("Failed to send message");
            // saving the result gotten from the server
            const result = res.json();

            console.log("result : ", result);
        } catch (error) {
            // setData({ msg: "Failed to send message!" });
            console.error("Oops!")
        }
    }

    return <>
        <section className="top">
            <div className="overlay"></div>
            <div className="text">
                <h1>Contact Us</h1>
            </div>
        </section>

        <section className='contact_section'>

            <div className="header_title">
                <h2>Call Us or Fill the Form</h2>
                <div className="subtitle">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut seedor labore. Excepteur sint occaecat.</p>
                </div>
            </div>



            <div className="contact_info_sect">
                <div className="left">
                    <div className="form-section">
                        <div className="wrap">
                            <form action="" onSubmit={handleSubmit}>
                                <div className="row">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" name='name' id="name" onChange={handleChange} placeholder="Full Name" value={formData.name} />
                                </div>
                                <div className="row input-grp">
                                    <div>
                                        <label htmlFor="email">Your Email</label>
                                        <input type="email" name='email' id="email" onChange={handleChange} placeholder="Your email" value={formData.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="subject">Msg Subject</label>
                                        <input type="text" name='subject' id="subject" onChange={handleChange} placeholder="Subject" value={formData.subject} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" onChange={handleChange} placeholder="Write Message Here....." value={formData.message}></textarea>
                                </div>


                                <button>Submit Message</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="channels">
                        <div className="chan1">
                            <h3 className="title">
                                Address:
                            </h3>
                            <p>8032 La Sierra Lane
                                Tampa, FL 33604</p>
                        </div>
                        <div className="chan2">
                            <h3 className="title">
                                Email:
                            </h3>
                            <a href="">
                                <p>contact@example.com</p>
                            </a>
                            <a href="">
                                <p>support@example.com</p>
                            </a>
                        </div>
                        <div className="chan1">
                            <h3 className="title">
                                Phone:
                            </h3>
                            <a href=""><p>mobile: +07 554 332 322</p>
                            </a>
                            <a href=""><p>fax: +06 444 646 442</p></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map">
                <div className="wrap">
                    <img src="/imgs/map.png" alt="" />
                </div>
            </div>

        </section>
    </>;
}

export default Contact;
