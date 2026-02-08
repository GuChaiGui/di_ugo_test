import "./Loader.scss";
import logo from "../../assets/logo_di_no_bg.png";

export default function Loader() {
  return (
    <div className="loader-container">
      <img src={logo} alt="Loading…" className="loader-logo" />
    </div>
  );
}
