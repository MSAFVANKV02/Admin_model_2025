import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import styles from "./PriceCellRenderer.module.css";

export const PriceCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  data: { discount , discount_type},
}) => (
  <div className={styles.price}>
    <span className={styles.priceAmount}>{"₹" + value}</span>
    <span className={styles.increase}>{discount} { discount_type === "flat" ? '₹':"%"} discount</span>
  </div>
);
