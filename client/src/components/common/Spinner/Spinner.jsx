import { Puff } from "react-loader-spinner";

const Spinner = ({ visible = true, color = "#fff" }) => {
  return (
    <Puff
      visible={visible}
      height="25"
      width="25"
      color={color}
      ariaLabel="puff-loading"
      wrapperStyle={{ marginRight: ".5rem" }}
      wrapperClass="spinner"
    />
  );
};

export default Spinner;
