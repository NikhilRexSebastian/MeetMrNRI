import Brand from "./Brand.jsx";
import { site } from "../config/site.js";

export default function Footer() {
  return (
    <footer>
      <div className="footer-business">
  <Brand />

  <address className="footer-address">
    Pazhyaveettil Buildings
    <br />
    Pattithanam P.O
    <br />
    Ettumanoor
    <br />
    Kottayam
    <br />
    PIN: 686631
  </address>
</div>
      <p>A helping hand in Kerala. Wherever you are.</p>
      <small>
        © {new Date().getFullYear()} {site.name}
      </small>
    </footer>
  );
}
