import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {};

const brands = [
  {
    id: 1,
    name: "Brand Name",
    logo: "/public/img/logo/Logo_black.svg", // Replace with actual image path
  },
  {
    id: 2,
    name: "Brand Name",
    logo: "/public/img/logo/Logo_black.svg", // Replace with actual image path
  },
];

export default function BrandApprovedTable({}: Props) {
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
        <tbody>
          {brands.map((brand, index) => (
            <tr
              key={brand.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 `}
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{brand.name}</td>
              <td className="py-3 px-4">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="w-12 h-12 object-contain"
                />
              </td>
              <td className="py-3 px-4 text-right space-x-2">
                <button
                  className=""
                  title="Edit"
                >
                  <Icon icon="bxs:edit" fontSize={25} className="" />
                </button>
                <button
                  className=""
                  title="Delete"
                >
                  <Icon icon="material-symbols:delete" fontSize={25} className="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
