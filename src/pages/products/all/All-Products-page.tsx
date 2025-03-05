
// import { CircleOff, ShieldCheck } from "lucide-react";
import { getAllProductsInAdmin } from "@/actions/products/productActions";
import { useQueryData } from "@/hooks/useQueryData";
import { IProducts } from "@/types/productType";
import { useEffect } from "react";
import { dispatch} from "@/redux/hook";
import { addProductRedux } from "@/redux/actions/product_Slice";
import InventoryTable from "./Inventory/InventoryTable";
import MyPageTab from "@/components/myUi/MyTab";
import { useSearchParams } from "react-router-dom";





export default function AllProductsPage() {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get("type") 
  const { data: fetchedProducts, isFetching, refetch } = useQueryData(
    ["all-products",urlTypes],
    () =>
      getAllProductsInAdmin([
        {
          key: "",
          value: "",
        },
        
      ],urlTypes === "deleted-product" ? "deleted" : undefined,) // Wrap in an arrow function
  );
  // console.log(fetchedProducts,'fetchedProducts');
  
  // const { products } = useAppSelector((state) => state.products);

  const { data: product = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IProducts[];
  };

  // console.log(product,'productproduct');
  

  useEffect(() => {
    if (product.length > 0) {
      dispatch(addProductRedux(product));
    }
  }, [product,urlTypes,refetch]);



  useEffect(() => {
  
    // fetch()
    refetch();
  }, [urlTypes, refetch]);

  // const fetch = async() => {
  //   try {
  //       const res = await get_Deleted_Product_Api()
  //   console.log(res,'res deleted');
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  


  return (
    <div className="min-h-screen bg-white rounded-md p-3 overflow-x-hidden">
       <MyPageTab
          // setTypeUrl={setSelectedTab}
          tabs={[
    
            {
              value: "all-product",
              title: "All Products",
              url: "/products/all?type=all-product",
              children: (
                <div className="overflow-x-auto w-full">
                <InventoryTable 
                  refetch={refetch}
                  products={product}
                  loading={isFetching}
                />
              </div>
              ),
            },
            {
              value: "deleted-product",
              title: "Trash",
              url: "/products/all?type=deleted-product",
              children: (
                <div className="overflow-x-auto w-full">
                <InventoryTable 
                  refetch={refetch}
                  products={product}
                  loading={isFetching}
                />
              </div>
              ),
            },
            // {
            //   value: "new-product",
            //   title: "New Product",
            //   url: "/products/all?type=new-product",
            //   children: (
            //     <div className="w-full">
            //       <SellerRequestTable />
            //     </div>
            //   ),
            // },
          ]}
        /> 

      {/* {isFetching ? (
        <div>
          <PreloaderPage />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
      <InventoryTable 
        refetch={refetch}
        products={products}
        loading={isFetching}
      />
    </div>
      )} */}
   
       
    
    </div>
  );
}
