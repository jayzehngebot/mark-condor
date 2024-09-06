import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Testimony",
    description: "Testimony",
};

export default function TestimonyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center w-full">
            {children}
        </div>
    )
}