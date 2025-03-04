
// import { CircleOff, ShieldCheck } from "lucide-react";
import { getAllProductsInAdmin } from "@/actions/products/productActions";
import { useQueryData } from "@/hooks/useQueryData";
import { IProducts } from "@/types/productType";
import PreloaderPage from "@/preloader-page";
import { useEffect } from "react";
import { dispatch, useAppSelector } from "@/redux/hook";
import { addProductRedux } from "@/redux/actions/product_Slice";
import InventoryTable from "./Inventory/InventoryTable";




export default function AllProductsPage() {
  const { data: fetchedProducts, isFetching, refetch } = useQueryData(
    ["all-products"],
    () =>
      getAllProductsInAdmin([
        {
          key: "",
          value: "",
        },
      ]) // Wrap in an arrow function
  );
  // console.log(fetchedProducts,'fetchedProducts');
  
  const { products } = useAppSelector((state) => state.products);

  const { data: product = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IProducts[];
  };

  useEffect(() => {
    if (product.length > 0) {
      dispatch(addProductRedux(product));
    }
  }, [product]);
  


  return (
    <div className="min-h-screen bg-white rounded-md p-3 overflow-x-hidden">

      {isFetching ? (
        <div>
          <PreloaderPage />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
      <InventoryTable 
        refetch={refetch}
        products={products}
      />
    </div>
      )}
       
    
    </div>
  );
}
