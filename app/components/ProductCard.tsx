import Image from 'next/image'

interface ProductData {
    name: string;
    productURL: string;
    imageURL: string;
    alt: string;
}


export default function ProductCard({productData}: {productData: ProductData}) {
    return (
        <li className="flex flex-col items-center h-32 sm:h-36 w-16 relative sm:h-auto sm:w-auto">
            <a href={productData.productURL} target="_blank" className="flex flex-col h-full w-full sm:block">
                <h1 className="text-slate text-center text-sm leading-tight" style={{ wordBreak: 'break-word', hyphens: 'auto', maxHeight: '3em' }}>{productData.name}</h1>
                <div className="flex-grow relative w-full sm:static">
                    <div className="absolute inset-x-0 bottom-0 sm:static">
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
        </li>
    );
}