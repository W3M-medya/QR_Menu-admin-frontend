"use client";
import {
    Typography, Box,
    Table,
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import ProductTableHead from './components/ProductTableHead';
import ProductTableBody from './components/ProductTableBody';
import React, { useEffect, useState } from 'react'
import { getAllProduct } from '@/app/services/Product';
import { getProductList } from '@/app/types/product';

 

const tableHead = [
    { id: "id", label: "Ürün ID" },
    { id: "name", label: "Ürün İsmi" },
    { id: "category", label: "Katagori" },
    { id: "stock", label: "Stok" },
    { id: "status", label: "Ürün Durumu" },
    { id: "fiyat", label: "Fiyat" },
    { id: "action", label: "Eylem" },
];

const ProductList = () => {
    const [products, setProducts] = useState([] as getProductList[]);
    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getAllProduct();
            setProducts(productList);
        };
        fetchProducts();
    }, []);
    return (
        <DashboardCard title='Ürünler'>
            <Box>
                <Table>
                    <ProductTableHead tableHead={tableHead} />
                    <ProductTableBody products={products} />
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductList;