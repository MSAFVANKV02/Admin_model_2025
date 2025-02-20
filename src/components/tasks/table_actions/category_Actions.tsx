import { DeleteCategory } from "@/actions/category/categoryAction";
import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import MyEditIcon from "@/components/icons/My_EditIcon";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import { useModal } from "@/providers/context/context";
import { ICategory } from "@/types/categorytypes";
import { useState } from "react";

type Props = {
  product: ICategory;
};

export default function CategoryAddModal({ product }: Props) {
  const [open, setOpen] = useState(false);
  const { openCategoryModal } = useModal();
  const { softDeleteCategoryFn } = DeleteCategory();
  return (
    <div className="flex gap-3">
      <MyEditIcon
        onClick={() => {
          openCategoryModal(product);
        }}
      />
      {/* <Icon icon="material-symbols:delete" fontSize={25} className="cursor-pointer"/> */}
      <Modal
      open={open}
      setOpen={setOpen}
        title="Are You Sure To Delete"
        description="Delete Permanently or move to bin"
        trigger={
          <div>
            <MyDeleteIcon
              onClick={() => {
                // handleDelete()
             
              }}
            />
          </div>
        }
        footer={
          <div className="flex justify-end gap-3">
          <AyButton variant="cancel" title="Move to bin"
          onClick={async()=>{
           const response = await softDeleteCategoryFn(product._id ?? "");
           if (response?.status === 200) {
            setOpen(false);  // Close modal after success
          }
          }}
          />
          <AyButton title="Delete Permanently" variant="delete" />
        </div>
        }
      >
       
      </Modal>
    </div>
  );
}
