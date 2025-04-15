import MyEditIcon from "../icons/My_EditIcon";
import MyDeleteIcon from "../icons/My_DeleteIcon";
import { IBrand } from "@/types/brandtypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import AyButton from "../myUi/AyButton";
import Modal from "../modals/main";
import { DeleteBrands } from "@/actions/brand/brandActionAPi";
import { MouseEvent, useState } from "react";
import { setSelectedBrand } from "@/redux/actions/brandsSlice";
import { dispatch } from "@/redux/hook";
import { makeToast, makeToastError } from "@/utils/toaster";
import My_Icon from "../icons/My_Icon";
import MyEyeIcon from "../icons/My_EyeIcon";
import { UseModal } from "@/providers/context/context";
import BrandDetailsModal from "./Brand_Details_Modal";

type Props = {
  brands: IBrand[];
};

export default function BrandApprovedTable({ brands }: Props) {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  // const {selectedBrand} = useAppSelector((state)=> state.brand)
  const { hardDeleteSingleBrandFn, softDeleteBrandFn } = DeleteBrands();
  const [errorImg,setErrorImg] = useState(false);
  const { setIsOpen } = UseModal();


  const handleDownload = async (
    e: MouseEvent<SVGSVGElement>,
    imageUrl: string
  ) => {
    e.preventDefault();
    const res = await fetch(imageUrl);
    if (!res.ok) {
      makeToastError("image download failed");
      return;
    }

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = imageUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    makeToast("image downloaded successfully");
  };

  return (
    <div className="overflow-x-auto rounded-lg border mt-5 h-[68vh] overflow-y-auto ">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-semibold">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Brand</th>
            <th className="py-2 px-4">Created By</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Logo</th>

            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {brands.length === 0 ? (
            // Show a single row indicating no brands
            <tr className="text-center w-full">
              <td
                colSpan={6}
                className="py-10 border-b px-4 text-gray-500 text-sm"
              >
                No brands available
              </td>
            </tr>
          ) : (
            brands.map((brand, index) => (
              <tr
                key={brand._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 `}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{brand.name}</td>
                <td className="py-3 px-4 flex flex-col break-words max-w-[200px]">
                  <span className="">{brand.createdBy}</span>
                  <span className=""><b>Owner: </b>{brand.certificateOwnerName}</span>
                </td>
                <td className="py-3 px-4">{brand.status}</td>

                <td className="py-3 px-4 ">
            
                  {brand.logo && !errorImg ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      className="w-14 rounded-md"
                      draggable={false}

                      // onError={(e) => {
                      //   const target = e.target as HTMLImageElement; // Type casting
                      //   target.src = "/img/logo/Logo_black.svg";
                      // }}
                      onError={()=>{
                        setErrorImg(true);
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon
                        icon="material-symbols:error-outline"
                        fontSize={20}
                      />
                    </div>
                  )}
                </td>

                {/* actions ===== starts ======
                ============================ */}
                <td className="py-3 flex justify-end px-3">
                <MyEyeIcon
                    onClick={() => {
                      dispatch(setSelectedBrand({ brand, mode: "view" }));
                      setIsOpen(true);
                      // Open brand details modal
                    }}
                  />
                  <My_Icon
                    icon="hugeicons:image-download-02"
                    tooltipTitle="download Logo"
                    onClick={(e) => {
                      handleDownload(e, brand.logo);
                    }}
                  />
                  <MyEditIcon
                    onClick={() => {
                      dispatch(setSelectedBrand({ brand, mode: "edit" }));
                    }}
                  />
                  {/* ==== */}
                  <Modal
                    open={openModalId === brand._id}
                    setOpen={(value) =>
                      setOpenModalId(value ? brand._id : null)
                    }
                    title="Are You Sure To Delete"
                    description="Delete Permanently or move to bin"
                    trigger={
                      <div>
                        <MyDeleteIcon
                          onClick={() => {
                            // handleDelete()
                            setOpenModalId(brand._id);
                          }}
                        />
                      </div>
                    }
                    footer={
                      <div className="flex justify-end gap-3">
                        <AyButton
                          variant="cancel"
                          title="Move to bin"
                          onClick={async () => {
                            const response = await softDeleteBrandFn(
                              brand._id ?? ""
                            );
                            if (
                              response?.status === 200 ||
                              response?.status === 201
                            ) {
                              setOpenModalId(null); // Close modal after success
                            }
                          }}
                        />
                        <AyButton
                          title="Delete Permanently"
                          variant="delete"
                          onClick={async () => {
                            const response = await hardDeleteSingleBrandFn(
                              brand._id ?? ""
                            );
                            if (
                              response?.status === 200 ||
                              response?.status === 201
                            ) {
                              setOpenModalId(null); // Close modal after success
                            }
                          }}
                        />
                      </div>
                    }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* modal */}
      <BrandDetailsModal/>

      {/* <TaskModal>
        <TaskModalHeader>
          <h5 className="font-bold capitalize">Brand Edit</h5>
          <MyCloseIcon
            onClick={() => {
              setIsOpen(false);
            }}
            isTooltip={false}
          />
        </TaskModalHeader>

        <TaskModalContent>
          <BrandCreateSection />
        </TaskModalContent>
      </TaskModal> */}
    </div>
  );
}
