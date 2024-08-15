import Contact from "./Contact";
import "./Footer.module.css";

export default function Footer() {
    return (
        <div className="flex flex-col">
            <footer className="w-full">
                <Contact />
            </footer>
        </div>
    )
}