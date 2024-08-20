import Contact from "./Contact";
import "./Footer.module.css";
// import VisitorCount from "./VisitorCount";

export default function Footer() {
    return (
        <div className="flex flex-col">
            <footer className="w-full">
                <div className="flex flex-col items-left justify-left h-auto p-3 sm:p-10">
                    <Contact />
                    {/* <VisitorCount /> */}
                </div>
            </footer>

        </div>
    )
}