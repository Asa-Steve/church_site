import axiosInstance from "./axiosInstance";

export const initiatePayment = async (formData, setMessage, setisLoading) => {
  try {
    const payload = {
      email: formData.email,
      amount: formData.amount * 100,
      callback_url: "https://mount-zion.onrender.com/payment_status",
      metadata: { ...formData },
    };
    setMessage("");

    setisLoading(true);
    const response = await axiosInstance.post("/makePayment", payload);
    const {
      status,
      data: { authorization_url: authUrl },
    } = response.data;

    if (status) {
      setMessage("Transaction Initialized, Redirecting...");
      window.location.href = authUrl;
    } else {
      setisLoading(false);
      setMessage(
        error?.response?.data?.error ??
          "🛑 Error initializing transaction, try again"
      );
    }
  } catch (error) {
    setisLoading(false);
    setMessage(
      error?.response?.data?.error ??
        "🛑 Failed to initializing transaction, try again"
    );
  }
};
