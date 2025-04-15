import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import MyEditIcon from "@/components/icons/My_EditIcon";
import { UseModal } from "@/providers/context/context";
import CustomerDetailsModal from "./customer_details_modal";
import { IUserProps } from "@/types/adminUserTypes";
import { delete_Customer_User_Api } from "@/services/customer/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import My_Icon from "@/components/icons/My_Icon";
import { fetchCustomerDetails } from "@/redux/actions/customerSlice";
import { dispatch } from "@/redux/hook";

type Props = {
  data: IUserProps;
};

export default function CustomersActions({ data }: Props) {
  const { dynamicOpenModal, dynamicCloseModal } = UseModal();

  const handleDeleteUser = async (
    type: "soft" | "hard" | "restore" | "block"
  ) => {
    try {
      const response = await delete_Customer_User_Api(data.user._id, type);
      if (response.status === 200) {
        makeToast(response.data.message);
        dispatch(fetchCustomerDetails());
      }
    } catch (error: any) {
      if (error) {
        makeToastError(error.response.data.message || "failed delete");
      }
    }
  };

  return (
    <div className="flex items-center">
      <MyEditIcon
        onClick={() => {
          dynamicOpenModal(data);
        }}
      />
      {/* <MyEyeIcon onClick={() => {}} /> */}
      {data.user.isDeleted ? (
        <My_Icon
          tooltipTitle="Restore"
          icon="mdi:restore"
          onClick={() => {
            handleDeleteUser("restore");
          }}
        />
      ) : (
        <MyDeleteIcon
          onClick={() => {
            handleDeleteUser("soft");
          }}
        />
      )}

      {data.user.isBlocked ? (
        <My_Icon
          tooltipTitle="un-block "
          icon="material-symbols:lock"
          onClick={() => {
            handleDeleteUser("block");
          }}
        />
      ) : (
        <My_Icon
          tooltipTitle="block"
          icon="mdi:unlocked"
          onClick={() => {
            handleDeleteUser("block");
          }}
        />
      )}

      <CustomerDetailsModal
        onClose={() => {
          dynamicCloseModal();
        }}
      />
    </div>
  );
}
