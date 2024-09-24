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
                <div className="bg-slate-900 rounded-lg min-h-[207px] sm:max-w-[212px] mt-2 p-2 shadow-md">
                    <Image src={`${image_url}`} alt={title} width={100} height={50} className="w-full h-20 object-cover rounded-md mb-2" />
                    <h3 className="text-lg text-slate-200">{title}</h3>
                    <p className="text-sm text-slate-400">{description}</p>
                </div>
            </a>
    );
}
