import { useState, useEffect } from "react";
import styles from "./Basicbutton.module.css";

interface BasicButtonProps {
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
    buttonLabel: string; // Added prop for button label
}

export default function Basicbutton({ showAlert, setShowAlert, buttonLabel }: BasicButtonProps) {

    const handleClick = () => {
        setShowAlert(false);
    }

    return (
        <button aria-label={buttonLabel} className={`${styles.button} bg-slate-900`} onClick={handleClick}></button>
    )
}