import Image from "next/image";

interface Story {
    section: string;
    title: string;
    description: string;
    url: string;
    image: string;
}

export default function StoryCard({ story }: { story: Story }) {
    return (
        <div>
            <div className="bg-slate-900 rounded-lg p-4 text-left mb-10 max-w-4xl">
                <div className="flex flex-row">
                    <div className="w-auto pr-6">
                    <Image src={`/about/${story.image}`} alt="The Condor Rides" width={100} height={100}
                        className="rounded-lg" />
                    </div>
                    <div className="w-auto">
                     <span className="text-slate-400 pb-4">{story.section}</span>
                        <h2 className="text-xl text-slate-200   ">{story.title}</h2>
                        <p className="text-sm text-slate-200 pb-4">{story.description}</p>
                        <a href={`/thoughts/${story.url}`} target="_blank" className="text-sm text-slate-400">Read More {'>'}</a>
                    </div>
                </div>
               
</div>
        </div>
    );
}