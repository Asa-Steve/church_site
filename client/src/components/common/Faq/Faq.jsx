import "./Faq.scss";

const Faq = ({ handleToggle, title, question, isActive, sch }) => {
  return (
    <div className={isActive ? "Faq show" : "Faq"}>
      <div className="acc-btn">
        <div className="qst" onClick={handleToggle}>
          {title} ?
        </div>
        <div className="qst-toggler">
          {" "}
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="faq-deit">
        {question}
        {sch && (
          <ul style={{ marginTop: ".5rem" }}>
            {sch.map((el, idx) => (
              <li key={idx}>{el}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Faq;
