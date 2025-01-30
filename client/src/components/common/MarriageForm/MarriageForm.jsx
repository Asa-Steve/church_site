const MarriageForm = ({ candidate, message, handleSubmit, handleChange }) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="row input-grp">
        <div>
          <label htmlFor="sponsus">Husband's FullName</label>
          <input
            type="text"
            id="sponsus"
            name="husbandName"
            onChange={handleChange}
            value={candidate?.husbandName || ""}
            placeholder="E.g Paul Ebiyeme"
            required
          />
        </div>
        <div>
          <label htmlFor="sponsa">Wife's FullName</label>
          <input
            type="text"
            id="sponsa"
            name="wifeName"
            onChange={handleChange}
            value={candidate?.wifeName || ""}
            placeholder="E.g Blessing Godwin"
            required
          />
        </div>
      </div>
      <div className="row input-grp" id="uniq">
        <div>
          <label htmlFor="doMarriage">Date of Marraige</label>
          <input
            type="date"
            id="doMarriage"
            name="doMarriage"
            value={candidate?.doMarriage || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lm">LM NO.</label>
          <input
            type="number"
            min={1}
            id="lm"
            name="lm"
            value={candidate?.lm || ""}
            onChange={handleChange}
            placeholder="E.g 1245"
            required
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="place">Place of Marriage</label>
        <input
          type="text"
          id="place"
          value={"St. Matthias Catholic Church Amarata, Yenagoa Bayelsa state."}
          readOnly
        />
      </div>

      <div className="row input-grp">
        <div>
          <label htmlFor="witness-1">Witness 1</label>
          <input
            type="text"
            id="witness-1"
            name="witness1"
            onChange={handleChange}
            value={candidate?.witness1 || ""}
            placeholder="Enter name of Witness1 "
            required
          />
        </div>
        <div>
          <label htmlFor="Witness-2">Witness 2</label>
          <input
            type="text"
            id="witness-2"
            name="witness2"
            onChange={handleChange}
            value={candidate?.witness2 || ""}
            placeholder="Enter name of Witness2 "
            required
          />
        </div>
      </div>

      <div className="row">
        <label htmlFor="officiatingPriest">officiating Priest</label>
        <input
          type="text"
          id="officiatingPriest"
          name="officiatingPriest"
          onChange={handleChange}
          value={candidate?.officiatingPriest || ""}
          placeholder="E.g Rev. Fr. Bruno Douglas Ogomu"
          required
        />
      </div>

      <button>Proceed to Save Record</button>
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

export default MarriageForm;
