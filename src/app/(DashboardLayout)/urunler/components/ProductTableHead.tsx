import React from 'react';
import { TableHead, TableRow, TableCell, Typography } from '@mui/material';

const ProductTableHead = ({ tableHead }:any) => (
  <TableHead>
    <TableRow>
      {tableHead.map((headCell:any) => (
        <TableCell key={headCell.id}>
          <Typography variant="subtitle2" fontWeight={600}>
            {headCell.label}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

 
export default ProductTableHead;
