// a card that can be used for any page

type BasecardProps = {
    key: number;
    id: number;
    title: string;
    description: string;
    source_url: string;
    wide?: boolean;
    tags?: string;
    image: string;
    openInNewTab?: boolean; // Added prop
};

const Basecard: React.FC<BasecardProps> = ({ key, id, title, description, source_url, wide, tags, image, openInNewTab }) => {
    return (
        <div id={`source_${id}`} className={`bg-slate-900 rounded-lg shadow-md ${wide ? 'w-full' : 'w-full sm:w-1/3 md:w-1/4 lg:w-1/4'} h-40 m-4`}>
            <a href={`${source_url}`} target={openInNewTab ? "_blank" : "_self"} aria-label={`Visit ${title}`}>
                <div className="flex flex-col h-full text-left">
                    <div className="p-4">
                        <h2 className="text-xl mb-2">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                        {tags && <p className="text-gray-400 mt-2">{tags}</p>} {/* Display tags if they exist */}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Basecard;