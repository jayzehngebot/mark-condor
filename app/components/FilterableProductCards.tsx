'use client'
import React from "react";
import { useState } from "react";
import ProductCard from "./ProductCard"
import Link from "next/link";
export default function FilterableProductCards(products: any, featured: any) {

    const [filteredProducts, setFilteredProducts] = React.useState(products.featured);
    const [activeCategory, setActiveCategory] = React.useState("featured");

    function handleCategoryClick(category: string) {

        setActiveCategory(category);
        // if category is featured, filter the products by category
        if (category === "featured") {
            const newFilteredProducts = products.products.filter((product: any) => product.featured === 'TRUE').slice(0, 6);
            setFilteredProducts(newFilteredProducts);
        } else {
            // filter the products by category
            const newFilteredProducts = products.products.filter((product: any) => product.categories === category).slice(0, 6);
            setFilteredProducts(newFilteredProducts);
        }
    }

    return (
        <div className="min-w-full w-full">
            <h3 className="text-left text-xl ml-2 mt-2">MC Endorsed Products</h3>
            <div className="flex flex-row justify-start items-center w-full w-40 mt-2 text-slate-400">
                <div className="hidden sm:flex flex-row">
                    <button onClick={() => handleCategoryClick("featured")} id="prod_featured" className={`text-left ml-2 mr-10 mb-4 text-sm pt-1 ${activeCategory === "featured" ? "underline" : ""}`}>Featured</button>
                    <button onClick={() => handleCategoryClick("edc")} id="prod_edc" className={`text-left mr-10 mb-4 text-sm pt-1 ${activeCategory === "edc" ? "underline" : ""}`}>EDC</button>
                    <button onClick={() => handleCategoryClick("home")} id="prod_home" className={`text-left mr-10 mb-4 text-sm pt-1 ${activeCategory === "home" ? "underline" : ""}`}>Home</button>
                    <button onClick={() => handleCategoryClick("office")} id="prod_office" className={`text-left mr-10 mb-4 text-sm pt-1 ${activeCategory === "office" ? "underline" : ""}`}>Office</button>
                    <button onClick={() => handleCategoryClick("adventure")} id="prod_adventure" className={`text-left mr-10 mb-4 text-sm pt-1 ${activeCategory === "adventure" ? "underline" : ""}`}>Adventure</button>
                    <button onClick={() => handleCategoryClick("train")} id="prod_train" className={`text-left mr-10 mb-4 text-sm pt-1 ${activeCategory === "train" ? "underline" : ""}`}>Train</button>
                </div>
                <div className="sm:hidden w-full text-left">
                    <select onChange={(e) => handleCategoryClick(e.target.value)} className="w-[200px] left-0 text-lg pt-1 mb-4 bg-slate-900">
                        <option value="featured" className={`${activeCategory === "featured" ? "underline" : ""}`}>Featured</option>
                        <option value="edc" className={`${activeCategory === "edc" ? "underline" : ""}`}>EDC</option>
                        <option value="home" className={`${activeCategory === "home" ? "underline" : ""}`}>Home</option>
                        <option value="office" className={`${activeCategory === "office" ? "underline" : ""}`}>Office</option>
                        <option value="adventure" className={`${activeCategory === "adventure" ? "underline" : ""}`}>Adventure</option>
                        <option value="train" className={`${activeCategory === "train" ? "underline" : ""}`}>Train</option>
                    </select>
                </div>
                <button className="ml-auto text-right text-left mb-4 mr-2 text-sm pt-1 w-[100px]"><Link href="/shop">Go To Shop</Link></button>
            </div>

            <ul className="grid w-full grid-cols-2 sm:grid-cols-6 mb-10 min-h-40">
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((product: any) => (
                    <ProductCard key={product.id} productData={product} />
                )) : (
                    <div className="min-h-[189px] mt-2 col-span-4 sm:col-span-6 text-center text-slate-400">
                        No products found.
                    </div>
                )}
            </ul>
        </div>
    )
}