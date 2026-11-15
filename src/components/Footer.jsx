import Brand from "./Brand.jsx";
import { site } from "../config/site.js";

export default function Footer() {
  return (
    <footer>
      <Brand />
      <p>A helping hand in India. Wherever you are.</p>
      <small>
        © {new Date().getFullYear()} {site.name}
      </small>
    </footer>
  );
}
