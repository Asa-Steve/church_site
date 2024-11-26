import { useEffect } from "react";
import "./Donate.scss";

import PaystackPop from '@paystack/inline-js';



// import PaystackPop from '@paystack/inline-js'
// const popup = new PaystackPop()
// popup.resumeTransaction(access_code)



const Donate = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        initializeTransaction();
    }

    // Legacy Code
    const initializeTransaction = async () => {
        const payload = {
            email: "asadusteve456@gmail.com",
            amount: 10000 * 100,
            callback_url: 'http://localhost:5173/payment_successful',
            metadata:{
                fullName:"Asadu stephen",
                phoneNumber:"07032846083",
                paymentFor:"baptism"
            }

        };

        try {
            const response = await fetch('http://localhost:3000/initialize-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                const authUrl = data.data.authorization_url
                console.log('Transaction Initialized:', authUrl);
                window.open(authUrl, '_blank');

            } else {
                console.error('Error initializing transaction:', data);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };





    return <>
        <section className="top">
            <div className="overlay"></div>
            <div className="text">
                <h1>Donate</h1>
            </div>
        </section>
        <section className="donate form-section">
            <div className="wrap">
                <div className="form-header">
                    <h2>Donation Form</h2>
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Full Name" />
                    </div>
                    <div className="row input-grp">
                        <div>
                            <label htmlFor="ph">Phone Number</label>
                            <input type="text" id="ph" placeholder="Phone Number" />
                        </div>
                        <div>
                            <label htmlFor="mail">E-mail</label>
                            <input type="email" id="mail" placeholder="Email" />

                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="Donation_sum">How Much Do you Wish To Donate ?</label>
                        <span id="cur_icon">₦</span>
                        <input type="number" id="Donation_sum" placeholder="Donation Amount" />
                    </div>
                    <div className="row">
                        <label htmlFor="">Credit Card Details</label>
                        <div className="card_deits">
                            <input type="number" name="" id="" placeholder="Card Number" />
                            <input type="number" name="" id="" placeholder="MM/YY" />
                            <input type="number" name="" id="" placeholder="CVV" />
                        </div>
                    </div>



                    <button>Donate Now !</button>
                </form>
            </div>
        </section>
    </>;
}

export default Donate;
