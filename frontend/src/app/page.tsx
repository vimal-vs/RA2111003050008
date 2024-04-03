"use client";

import { useState, useEffect } from 'react';
import Filters from '../app/components/Filters';
import axios from 'axios';
import Image from 'next/image';
import sampleProductImage from '../assets/sampleProduct.png';
import Link from 'next/link';

export default function Home() {
  const [categories, setCategories] = useState([{ name: 'available' }, { name: 'out-of-stock' }]);

  const [category, setCategory] = useState('');
  const [top, setTop] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const params: any = {
      top: top || 10,
      minPrice: minPrice || 1,
      maxPrice: maxPrice || 10000,
    }
    try {
      const response = await axios.get(`http://localhost:3001/categories/Laptop/products`, { params });
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
        <h2 className="text-3xl font-semibold mb-2">Browse Products</h2>
        <div className='flex flex-col gap-6'>
          {products && products.map((company: any) => (
            <div className="flex flex-col flex-wrap gap-6">
              <h2 className="text-lg font-semibold">Products of {company.company}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3'>
                {company?.data?.map((product: any) => (
                  <Link href={`/${product?.productName}`} key={product.data?.id} className="bg-white rounded-lg shadow-md p-4">
                    <Image src={sampleProductImage} alt={product?.productName} className="w-full h-40 object-none mb-4" width={100} height={100} />
                    <h2 className="text-lg font-semibold">{product?.productName}</h2>
                    <p className="text-gray-600">{product?.rating}</p>
                    <p className="text-gray-600">{product?.discount}</p>
                    <p className="text-gray-600">{product?.availability === "yes" ? "Available" : "Out-of-Stock"}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">${product?.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <hr className='w-full h-1' />
            </div>
          ))}
          {!products && (<div>no data found.!</div>)}
        </div>
      </div>
    </div>
  );
}