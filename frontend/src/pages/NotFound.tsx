import { Link } from "react-router-dom";
import "../styles/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>La page que vous cherchez n'existe pas.</p>
      <Link to="/" className="btn-back">Retour à l'accueil</Link>
    </div>
  );
}
