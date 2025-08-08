import React from 'react';
import { TableBody, TableRow, TableCell, Typography, Box, Chip, Button } from '@mui/material';
import type { getProductList } from '@/app/types/product';

const ProductTableBody = ({ products }: { products: getProductList[] }) => (
    <TableBody>
        {products.map((product) => (
            <TableRow key={product._id}>
                <TableCell>
                    <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                        {product._id}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                                {/* <img src={product.productImage.url} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '4px', marginRight: '8px' }} /> */}
                                {product.productName}
                            </Typography>

                        </Box>
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: '13px' }}>
                        {product.productCategory}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                        {product.stock}
                    </Typography>
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
                    <Typography variant="h6">{product.productPrice}₺</Typography>
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
);

export default ProductTableBody;
