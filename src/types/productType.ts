import { IBrand } from "./brandtypes";
import { ICategory } from "./categorytypes";
import { StoreTypes } from "./storeTypes";

export type IProductStatus = "pending" | "approved" | "hold" | "rejected"

export type IProducts = {
  _id?: string;
  product_owner?: "seller" | "admin" | "store";
  product_name: string;
  mrp: number;
  product_sku: string;
  barcode?: string;
  brand?: IBrand;
  keywords?: string[];
  minimum_quantity: number;
  product_weight?: number;
  product_dimensions: IProductDimensions;
  categoryId?: ICategory;
  special_features?: string;
  care_guide?: string;
  description?: string;
  //   ===== tax  details ============
  tax_details: ITaxDetails;
  //   taxSlab?: SelectOption[];
  //   isCess: boolean;
  //   cess?: SelectOption[];
  //   cess?: number;

  //   ===== tax  details ============

  is_featured_product?: boolean;
  is_published?: boolean;
  is_todays_deal?: boolean;
  is_best_selling?: boolean;
  isDeleted:boolean;
  published_stores:string[];
  featured_stores?: string[];
  todays_deal_stores?: string[];

  //   files section
  gallery_image?:  string[];
  thumbnails:  string[];
  variations: {
    image: string;
    colorCode: string;
    colorName: string;
    sample: boolean;
    details: IVariants[];
  }[];
  size_chart:  string;

  // === price stock ===
  basePrice: number;
  samplePrice: number;
  discount: number;
  discount_type: "flat" | "percentage";
  price_per_pieces: IPricePerPieces[];
  selectWise: "size" | "bundle";
  store?: StoreTypes;

  // ===== shipping section =================
  is_cod: boolean;
  is_free_shipping: boolean;

  // ==== after uses of user side =================
  rating_count?: number;
  total_ratings?: number;
  unit_soled?: number;
  avg_sale_per_customer?: number;
  return_rate?: number;
  search_count?: number;
  wishlist_count?: number;
  createdAt?: Date;
  updatedAt?: Date;

  //   admin side
  status: IProductStatus;
  reject_reason?: string;
};
// ====== type ends =================

export type ITaxDetails = {
  // taxSlab?: SelectOption[];
  hsn_sac_number: number;
  non_gst_goods: "yes" | "no";
  calculation_types: "on_item_rate" | "on_value";
  igst: number;
  central_tax: number;
  state_tax: number;
  // =====
  on_items_rate_details: ITaxOnItemsRateDetails[];
  isCess: boolean;
  //   cess?: SelectOption[];
  cess?: number;
};

// ==== tax on items details =================
export type ITaxOnItemsRateDetails = {
  greaterThan: number | null;
  upto: number | null;
  igst: number | null;
  cgst: number | null;
  sgst: number | null;
  cess: number | null;
};

// === product dimension details =================================
export type IProductDimensions = {
  product_height: number | null;
  product_length: number;
  product_width: number;
};

export type IPricePerPieces = {
  _id?: string;
  min_Piece?: number;
  max_Piece?: number;
  discount: number;
};

export type IVariants = {
  _id?: string;
  size: string;
  // bundleSizes?:[{ size: string, quantity: number}];
  bundleQuantity?: number;
  stock: number;
  discount: number;
  selling_price: number;
  skuId: string;
};

export interface SelectOption {
  _id: string;
  name: string;
}
