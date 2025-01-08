import "./Popup.scss";

const PopUp = ({
  showPopup,
  handleCancel,
  handleProceed,
  isLoading,
  message,
  price = null,
  text = null,
}) => {
  return (
    <div className={showPopup ? "popup-wrapper" : "popup-wrapper hide"}>
      <div className={showPopup ? "popup-overlay" : "popup-overlay hide"}></div>
      <div className={showPopup ? "popup" : "popup hide"}>
        {!price && text ? (
          <h2>{text}</h2>
        ) : (
          !price && <h2>Sure You Want to Proceed ?</h2>
        )}
        {price && (
          <>
            <h2>PAYMENT REQUIRED</h2>{" "}
            <p>Proceed to make a payment of N{price} only.</p>
          </>
        )}
        <div>
          <button onClick={handleCancel}>cancel</button>
          <button onClick={handleProceed} disabled={isLoading}>
            proceed
          </button>
        </div>
        {
          <p className="popup-load">
            {isLoading && !message ? "Loading please wait.." : message}
          </p>
        }
      </div>
    </div>
  );
};

export default PopUp;
