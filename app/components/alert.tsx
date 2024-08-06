// alerts

interface AlertProps {
    alertText: string;
}

export default function Alert({alertText}: AlertProps) {
    return (
        <div className="w-full inline-flex bg-slate text-white p-2">
            <div className="flex items-center justify-center w-full mt-1">{alertText}</div>
        </div>
    );s
}