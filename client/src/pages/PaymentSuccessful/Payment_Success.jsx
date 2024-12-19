import { useEffect, useState } from "react";
import "./Payment_Success.scss";

import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../components/Utils/axiosInstance";
import Loader from "../../components/common/Loader/Loader";

const Payment_Success = () => {
  const [searchParams] = useSearchParams();

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference"); // Get the transaction reference
      if (!reference) return navigate("/");

      try {
        const response = await axiosInstance.post("/verifyPayment", {
          reference,
        });
        setIsSuccessful(true);
        setIsLoading(false);
      } catch (error) {
        // Handle errors
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  {
    return isLoading ? (
      <Loader />
    ) : (
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
  }
};

export default Payment_Success;
