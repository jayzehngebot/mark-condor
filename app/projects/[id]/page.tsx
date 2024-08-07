import Head from 'next/head'

export function getStaticPaths() {
    return {
      paths: generateStaticParams().map(({ id }) => ({ params: { id } })),
      fallback: false,
    };
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
            <h1 className="text-4xl font-bold">Project : {id}</h1>
        </div>
    )
  }