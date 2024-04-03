"use client";

import { useState, useEffect } from 'react';
import Filters from '../app/components/Filters';
import axios from 'axios';
import Image from 'next/image';

export default function Home() {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState('');
  const [top, setTop] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [products, setProducts] = useState([]);
  const sampleProductImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png"

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/categories/${category}/products`);
      if (response.status === 200) setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, top, minPrice, maxPrice]);

  const handleSelectCategory = (filter: any, value: any) => {
    if (filter === "top") {
      setTop(value);
    }
    else if (filter === "minPrice") {
      setMinPrice(value);
    }
    else if (filter === "maxPrice") {
      setMaxPrice(value);
    }
    else {
      setCategory(value);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Filters categories={categories} handleSelectCategory={handleSelectCategory} />
      <div className='my-12'>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {products && products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <Image src={sampleProductImage} alt={product.name} className="w-full h-40 object-cover mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">${product.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add to Cart</button>
              </div>
            </div>
          ))}
          {!products && (<div>no data found.!</div>)}
        </div>
      </div>
    </div>
  );
}