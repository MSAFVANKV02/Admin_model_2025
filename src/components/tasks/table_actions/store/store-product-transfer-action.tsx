import MyEyeIcon from "@/components/icons/My_EyeIcon";
import ProductTransferModel from "@/components/modals/store/Product_Transfer_Model";
import { UseModal } from "@/providers/context/context";

export default function StoreProductTransferAction() {
  const { setIsOpen } = UseModal();
  return (
    <div>
      <MyEyeIcon
        onClick={() => {
          setIsOpen(true);
        }}
      />

      {/* ======= product transfer modal ========*/}
      <ProductTransferModel />
    
    </div>
  );
}
