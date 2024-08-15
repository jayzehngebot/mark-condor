// alerts

import Basicbutton from "./Basicbutton";
import React, { useState } from "react";

interface AlertProps {
    alertText: string;
    showAlert: boolean;
}

export default function Alert({alertText, showAlert}: AlertProps) {
    const [isAlertVisible, setIsAlertVisible] = useState(showAlert);

    if (!isAlertVisible) return null;

    const handleCloseAlert = () => {
        setIsAlertVisible(false);
    };

    return (
        <div className="w-full inline-flex bg-slate-800 text-white">
            <div 
                className="flex items-center justify-center w-full mt-0 text-white dark:text-grey"
                dangerouslySetInnerHTML={{ __html: alertText }}
            ></div>
            <div className="flex items-center justify-right p-0 pr-2 m-0 text-white dark:text-grey">
                <Basicbutton showAlert={isAlertVisible} setShowAlert={handleCloseAlert} />
            </div>
        </div>
    );
}