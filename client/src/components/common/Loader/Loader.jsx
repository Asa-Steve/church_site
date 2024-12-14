import { TailSpin } from "react-loader-spinner";
import "./Loader.scss";
const LoaderComp = () => {
  return (
    <div className="loader">
      <TailSpin
        height="40"
        width="40"
        color="#ff0066"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default LoaderComp;
