

export default function ProductCard({productData}) {
    return (
        <div className="">
            <h1>{productData.name}</h1>
            <h1>{productData.productURL}</h1>
            <h1>{productData.imgURL}</h1>
            <h1>{productData.blurb}</h1>
        </div>
    );
}