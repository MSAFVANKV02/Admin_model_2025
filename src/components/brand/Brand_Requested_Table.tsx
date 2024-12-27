import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton } from "@mui/material";

type Props = {
    brands: {
        id: number;
        name: string;
        logo: string; // Replace with actual image path
        brand_cert_owner_name: string;
        user: string; // seller or store
    }[]
};



export default function BrandRequestedTable({brands}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border mt-5 h-[68vh] overflow-y-auto ">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="text-left text-sm font-semibold">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Brand</th>
            <th className="py-2 px-4">Seller Name</th>
            <th className="py-2 px-4">Brand owner name</th>
            <th className="py-2 px-4">Logo</th>
            <th className="py-2 px-4 text-right"></th>
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
              <td className="py-3 px-4">{brand.user}</td>
              <td className="py-3 px-4">{brand.brand_cert_owner_name}</td>


              <td className="py-3 px-4 ">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="w-20 h-20 object-contain"
                />
              </td>
              <td className="py-3 px-4 text-right space-x-2">
                <IconButton>
                <Icon icon="mdi:eye" fontSize={20} className="text-textGray" />
                </IconButton>
               
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
