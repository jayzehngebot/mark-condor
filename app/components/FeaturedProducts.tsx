
import ProductCard from "../components/ProductCard"

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
          acc[headers[index]] = value;
          return acc;
        }, {});
    };

    // Transform the rows into an array of objects
    const transformedData = rows.map(transformData);
    const featuredProducts = transformedData.filter((product: any) => product.featured);

    return featuredProducts;
}

interface Product {
  id: string;
  featured: boolean;
  name: string;
  productURL: string;
  imageURL: string;
}

export default async function Shop() {
    const products = await fetchProducts();
    return (
        <div className="flex flex-col items-center">
            <ul className="flex wx-auto">
                {products.map((product: any) => (
                    <ProductCard key={product.id} productData={product} />
                ))}
            </ul>
        </div>
    );
}
