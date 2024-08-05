
import Image from 'next/image'

export default function ProductCard({productData}) {
    return (
        <div className="">
            <h1>{productData.name}</h1>
            <a href={productData.productURL} target="_blank">
            <Image
                src={productData.imageURL}
                alt="Picture of the author"
                width={150} automatically provided
                height={150} automatically provided
                blurDataURL="data:..." automatically provided
                placeholder="blur" // Optional blur-up while loading
                />
            </a>
        </div>
    );
}