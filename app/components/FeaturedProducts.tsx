import FilterableProductCards from "./FilterableProductCards"
import Image from 'next/image';

async function fetchProducts() {
    try {
        const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/products?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
            { next: { revalidate: 300 } } // 5 mins
        );
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await res.json();

        const [headers, ...rows] = data.values;

        const transformData = (row: any) => {
            return row.reduce((acc: any, value: any, index: any) => {
                acc[headers[index]] = value;
                return acc;
            }, {});
        };

        const transformedData = rows.map(transformData);
        const featuredProducts = transformedData.filter((product: any) => product.featured === 'TRUE');
        const allProducts = transformedData
        return {allProducts, featuredProducts};
    } catch (error) {
        console.error('Error fetching products:', error);
        return { allProducts: [], featuredProducts: [] };
    }
}

export default async function FeaturedProducts() {
    const products = await fetchProducts();
    return (
        <FilterableProductCards products={products.allProducts} featured={products.featuredProducts} />
    );
}