import Image from 'next/image'

interface ProductData {
    name: string;
    productURL: string;
    imageURL: string;
    alt: string;
    id: number;
}


export default function ProductCard({productData}: {productData: ProductData}) {
    return (
        <div id={`source_${productData.id}`} className={`sm:flex sm:flex-row m-1 sm:h-auto bg-slate-900 rounded-lg h-36 w-18 shadow-md bg-opacity-10 items-center`} style={{ backgroundImage: `url('/backgrounds/${productData.id}.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="h-full w-full rounded-lg bg-opacity-90 bg-slate-900 w-20 relative sm:w-10px ">
                <a href={productData.productURL} target="_blank" className="flex flex-col w-full sm:block">
                    <h2 className="text-slate-500 text-center mt-3 px-1 text-sm leading-tight" style={{ wordBreak: 'break-word', hyphens: 'auto', maxHeight: '3em' }}>{productData.name}</h2>
                    <div className="flex-grow relative w-full sm:static">
                        <div className="pt-2">
                            <Image
                                src={`/products/images/${productData.imageURL}`}
                                alt={productData.alt}
                                width={100}
                                height={100}
                                blurDataURL="data:..."
                                placeholder="blur"
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}