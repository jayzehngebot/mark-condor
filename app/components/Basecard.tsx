// a card that can be used for any page

type BasecardProps = {
    id: number;
    title: string;
    description: string;
    source_url: string;
    wide?: boolean;
    tags?: string;
    image: string;
    openInNewTab?: boolean; // Added prop
    subhed?: string; // Added subhed prop
};

const Basecard: React.FC<BasecardProps> = ({ id, title, description, source_url, wide, tags, image, openInNewTab, subhed }) => {
    return (
        <div id={`source_${id}`} className={`bg-slate-900 rounded-lg shadow-md ${wide ? 'w-full' : 'w-full sm:w-1/3 md:w-1/4 lg:w-1/4'} h-40 m-4`}>
            <a href={`${source_url}`} target={openInNewTab ? "_blank" : "_self"} aria-label={`Visit ${title}`}>
                <div className="flex flex-col h-full text-left">
                    <div className="p-4">
                        <h2 className="text-xl mb-2">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                        {tags && <p className="text-gray-400 mt-2">{tags}</p>} {/* Display tags if they exist */}
                        {subhed && <p className="text-gray-400 mt-2">{subhed}</p>} {/* Display subhed if it exists */}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Basecard;