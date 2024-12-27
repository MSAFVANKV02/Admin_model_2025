import { useModal } from "@/providers/context/context";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton } from "@mui/material";
import TaskModal, { TaskModalHeader } from "../modals/TaskModal";

type Props = {
  brands: {
    id: number;
    name: string;
    logo: string; // Replace with actual image path
  }[];
};

export default function BrandApprovedTable({ brands }: Props) {
    const {setIsOpen} = useModal();
  return (
    <div className="overflow-x-auto rounded-lg border mt-5 h-[68vh] overflow-y-auto ">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-semibold">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Brand</th>
            <th className="py-2 px-4">Logo</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {brands.map((brand, index) => (
            <tr
              key={brand.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 `}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{brand.name}</td>
              <td className="py-3 px-4 ">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="w-20 h-20 object-contain"
                />
              </td>
              <td className="py-3 px-4 text-right space-x-1">
                <IconButton>
                  <Icon icon="bxs:edit" fontSize={20} className="" />
                </IconButton>
                <IconButton
                onClick={()=>{
                    setIsOpen(true);
                }}
                >
                  <Icon
                    icon="material-symbols:delete"
                    fontSize={20}
                    className=""
                  />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          <TaskModal>
            <TaskModalHeader>
                <h5>Brand request</h5>
            </TaskModalHeader>
          </TaskModal>

    </div>
  );
}
