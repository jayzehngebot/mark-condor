import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Sources of Inspiration",
    description: "Sources of Inspiration",
};

export default function SourcesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center w-full ">
            {children}
        </div>
    )
}