import Checkbox from "@/components/myUi/checkBox";
import { getCategories } from "@/redux/actions/category_Slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICategory } from "@/types/categorytypes";
import { Collapse } from "@mui/material";
import { useEffect, useState } from "react";


const CategorySelection = () => {
  const categories = useAppSelector((state) => state.category.categories);
//   console.log(JSON.stringify(categories));
  
  const dispatch = useAppDispatch();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Handle category selection
  const handleCheckboxChange = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Toggle collapse
  const handleToggle = (id: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Recursive function to render categories
  const renderCategories = (categories: ICategory[], level = 0) => {
    return categories.map((category) => (
      <div key={category._id} className={`ml-${level * 4} text-sm`}>
        {/* Category checkbox and name */}
      <div className="  flex justify-between">
      <div className="flex items-center gap-2">
          <Checkbox
            onChange={() => handleCheckboxChange(category._id!)}
          />
          <span
            onClick={() => handleToggle(category._id!)}
            className="cursor-pointer"
          >
            {category.name}
          </span>
        </div>

        <div className={`w-2 h-2 rounded-full border ${selectedId === category._id?"border-textMain":""}`}/>
      </div>

        {/* Recursive rendering of subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <Collapse in={!!openRows[category._id!]} timeout="auto" unmountOnExit>
            <div className="ml-6">
              {renderCategories(category.subcategories, level + 1)}
            </div>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <div>
      {/* <h2 className="font-bold mb-2">Product Category</h2> */}
      {renderCategories(categories.filter((cat) => !cat.parentId))}
      {/* <div className="mt-4">
        Selected Category ID: <strong>{selectedId ?? "None"}</strong>
      </div> */}
    </div>
  );
};

export default CategorySelection;
