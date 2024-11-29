import "./Card.scss";

const Card = ({ img: imgSrc, classN='' }) => {
    return (
        <div className={`Card ${classN} `}>
            <img src={imgSrc} />
        </div>
    );
}

export default Card;
