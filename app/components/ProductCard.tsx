
import Image from 'next/image'

interface ProductData {
    name: string;
    productURL: string;
    imageURL: string;
}


export default function ProductCard({productData}: {productData: ProductData}) {
    return (
        <div className="flex flex-col items-center">
            <a href={productData.productURL} target="_blank">
                <h1 className="text-slate text-center">{productData.name}</h1>
                <Image
                src={`/products/images/${productData.imageURL}`}
                alt={productData.name}
                width={150}
                height={150}
                blurDataURL="data:..."
                placeholder="blur"
                />
            </a>
        </div>
    );
}