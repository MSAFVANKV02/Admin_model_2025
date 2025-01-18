import MyEyeIcon from "@/components/icons/My_EyeIcon";
import ProductTransferModel from "@/components/modals/store/Product_Transfer_Model";
import { useModal } from "@/providers/context/context";

export default function StoreProductTransferAction() {
  const { setIsOpen } = useModal();
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
