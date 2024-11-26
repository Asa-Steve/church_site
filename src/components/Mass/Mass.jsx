import "./Mass.scss";

const Mass = () => {
    return (
        <>
            <section className="top">
                <div className="overlay"></div>
                <div className="text">
                    <h1>Mass Request</h1>
                </div>
            </section>
            <section className="form-section">
                <div className="wrap">
                    <div className="form-header">
                        <h2>Please Offer Mass For</h2>
                    </div>

                    <form action="">
                        <div className="row">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="Full Name" />
                        </div>
                        <div className="row input-grp">
                            <div>
                                <label htmlFor="req">Requested For</label>
                                <input type="text" id="req" placeholder="Requested For" />
                            </div>
                            <div>
                                <label htmlFor="stipend">Mass Stipend</label>
                                <input type="number" id="stipend" placeholder="$ Mass Stipend" />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="novena"> Novena</label>
                            <select id="novena">
                                {[...Array(10).keys()].map(val => <option selected={val === 0 && "true"} value={val + 1}>{val + 1} day{val + 1 !== 1 && 's'} </option>)}

                            </select>
                        </div>
                        <div className="row">
                            <label htmlFor="intentions">Intentions</label>
                            <textarea name="" id="intentions" placeholder="Write Intention Here....."></textarea>
                        </div>


                        <button>Submit Mass Request</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Mass;
