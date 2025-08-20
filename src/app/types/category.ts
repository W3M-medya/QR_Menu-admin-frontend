// Read model from API (Mongo): uses _id and matching field names
export interface Category {
    _id: string;
    categoryName: string;
    categoryImage: string;
    categoryDescription?: string;
    categoryShortDescription?: string;
    categoryCode: number;
    isActive: boolean;
    products: string[]; // array of Product ObjectIds
}

// Create payload
export interface CreateCategoryDto {
    categoryName: string;
    categoryImage: string;
    categoryDescription?: string;
    categoryShortDescription?: string;
    categoryCode: number;
    isActive?: boolean; // defaults to true on backend
    products?: string[];
}

// Update payload (partial)
export type UpdateCategoryDto = Partial<CreateCategoryDto> & { _id: string };
