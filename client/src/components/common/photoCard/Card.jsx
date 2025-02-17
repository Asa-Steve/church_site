import "./Card.scss";

const Card = ({ img: imgSrc, classN = "", alt }) => {
  return (
    <div className={`Card ${classN} `}>
      <img src={imgSrc} loading="lazy" alt={alt || "other-img"} />
    </div>
  );
};

export default Card;
