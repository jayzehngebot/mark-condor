// a card that can be used for any page

// i dont want such a generic component, i want to be able to pass in the title, description, and image
export default function Basecard({ id, title, description, source_url }: { id: number, title: string, description: string, source_url: string}) {
    return (
        // these cards should be a standard width and height
        // and take up 1/3 of the width of the screen
        // and fit three to a row
        <div id={`source_${id}`} className="bg-slate-900 rounded-lg shadow-md w-1/4 h-40 m-4">
            <a href={`${source_url}`} target="_blank" aria-label={`Visit ${title}`}>
                <div className="flex flex-col h-full">
                    <div className="p-4">
                        <h2 className="text-xl mb-2">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}