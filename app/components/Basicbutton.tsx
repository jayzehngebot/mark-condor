import { useState, useEffect } from "react";

interface BasicButtonProps {
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
}

export default function Basicbutton({ showAlert, setShowAlert }: BasicButtonProps) {

    const handleClick = () => {
        setShowAlert(false);
    }

    return (
        <button className="bg-slate-800 text-white p-3" onClick={handleClick}>X</button>
    )
}