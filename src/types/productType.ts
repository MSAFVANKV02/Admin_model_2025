export type IProducts = {
    _id?: number;
    productName: string;
  mrp: number;
  sku: string;
  barcode?: string;
  brand?: string;
  keywords?: string;
  minQty: number;
  weight?: number;
  height?: number;
  length?: number;
  width?: number;
  dimensions?: string;
  taxSlab?: SelectOption[];
  status: "active" | "hold";
  todaysDeal: boolean;
  description?: string;
  isCess: boolean;
  cess?: SelectOption[];
  featured: boolean;
  published:boolean;

//   files section
galleryImages: File[];
thumbnails: File[];
variations: { image: File; colorCode: string; colorName: string; sample:boolean; details:IVariants[] }[];
sizeImages: File[];

// === price stock ===
basePrice: number;
samplePrice: number;
discount: number;
discountType: string;
pricePerPieces: IPricePerPieces[];
selectWise: "size" | "bundle";
store:""

    // ===== shipping section =================
cod:boolean;
freeShipping: boolean;

} 

export type IPricePerPieces = {
    _id?: string;
    min_Piece?: number ;
    max_Piece?: number ;
    discount: number ;
}

export type IVariants = {
    _id?: string;
    size: string;
    // bundleSizes?:[{ size: string, quantity: number}];
    bundleQuantity?: number;
    stock: number;
    discount: number;
    sellingPrice: number;
    skuId: string;
   
}

export interface SelectOption {
    _id: string;
    name: string;
  }