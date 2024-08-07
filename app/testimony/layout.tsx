import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Testimony",
    description: "Testimony",
};

export default function TestimonyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}