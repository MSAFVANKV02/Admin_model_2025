
// import { CircleOff, ShieldCheck } from "lucide-react";
import { getAllProductsInAdmin } from "@/actions/products/productActions";
import { useQueryData } from "@/hooks/useQueryData";
import { IProducts } from "@/types/productType";
import PreloaderPage from "@/preloader-page";
import { useEffect } from "react";
import { dispatch, useAppSelector } from "@/redux/hook";
import { addProductRedux } from "@/redux/actions/product_Slice";
import { InventoryTable } from "./inventory/Inventory-Table";

// const statuses = [
//   {
//     value: "active",
//     label: "Active",
//     icon: ShieldCheck,
//   },
//   {
//     value: "hold",
//     label: "Hold",
//     icon: CircleOff,
//   },
// ];

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
  

  // console.log(products, "products2");

  // useEffect(() => {
  //   async function fetchTasks() {
  //     try {
  //       const response = await fetch(
  //         "/src/components/tasks/data/productData.json"
  //       ); // Replace with the appropriate API route
  //       const data = await response.json();
  //       // const validTasks = z.array(taskSchema).parse(data);
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchTasks();
  // }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white rounded-md p-3">
      {isFetching ? (
        <div>
          <PreloaderPage />
        </div>
      ) : (
        <InventoryTable 
        refetch={refetch}
        products={products}
        
        />
      )}
         {/* <MyPageTab
          // setTypeUrl={setSelectedTab}
          tabs={[
            {
              value: "approved-product",
              title: "Approved Products",
              url: "/products/all?type=approved-product",
              children: (
                <div className="w-full">
                  <DataTable
                    enableSearch
                    columns={ProductTableColumns}
                    data={products}
                    searchWith="product_name"
                    statuses={statuses}
                    enableStatus={true}
                    enableView
                  />
                </div>
              ),
            },
            {
              value: "requested-product",
              title: "Store product request",
              url: "/products/all?type=requested-product",
              children: (
                <div className="w-full">
                  <SellerRequestTable />
                </div>
              ),
            },
            {
              value: "rejected-product",
              title: "Rejected Product",
              url: "/products/all?type=rejected-product",
              children: (
                <div className="w-full">
                  <SellerRequestTable />
                </div>
              ),
            },
            {
              value: "new-product",
              title: "New Product",
              url: "/products/all?type=new-product",
              children: (
                <div className="w-full">
                  <SellerRequestTable />
                </div>
              ),
            },
          ]}
        /> */}
    
    </div>
  );
}
