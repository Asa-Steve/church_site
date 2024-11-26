import React, { useState } from 'react';
import "./About.scss";
import Faq from '../Faq/Faq';
import TeamCards from '../teamCard/TeamCards';


const faqs = [
    {
        title: 'How can I Become a member',
        que: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus doloremque aliquid, ipsam aliquam odit ex eos doloribus. Quidem quo debitis magni ullam perspiciatis quasi hic soluta, quam impedit eum'
    },
    {
        title: 'Why St. Matthias',
        que: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus doloremque aliquid, ipsam aliquam odit ex eos doloribus. Quidem quo debitis magni ullam perspiciatis quasi hic soluta, quam impedit eum'
    },
    {
        title: 'What Time are Sunday Masses',
        que: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus doloremque aliquid, ipsam aliquam odit ex eos doloribus. Quidem quo debitis magni ullam perspiciatis quasi hic soluta, quam impedit eum'
    },
    {
        title: 'How can I Register for infant Baptism',
        que: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus doloremque aliquid, ipsam aliquam odit ex eos doloribus. Quidem quo debitis magni ullam perspiciatis quasi hic soluta, quam impedit eum'
    }]


const team = [
    {
        name: 'Rev. Fr. Bruno Douglas',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quisquam quo Numquam.',
        title: 'Parish Priest',
        imgUrl: "./imgs/pastor3.jpg"
    },
    {
        name: 'Rev. Fr. Francis Ikwakam',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        title: 'Asst. Parish Priest',
        imgUrl: "./imgs/pastor2.jpg"
    },
    {
        name: 'Rev. Sr Roseline',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quisquam quo Numquam.',
        title: 'Visiting Priest',
        imgUrl: "./imgs/pastor1.jpg"
    },
    {
        name: 'Rev. Fr. Joseph ',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quisquam quo Numquam.',
        title: 'Visiting Priest',
        imgUrl: "./imgs/p2.jpg"
    }]


const missionStatement = [
    {
        id: 1,
        title: "Our Mission",
        body: "Our mission is what we do. The active verb here is invite. God progresses through gracious invitations."
    },
    {
        id: 2,
        title: "Our Vision",
        body: "We see our mission as extending God’s Kingdom and we seek to help every member find their place."
    },
    {
        id: 3,
        title: "Our Values",
        body: "Community is where we most deeply experience God’s love and grace throughout all stages of life."
    },
    {
        id: 4,
        title: "Our Faith",
        body: "All Peoples are of tremendous value to God; reaching them with the Gospel is our distinct responsibility."
    },
]

const About = () => {
    
    // State Managed Variables
    const [activeFaq, setActiveFaq] = useState(0)
    const [data, setData] = useState(null);
    const [showMessage, setShowMessage] = useState(null);

    // Handling Input Change when typing
    const handleChange = (e) => {
        // Handle input changes dynamically
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Update only the field that changed
        }));
    }

    // Handling Form Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/mail", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData })
            });
            if (!res.ok) {
                throw new Error("Failed to send message!")
            }

            // saving the result gotten from the server
            const result = await res.json();
            
            //saving it onto the state variable 
            setData(result);

            // Resetting my form fields
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            })

            // Showing message (success or failure to user)
            setShowMessage(true);

            setTimeout(() => {
                // Removing message after 2sec
                setShowMessage(false);
            }, 2000);


        } catch (error) {
            setData({ msg: "Failed to send message!" });
        }
    }

    // Creating a state Object for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // Toggler Logic for FAQ
    const toggleFaq = (idx) => {
        setActiveFaq(activeFaq === idx ? activeFaq : idx)
    }

    return <>
        <section className="top">
            <div className="overlay"></div>
            <div className="text">
                <h1>About</h1>
            </div>
        </section>
        <section className='about_sect'>

            <div className="header_title">
                <h2>We love God. We believe in God.</h2>
                <div className="subtitle">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut seedor labore. Excepteur sint occaecat.</p>
                </div>
            </div>
            <div className="mission_stat">
                <div className="left">

                    {missionStatement.map(item =>
                        <div className="stat" key={item.id}>
                            <span className='num'>{item.id}</span>
                            <div className="stat-info">
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>
                        </div>
                    )}

                </div>
                <div className="right">
                    <img src="./imgs/about-us-bg.webp" alt="" />
                </div>
            </div>

            <div className='about_faq'>
                <div className="header_title">
                    <h2>Questions About the Church</h2>
                    <div className="subtitle">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut seedor labore. Excepteur sint occaecat.</p>
                    </div>
                </div>
                <div className="contact_info_sect">
                    <div className="left">
                        <div className="form-section">
                            <div className="wrap">
                                <form action="" method='post' onSubmit={handleSubmit}>
                                    <div className="row">
                                        <label htmlFor="name">Full Name</label>
                                        <input type="text" name='name' id="name" onChange={handleChange} placeholder="Full Name" value={formData.name} required />
                                    </div>
                                    <div className="row input-grp">
                                        <div>
                                            <label htmlFor="email">Your Email</label>
                                            <input type="email" name='email' id="email" onChange={handleChange} placeholder="Your email" value={formData.email} required />
                                        </div>
                                        <div>
                                            <label htmlFor="subject">Msg Subject</label>
                                            <input type="text" name='subject' id="subject" onChange={handleChange} placeholder="Subject" value={formData.subject} required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="message">Message</label>
                                        <textarea name="message" id="message" onChange={handleChange} placeholder="Write Message Here....." value={formData.message} required>{formData.message} </textarea>
                                    </div>


                                    <div className="row input-grp" >
                                        <div>
                                            <button >Submit Message</button>
                                        </div>
                                        {showMessage && <div style={data && { border: "1px solid black", textAlign: "center" }}  > {<p>{data.msg}</p>}</div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="faqs">
                            {faqs.map((question, idx) => {
                                return <Faq key={idx} handleToggle={() => toggleFaq(idx)} title={question.title} question={question.que}
                                    isActive={activeFaq === idx}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="about_our_team">
                <div className="header_title">
                    <h2>Meet Our Priests & Religious</h2>
                    <div className="subtitle">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut seedor labore. Excepteur sint occaecat.</p>
                    </div>
                </div>

                <div className="cards">
                    {team.map((teamMember, idx) =>
                        <TeamCards key={idx} to={`/priest/${idx + 1}`} img={teamMember.imgUrl} name={teamMember.name} desc={teamMember.desc} title={teamMember.title} />
                    )}
                </div>
            </div>
        </section>
    </>;
}

export default About;
