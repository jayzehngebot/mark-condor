// a card that can be used for any page

export default function Basecard({ id, title, description, source_url, wide }: { id: number, title: string, description: string, source_url: string, wide?: boolean }) {
    return (
        // these cards should be a standard width and height
        // and take up 1/3 of the width of the screen
        // and fit three to a row
        <div id={`source_${id}`} className={`bg-slate-900 rounded-lg shadow-md ${wide ? 'w-full' : 'w-1/4'} h-40 m-4`}>
            <a href={`${source_url}`} target="_blank" aria-label={`Visit ${title}`}>
                <div className="flex flex-col h-full text-left">
                    <div className="p-4">
                        <h2 className="text-xl mb-2">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}