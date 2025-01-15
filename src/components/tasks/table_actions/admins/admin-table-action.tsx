import MyDeleteIcon from "@/components/icons/My_DeleteIcon"
import MyEditIcon from "@/components/icons/My_EditIcon"
import { Delete_Admins_Api, Get_Admins_Api } from "@/services/auth/route"
import { IUserTypes } from "@/types/adminUserTypes"
import { makeToastError } from "@/utils/toaster"
import { useNavigate } from "react-router-dom"

type Props = {
    row:IUserTypes
}

export default function AdminTableAction({row}: Props) {

    const handleDelete =  async ()=>{
        if(row.role === 'admin'){
            makeToastError("Admin role cannot be deleted.");
            return;  // Don't delete the admin if they are an admin.
        }
        try {
          
            await Delete_Admins_Api(row._id);
            await Get_Admins_Api();
        } catch (error:any) {
            console.error(error);  // Handle the error as needed. For example, display a notification or retry the action.  // Assuming error is a custom error object with a message property.
            makeToastError(`${error.response.data.message}`);  // Display the error message to the user.
            
        }
    }
   
    const navigate = useNavigate();
  return (
    <div className="flex items-center">
        <MyEditIcon 
        onClick={()=>{
            navigate(`/settings/user-management?type=edit&edit=${row._id}`)

        }}
        />
        <MyDeleteIcon
        onClick={async()=>{
            handleDelete()
        }}
        />
    </div>
  )
}