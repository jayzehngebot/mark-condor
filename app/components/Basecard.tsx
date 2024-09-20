// a card that can be used for any page

import Image from "next/image";

type BasecardProps = {
    id: number;
    title: string;
    description: string;
    source_url: string;
    wide?: boolean;
    tags?: string;
    image_url: string;
    show_thumbnail?: boolean;
    openInNewTab?: boolean; // Added prop
    subhed?: string; // Added subhed prop
};

const Basecard: React.FC<BasecardProps> = ({ id, title, description, source_url, wide, tags, image_url, openInNewTab, subhed, show_thumbnail }) => {
    return (
        <div id={`source_${id}`} className={`bg-slate-900 rounded-lg shadow-md ${wide ? 'w-full' : 'w-full'} h-auto sm:h-auto min-h-40 m-2 mb-4 mt-0`}>

            <a href={`${source_url}`} target={openInNewTab ? "_blank" : "_self"} aria-label={`Visit ${title}`}>
                <div className="flex h-full text-left">
                    {show_thumbnail && (
                        <div className="w-1/2 p-2">
                            <Image src={`/projectimages/${image_url}`} alt={`${title} thumbnail`} width={200} height={200} className="w-full h-auto" />
                        </div>
                    )}
                    <div className="p-4 h-full bg-opacity-90 bg-slate-900">
                        <h2 className="text-3xl mb-2">{title}</h2>
                        <p className="text-gray-100">{description}</p>
                        {tags && <p className="text-gray-400 mt-2">{tags}</p>} {/* Display tags if they exist */}
                        {subhed && <p className="text-gray-400 mt-2">{subhed}</p>} {/* Display subhed if it exists */}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Basecard;