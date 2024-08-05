// alerts

interface AlertProps {
    alertText: string;
}

export default function Alert({alertText}) {
    return (
        <div className="container inline-flex bg-green-500 text-white p-4">
            <div className="flex items-center justify-center w-full">{alertText}</div>
        </div>
    );
}