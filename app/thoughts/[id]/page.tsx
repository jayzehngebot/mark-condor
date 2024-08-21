import Head from 'next/head'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: `Thought ${params.id}`,
        description: `Thought ${params.id}`,
    }
}

export function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }]
  }

  export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    if (!['1', '2', '3'].includes(id)) {
      return (
        <div>
          <h1>404 - Project Not Found</h1>
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center h-auto mt-40">
            <h1 className="text-4xl font-bold">Thought : {id}</h1>
            
            {/* dangerouslySetInnerHTML={{ __html: html }} */}
        </div>
    )
  }