import Spinner from "../Spinner/Spinner";

const ContactForm = ({
  handleSubmit,
  handleChange,
  formData,
  loading,
  showMessage,
  data,
}) => {
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Full Name"
          value={formData?.name || ""}
          required
        />
      </div>
      <div className="row input-grp">
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="Your email"
            value={formData?.email || ""}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Msg Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            onChange={handleChange}
            placeholder="Subject"
            value={formData?.subject || ""}
            required
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          onChange={handleChange}
          placeholder="Write Message Here....."
          value={formData?.message || ""}
          required
        ></textarea>
      </div>

      <div className="row input-grp">
        <div>
          <button disabled={loading}>
            {" "}
            <Spinner visible={loading} />
            {loading ? "Submitting" : "Submit Message"}
          </button>
        </div>
        {showMessage && (
          <div className={data?.status ? `msg ${data.status}` : "msg"}>
            {" "}
            {data?.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
