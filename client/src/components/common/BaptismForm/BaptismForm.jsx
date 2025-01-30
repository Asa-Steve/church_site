const BaptismForm = ({ candidate, message, handleSubmit, handleChange }) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="row input-grp">
        <div>
          <label htmlFor="Baptism_name">Child's Baptismal Name</label>
          <input
            type="text"
            name="baptismName"
            id="Baptism_name"
            placeholder="Baptismal Name"
            onChange={handleChange}
            value={candidate.baptismName}
            required
          />
        </div>
        <div>
          <label htmlFor="Other_name">Child's Other Name</label>
          <input
            type="text"
            name="otherName"
            id="Other_name"
            placeholder="Other Name"
            onChange={handleChange}
            value={candidate.otherName}
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            id="surname"
            placeholder="Surname"
            onChange={handleChange}
            value={candidate.surname}
            required
          />
        </div>
      </div>

      <div className="row input-grp">
        <div>
          <label htmlFor="dob">Date Of Birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            onChange={handleChange}
            value={candidate.dob}
            required
          />
        </div>
        <div>
          <label htmlFor="place_birth">Place of Birth</label>
          <input
            type="text"
            name="birthPlace"
            id="place_birth"
            placeholder="e.g FMC yenagoa Bayelsa State."
            onChange={handleChange}
            value={candidate.birthPlace}
            required
          />
        </div>
      </div>

      <div className="row input-grp">
        <div>
          <label htmlFor="father">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            id="father"
            placeholder="Enter Father's Name"
            onChange={handleChange}
            value={candidate.fatherName}
            required
          />
        </div>
        <div>
          <label htmlFor="mother">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            id="mother"
            placeholder="Enter Mother's Name"
            onChange={handleChange}
            value={candidate.motherName}
            required
          />
        </div>
      </div>
      <div className="row">
        <div>
          <label htmlFor="home_town">Father's Home Town</label>
          <input
            type="text"
            name="homeTown"
            id="home_town"
            placeholder="Kolokuma/Opokuma Bayelsa state"
            onChange={handleChange}
            value={candidate.homeTown}
            required
          />
        </div>
      </div>
      <div className="row input-grp">
        <div>
          <label htmlFor="LGA">L.G.A</label>
          <input
            type="text"
            name="lga"
            id="LGA"
            placeholder="Enter Local Government Area"
            onChange={handleChange}
            value={candidate.lga}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="mother"
            placeholder="Enter State of Origin"
            onChange={handleChange}
            value={candidate.state}
            required
          />
        </div>
      </div>
      <div className="row input-grp">
        <div>
          <label htmlFor="dob-baptism">Date Of Baptism</label>
          <input
            type="date"
            name="doBaptism"
            id="dob-baptism"
            onChange={handleChange}
            value={candidate.doBaptism}
            required
          />
        </div>
        <div>
          <label htmlFor="placeofBaptism">Place of Baptism</label>
          <input
            type="text"
            name="placeofBaptism"
            id="place_of_baptism"
            readOnly
            value={
              "St. Matthias Catholic Church Amarata, Yenagoa Bayelsa state."
            }
          />
        </div>
      </div>

      <div className="row input-grp" id="uniq">
        <div>
          <label htmlFor="sponsor">Name Of Child's Sponsor(s) </label>
          <input
            type="text"
            name="sponsor"
            id="sponsor"
            placeholder="E.g Sponsor 1 , sponsor 2"
            onChange={handleChange}
            value={candidate.sponsor}
            required
          />
        </div>
        <div>
          <label htmlFor="LB">LB NO.</label>
          <input
            type="number"
            name="lb"
            id="LB"
            min={1}
            onChange={handleChange}
            value={candidate.lb}
            required
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="minister">Minister</label>
        <input
          type="text"
          id="minister"
          name="minister"
          onChange={handleChange}
          value={candidate.minister}
          placeholder="E.g Rev. Fr. Bruno Douglas Ogomu"
          required
        />
      </div>
      <button>Proceed To Save Record</button>
      <div className="feedback">
        {message?.message && (
          <p className={message?.status ? `msg ${message.status}` : `msg hide`}>
            {message?.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default BaptismForm;
