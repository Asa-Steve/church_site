import { useEffect, useState } from "react";
import "./Payment_Success.scss";

import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Payment_Success = () => {
  const [searchParams] = useSearchParams();

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference"); // Get the transaction reference
      if (!reference) return;

      try {
        const response = await axios.post(
          "https://church-site-server.onrender.com/api/v1/verifyPayment",
          { reference }
        );
        setIsSuccessful(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying payment:", error);
        // Handle errors
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <>
      <section className="top">
        <div className="overlay"></div>
        <div className="text">
          {isLoading && !isSuccessful && <h1>Verifying Payment ...</h1>}

          {!isLoading && !isSuccessful && <h1>SOMETHING WENT WRONG !</h1>}

          {!isLoading && isSuccessful && <h1>THANK YOU!</h1>}
        </div>
      </section>
      <section className="donate form-section">
        {!isLoading && (
          <div className="wrap success">
            <div>
              {!isLoading && !isSuccessful && (
                <>
                  <h1>Payment UnSuccessful!</h1>
                  <p>We were unable to verified your payment...</p>
                </>
              )}

              {!isLoading && isSuccessful && (
                <>
                  <h1>Payment Successful!</h1>
                  <p>We have verified your payment...</p>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Payment_Success;
