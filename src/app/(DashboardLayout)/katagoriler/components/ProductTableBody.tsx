import React from 'react';
import { TableBody, TableRow, TableCell, Typography, Box, Chip, Button } from '@mui/material';
import type { Category } from '@/app/types/category';


const ProductTableBody = (products: any) => {
    return (
        <TableBody>
            {products.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} align="center">
                        <Typography>Katagori Bulunamadı</Typography>
                    </TableCell>
                </TableRow>
            )}
            {products.map((product: any) => (
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
    )
}

export default ProductTableBody


