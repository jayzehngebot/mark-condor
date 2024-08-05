// alerts

interface AlertProps {
    alertText: string;
}

export default function Alert({alertText}) {
    return (
        <div className="bg-green-500 text-white p-4">
            <p className="ml-6">{alertText}</p>
        </div>
    );
}