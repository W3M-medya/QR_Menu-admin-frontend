export interface ProductImage {
    url: string;
    publicId: string;
}

export interface getProductList {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    categoryId?: string;
    productShortDescription: string;
    productDiscount: number;
    isActive: boolean;
    deliveryStatus: boolean;
    stock?: number;
    stockAlert?: number;
    barcode: string;
    productCode: number;
    productImage: ProductImage;
}