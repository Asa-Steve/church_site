import { useState } from "react";
import { PaystackButton } from 'react-paystack';

import "./Baptism.scss";

const Baptism = () => {
    // State Managed Variables
    const [data, setData] = useState(null);
    const [showMessage, setShowMessage] = useState(null);

    const [formData, setFormData] = useState({ // Creating a state Object for form data
        baptismName: "",
        otherName: "",
        surname: "",
        dob: "",
        birthPlace: "",
        fatherName: "",
        motherName: "",
        parentPhone: [],
        homeTown: "",
        lga: "",
        state: "",
        residenceAddr: "",
        wedded: "",
        sponsor: "",
    });

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
    // Handling Form Radio Buttons
    const handleRadioBtn = (e) => {
        e.stopPropagation();
        setIswedded(e.target.value)
    }

    // Making Request
    const makeReq = async () => {
        try {
            const res = await fetch("http://localhost:3000/infant", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData })
            });
            if (!res.ok) {
                throw new Error("Something went wrong!")
            }

            // saving the result gotten from the server
            const result = await res.json();

            //saving it onto the state variable 
            setData(result);

        } catch (error) {
            setData({ msg: "Failed!" });
        }
    }

    return (
        <>
            <section className="top">
                <div className="overlay"></div>
                <div className="text">
                    <h1>Infant Baptism Registration</h1>
                </div>
            </section>
            <section className="form-section">

                <div className="wrap">
                    <div className="form-header">
                        <h2>Baptism Registration Form</h2>
                    </div>


                    <form action="" onSubmit={handleSubmit}>

                        <div className="row input-grp">
                            <div>
                                <label htmlFor="Baptism_name">Child's Baptismal Name</label>
                                <input type="text" name="baptismName" id="Baptism_name" placeholder="Baptismal Name" onChange={handleChange} value={formData.baptismName} />
                            </div>
                            <div>
                                <label htmlFor="Other_name">Child's Other Name</label>
                                <input type="text" name="otherName" id="Other_name" placeholder="Other Name" onChange={handleChange} value={formData.otherName} />
                            </div>
                            <div>
                                <label htmlFor="surname">Surname</label>
                                <input type="text" name="surname" id="surname" placeholder="Surname" onChange={handleChange} value={formData.surname} />
                            </div>

                        </div>

                        <div className="row input-grp">
                            <div>
                                <label htmlFor="dob">Date Of Birth</label>
                                <input type="date" name="dob" id="dob" onChange={handleChange} value={formData.dob} />
                            </div>
                            <div>
                                <label htmlFor="place_birth">Place of Birth</label>
                                <input type="text" name="birthPlace" id="place_birth" placeholder="e.g FMC yenagoa Bayelsa State." onChange={handleChange} value={formData.birthPlace} />
                            </div>
                        </div>

                        <div className="row input-grp">
                            <div>
                                <label htmlFor="father">Father's Name</label>
                                <input type="text" name="fatherName" id="father" placeholder="Enter Father's Name" onChange={handleChange} value={formData.fatherName} />
                            </div>
                            <div>
                                <label htmlFor="mother">Mother's Name</label>
                                <input type="text" name="motherName" id="mother" placeholder="Enter Mother's Name" onChange={handleChange} value={formData.motherName} />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label htmlFor="parent_ph">Parent's Phone NO</label>
                                <input type="number" name="parentPhone" id="parent_ph" placeholder="E.g +234 7035 545 521 , +234 8121 800 5422" onChange={handleChange} value={formData.parentPhone} />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label htmlFor="home_town">Father's Home Town</label>
                                <input type="text" name="homeTown" id="home_town" placeholder="Kolokuma/Opokuma Bayelsa state" onChange={handleChange} value={formData.homeTown} />
                            </div>
                        </div>
                        <div className="row input-grp">
                            <div>
                                <label htmlFor="LGA">L.G.A</label>
                                <input type="text" name="lga" id="LGA" placeholder="Enter Local Government Area" onChange={handleChange} value={formData.lga} />
                            </div>
                            <div>
                                <label htmlFor="state">State</label>
                                <input type="text" name="state" id="mother" placeholder="Enter State of Origin" onChange={handleChange} value={formData.state} />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <label htmlFor="residence_add">Residential Adress</label>
                                <input type="text" name="residenceAddr" id="residence_add" placeholder="E.g Off Azikoro Road, Opposite Lagold street Ekeki, Yenagoa Bayelsa state." onChange={handleChange} value={formData.residenceAddr} />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="">Married In Church</label>
                            <div className="wed_in">
                                <label htmlFor="wedded">
                                    <input type="radio" name="wedded" value="YES" onChange={(e) => setFormData(prevData => ({ ...prevData, wedded: e.target.value }))} />
                                    YES
                                </label>
                                <label htmlFor="wedded">
                                    <input type="radio" name="wedded" value="NO" onChange={(e) => setFormData(prevData => ({ ...prevData, wedded: e.target.value }))} />
                                    NO
                                </label>
                            </div>

                        </div>

                        <div className="row">
                            <div>
                                <label htmlFor="sponsor">Name Of Child's Sponsor </label>
                                <input type="text" name="sponsor" id="sponsor" placeholder="*Sponsor must be a confirmed catholic" onChange={handleChange} value={formData.sponsor} />
                            </div>
                        </div>


                        <PaystackButton {...componentProps} />
                        {/* <button>Proceed To Make Payment</button> */}
                    </form>
                </div>
            </section>
        </>
    );
}

export default Baptism;