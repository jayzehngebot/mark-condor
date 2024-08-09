import Contact from "./Contact";
import "./Footer.module.css";

export default function Footer() {
    return (
        <footer className="footer sm:fixed bottom-0 w-full text-left">
            <Contact />
        </footer>
    )
}