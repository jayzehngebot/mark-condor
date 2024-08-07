import { Metadata } from "next"
import ProductCard from "../components/ProductCard"

export const metadata: Metadata = {
    title: "MC Endorsed Products",
    description: "Shop for MC Endorsed Products",
};

async function fetchProducts() {
    const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/products?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
        { next: { revalidate: 300 } } // 5 mins
    );
    const data = await res.json();

    // shape the data
    const [headers, ...rows] = data.values;

    // Function to transform the array to a JSON object
    const transformData = (row: any) => {
        return row.reduce((acc: any, value: any, index: any) => {
            if (value === "TRUE") {
                acc[headers[index]] = true;
            } else if (value === "FALSE") {
                acc[headers[index]] = false;
            } else {
                acc[headers[index]] = value;
            }
            return acc;
        }, {});
    };

    // Transform the rows into an array of objects
    const transformedData = rows.map(transformData);
    return transformedData;

    return data;
}

export default async function Shop() {
    const products = await fetchProducts();
    console.log(products);
    return (
        <div className="flex flex-col items-center p-10">
            <h1 className="text-4xl font-bold text-center mt-10 mb-10">MC Endorsed Products</h1>
            <ul className="flex wx-auto">
                {products.map((product: any) => (
                    <ProductCard key={product.id} productData={product} />
                ))}
            </ul>
        </div>
    );
}