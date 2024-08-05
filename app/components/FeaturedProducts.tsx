// featuredComponents
'use client'
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

async function getProductData() {
  try {
    const response = await fetch('/api/getProducts', { cache: "no-cache" });
    
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}
interface Product {
  id: string;
  featured: boolean;
  // Add other properties as needed
}

export default function FeaturedProduct() {
  const [productData, setProductData] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProductData()
      .then(data => {
        setProductData(data);
        // Filter featured products
        const featured = data.filter((product: Product) => product.featured);
        setFeaturedProducts(featured);
      })
      .catch(error => console.error("Error setting product data:", error));
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-wrap'>
        {featuredProducts.map(product => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </div>
  );
}
