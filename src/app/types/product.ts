export interface getProductList{
    _id: string,
    productName: string,
    productCategory: string,
    stock: string,
    productStatus: boolean,
    productPrice: number,
    productShortDescription: string,
    productDiscount: number,
    isActive: boolean,
    deliveryStatus: string,
    productImage: [
        {
            url: string,
            alt: string
        }
    ]
}