import "./Faq.scss";

const Faq = ({handleToggle,title,question,isActive}) => {
    return (
        <div className={isActive ? "Faq show" : "Faq"}>
            <div className="acc-btn">
                <div className="qst" onClick={handleToggle}>{title} ?</div>
                <div className="qst-toggler"> <span></span><span></span></div>
            </div>
            <div className="faq-deit">
                {question}
            </div>
        </div>
    );
}

export default Faq;
