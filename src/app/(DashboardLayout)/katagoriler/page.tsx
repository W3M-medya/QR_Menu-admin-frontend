"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "../components/container/PageContainer";
import ProductTableHead from "./components/ProductTableHead";
import ProductTableBody from "./components/ProductTableBody";
import ImageUpload from "./components/ImageUpload";
import {
    Typography,
    Box,
    Table,
    Button,
    TextField,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Drawer,
    FormLabel,
    FormControlLabel,
    Checkbox,
    TableHead
} from "@mui/material";
import { TableBody, TableRow, TableCell } from '@mui/material';

import Grid from '@mui/material/Grid';
import { addCategoryMain, getAllCategories } from "@/app/services/Category";
import { Category } from "@/app/types/category";
import { random } from "lodash";
import { getAllProduct } from "@/app/services/Product";

const ProductList = ({ categories = [], products = [], tableHead = [] }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [form, setForm] = useState<{
        categoryName: string;
        categoryShortDescription: string;
        categoryDescription: string;
        categoryImage: string;
        categoryImageFile: File | null;
        isActive: boolean;
        products: string[];
    }>({
        categoryName: "",
        categoryShortDescription: "",
        categoryDescription: "",
        categoryImage: "",
        categoryImageFile: null,
        isActive: true,
        products: [],
    });

    const handleSubmit = async () => {
        // Prepare FormData for file upload
        const formData = new FormData();
        formData.append("categoryName", form.categoryName);
        formData.append("categoryShortDescription", form.categoryShortDescription);
        formData.append("categoryDescription", form.categoryDescription);
        formData.append("isActive", String(form.isActive));
        if (form.categoryImageFile) {
            formData.append("categoryImage", form.categoryImageFile);
        }
        // products is array, optional
        if (form.products && form.products.length > 0) {
            form.products.forEach((p) => formData.append("products[]", p));
        }
        try {
            await addCategoryMain(formData);
        } catch (err) {
            console.error("Kategori eklenirken hata:", err);
        }
    };
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            console.log("Fetched categories:", data);
            setCategoryList(data);
        };
        fetchCategories();
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
                    Kategori Ekle
                </Button>
            </Box>
            <DashboardCard title="Kategoriler">
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell >
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        adasdasd
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryList.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography>Katagori Bulunamadı</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {categoryList.map((product: any) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                                            {product.categoryCode}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {/* <img src={product.productImage.url} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '4px', marginRight: '8px' }} /> */}
                                                    {product.categoryName}
                                                </Typography>

                                            </Box>
                                        </Box>
                                    </TableCell>


                                    <TableCell>
                                        {product.isActive ? (
                                            <Chip
                                                color='success'
                                                label={"Satışa açık"}
                                            />
                                        ) : (
                                            <Chip
                                                color='error'
                                                label={"Satışta değil"}
                                            />
                                        )}
                                    </TableCell>

                                    <TableCell >
                                        <Typography variant="h6">
                                            <Button variant="contained" color="primary">
                                                Action
                                            </Button>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 500, p: 3 }}>
                    <Typography variant="h6" mb={2}>Yeni Kategori Ekle</Typography>
                    <Box sx={{ padding: "16px 0" }}>
                        <Paper color="grey.100" sx={{ padding: "16px" }}>
                            <Grid container spacing={3}>
                                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel>Katagori Adı</FormLabel>
                                    <TextField
                                        value={form.categoryName}
                                        onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
                                        placeholder="Kategori adı"
                                        required
                                        size="small"
                                    />
                                </Grid>
                                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel>Kısa Açıklama</FormLabel>
                                    <TextField
                                        value={form.categoryShortDescription}
                                        onChange={(e) => setForm({ ...form, categoryShortDescription: e.target.value })}
                                        placeholder="Kısa açıklama"
                                        size="small"
                                    />
                                </Grid>
                                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel>Detaylı Açıklama</FormLabel>
                                    <TextField
                                        value={form.categoryDescription}
                                        onChange={(e) => setForm({ ...form, categoryDescription: e.target.value })}
                                        placeholder="Detaylı açıklama"
                                        size="small"
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                                    <FormLabel>Görsel</FormLabel>
                                    <ImageUpload
                                        value={form.categoryImage}
                                        onChange={(file, previewUrl) => {
                                            setForm({
                                                ...form,
                                                categoryImage: previewUrl || "",
                                                categoryImageFile: file,
                                            });
                                        }}
                                    />
                                </Grid>
                                <Grid  >
                                    <FormLabel>Aktif mi?</FormLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={form.isActive}
                                                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                            />
                                        }
                                        label={form.isActive ? "Aktif" : "Pasif"}
                                    />
                                </Grid>
                                <Grid  >
                                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
                                        <Button variant="outlined" onClick={() => setDrawerOpen(false)}>İptal</Button>
                                        <Button variant="contained" onClick={handleSubmit}>Kaydet</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Box>
            </Drawer>
        </React.Fragment>
    );
};

export default ProductList;
