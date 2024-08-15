import { useState, useEffect } from "react";
import styles from "./Basicbutton.module.css";

interface BasicButtonProps {
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
}

export default function Basicbutton({ showAlert, setShowAlert }: BasicButtonProps) {

    const handleClick = () => {
        setShowAlert(false);
    }

    return (
        <button className={`${styles.button} bg-slate-900`} onClick={handleClick}></button>
    )
}