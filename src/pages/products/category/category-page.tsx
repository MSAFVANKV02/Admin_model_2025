import AyButton from "@/components/myUi/AyButton";
import {
  CategoryColumnAll,
  CategoryColumnMain,
} from "@/components/tasks/table_columns/category-table-columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { useModal } from "@/providers/context/context";
import { useMemo, useState } from "react";

import { useAppSelector } from "@/redux/hook";

import MyPageTab from "@/components/myUi/MyTab";
import CategoryAddModal from "./category_Add_Modal";

// const Category = [
//   {
//     _id: "1",
//     parent_category: "1234253675",
//     category_name: "Electronics",
//     coverImage: "img/products/Group 710.jpg",
//     icon: "img/products/image 61.png",
//     featured: true,
//     published: true,
//   },
//   {
//     _id: "2",
//     parent_category: null,
//     category_name: "Clothing",
//     coverImage: "img/products/Group 710.jpg",
//     icon: "img/products/image 61.png",
//     featured: false,
//     published: true,
//   },
// ];

export default function CategoryPage() {
  const categories = useAppSelector((state) => state.category.categories);
  const [isMain, setIsMain] = useState(true);
  const { setIsOpen, setSelectedCategory } = useModal();

  const filterMainCat = useMemo(
    () => categories.filter((category) => category.parent_category === null),
    [categories]
  );
  // const filterSubCat = categories.filter(
  //   (category) => category.parent_category !== null
  // );

  return (
    <div>
      <div className="p-3">
        <h1 className="font-bold">Category Page</h1>
      </div>
      <div className="min-h-screen bg-white rounded-md shadow-sm p-5">
        <MyPageTab
          tabs={[
            {
              value: "main",
              title: "Main",
              url: "/products/category?type=main",
              onClick: () => {
                setIsMain(true);
              },
              children: (
                <div>
                  <DataTable
                    enableSearch
                    columns={CategoryColumnMain}
                    data={filterMainCat}
                    searchWith="category_name"
                    // statuses={statuses}

                    enableStatus={false}
                    enableView={false}
                  />
                </div>
              ),
            },
            {
              value: "all",
              title: "All",
              url: "/products/category?type=all",
              onClick: () => {
                setIsMain(false);
              },
              children: (
                <div>
                  <DataTable
                    enableSearch
                    columns={CategoryColumnAll}
                    data={categories}
                    searchWith="category_name"
                    // statuses={statuses}

                    enableStatus={false}
                    enableView={false}
                  />
                </div>
              ),
            },
          ]}
          sideBtn={
            <div className="">
              <AyButton
                title="+ Add New Category"
                sx={{
                  width: "160px",
                  height: "50px",
                  borderRadius: "100px",
                  py: "2px",
                }}
                onClick={() => {
                  setIsOpen(true);
                  setSelectedCategory(null);
                }}
              />
            </div>
          }
        />

        {/* =========== category Modal ============ */}

        <CategoryAddModal 
        isMain={isMain}
        />
      </div>
    </div>
  );
}
