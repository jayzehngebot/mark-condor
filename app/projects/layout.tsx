import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Projects",
    description: "List of all projects",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}