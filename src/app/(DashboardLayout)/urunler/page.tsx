"use client";
import {
    Typography, Box,
    Table,
    Button,
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import ProductTableHead from './components/ProductTableHead';
import ProductTableBody from './components/ProductTableBody';
import React, { useEffect, useState } from 'react'
import { getAllProduct } from '@/app/services/Product';
import { getProductList } from '@/app/types/product';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getAllProduct();
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <DashboardCard
                title="Ürünler"
                action={
                    <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
                        Ürün Ekle
                    </Button>
                }
            >
                <Box>
                    <Table>
                        <ProductTableHead tableHead={tableHead} />
                        <ProductTableBody products={products} />
                    </Table>
                </Box>
            </DashboardCard>
            <Drawer
                
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 500, p: 3 }}>
                    <Typography variant="h6" mb={2}>Yeni Ürün Ekle</Typography>
                    {/* Buraya ürün ekleme formu ekleyebilirsiniz */}
                </Box>
            </Drawer>
        </>
    );
};

export default ProductList;
