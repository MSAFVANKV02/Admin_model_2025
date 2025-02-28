import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";
import styles from "./ProductCellRenderer.module.css";

export const ProductCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = ({
  value,
  data: {
    thumbnails,
    product_owner,
    createdAt,
    brand,
    product_weight,
    minimum_quantity,
    variations,
  },
}) => {
  // Get the first thumbnail image if available
  const thumbnailImage =
    Array.isArray(thumbnails) && thumbnails.length > 0 ? thumbnails[0] : null;

  const allSizes = variations
    .map((variant: any) =>
      variant.details.map((detail: any) => detail.size).join(", ")
    )
    .join(", ");
  const allColors = variations
    .map((variant: any) => variant.colorName)
    .join(", ");

  return (
    <div className={`${styles.productCell} mb-5`}>
      {/* Thumbnail Image */}
      <div className={styles.image}>
        {thumbnailImage ? (
          <img src={thumbnailImage} alt="Product Thumbnail" />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>

      {/* Product Details */}
      <div className={`${styles.details} flex flex-col`}>
        <div className={styles.productName}>{value}</div>
        <div className={`${styles.extraDetails}  flex flex-col text-xs`}>
          <div className="text-xs text-gray-500">
            <b>Added By:</b> {product_owner}{" "}
          </div>
          <div className="text-xs text-gray-500">
            <b>Brand:</b> {brand?.name || "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            <b>product_weight:</b> {product_weight} gm
          </div>
          <div className="text-xs text-gray-500">
            <b>Min. Order Qty:</b> {minimum_quantity} pieces
          </div>
          <div className="text-xs text-gray-500">
            <b>Sizes:</b> {allSizes}
          </div>

          <div className="text-xs text-gray-500">
            <b>Colors:</b> {allColors}
          </div>
          <div className="text-xs text-gray-500">
            <b>Created:</b> {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
