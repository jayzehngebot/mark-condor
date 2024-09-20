import Image from "next/image";

interface SmallCardProps {
    title: string;
    description: string;
    image_url: string;
    section: string;
    url: string;
}

export default function SmallCard({ title, description, image_url, section, url }: SmallCardProps) {
    return (
            // Start of Selection
            <a href={`/${section}/${url}`}>
                <div className="bg-slate-900 rounded-lg min-h-[198px] sm:max-w-[212px] mr-4 mt-4 mb-4 p-2 shadow-md">
                    <Image src={`${image_url}`} alt={title} width={100} height={50} className="w-full h-20 object-cover rounded-md mb-2" />
                    <h3 className="text-lg text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </a>
    );
}
