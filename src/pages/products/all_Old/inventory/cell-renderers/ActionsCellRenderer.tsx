
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import type { CustomCellRendererProps } from "ag-grid-react";
// import { FunctionComponent, useCallback, useState } from "react";
// import { IProductStatus } from "@/types/productType";
// import {
//   useUpdateProductStatus,
//   useUpdateToggleWithStore,
// } from "@/hooks/use-product-statusChange";
// import TaskModal, {
//   TaskModalContent,
//   TaskModalFooter,
//   TaskModalHeader,
// } from "@/components/modals/TaskModal";
// import { UseModal } from "@/providers/context/context";
// import { dispatch, useAppSelector } from "@/redux/hook";
// import { fetchSellerOrStoreDetails } from "@/redux/actions/storeSellerSlice";
// import AyButton from "@/components/myUi/AyButton";
// import Loader from "@/components/global/loader";
// import { Separator } from "@/components/ui/separator";
// import My_Icon from "@/components/icons/My_Icon";
// import MyDeleteIcon from "@/components/icons/My_DeleteIcon";

// // export const ActionsCellRenderer: FunctionComponent<
// //   CustomCellRendererProps
// // > = ({  data }) => {
//   export const ActionsCellRenderer: FunctionComponent<
//   CustomCellRendererProps & { product?: any }
// > = ({  data }) => {
//   // api, node,
// // Prevents crash

//   const { _id: productId } = data || {}; 

//   const { onChangeNewStatus } = useUpdateProductStatus(productId);
//   const { onChangeNewToggle, isPending } = useUpdateToggleWithStore(productId),;

//   const { setIsOpen } = UseModal();
//   const { storeSeller } = useAppSelector((state) => state.storeSeller);
//   const [selectedStores, setSelectedStore] = useState<string[]>([]);
//   const [selectedField, setSelectedField] = useState<string>(
//     "is_featured_product"
//   );

//   // const isOutOfStock = variations?.details?.some((variant: IVariants) => variant.stock <= 0) ?? false;

//   // const onRemoveClick = useCallback(() => {
//   //   api.applyTransaction({ remove: [node.data] });
//   // }, [node, api]);

//   const statusList = [
//     { id: 1, value: "pending", label: "Pending", color: "#FF9F43" },
//     { id: 2, value: "hold", label: "Hold", color: "#FFC107" },
//     { id: 3, value: "approved", label: "Approved", color: "#4CAF50" },
//     { id: 4, value: "rejected", label: "Rejected", color: "#F44336" },
//   ];

//   const openTaskModal = useCallback(() => {
//     setIsOpen(true);
//     dispatch(fetchSellerOrStoreDetails("storeSeller"));
//   }, []);

//   const handleSelectStores = (storeId: string) => {
//     setSelectedStore((prevStoreId) =>
//       prevStoreId.includes(storeId)
//         ? prevStoreId.filter((id) => id !== storeId)
//         : [...prevStoreId, storeId]
//     );
//   };


//   // useEffect(() => {
//   //   if (!product) return;
  
//   //   const { non_featured_stores = [], unnon_published_stores = [] } = product;
  
//   //   let newSelectedStores: string[] = [];
  
//   //   if (selectedField === "is_featured_product") {
//   //     newSelectedStores = non_featured_stores.filter(
//   //       (storeId: string) => !unnon_published_stores.includes(storeId) // Ignore stores present in both
//   //     );
//   //   } else if (selectedField === "is_published") {
//   //     newSelectedStores = unnon_published_stores.filter(
//   //       (storeId: string) => !non_featured_stores.includes(storeId) // Ignore stores present in both
//   //     );
//   //   }
  
//   //   setSelectedStore(newSelectedStores);
//   // }, [selectedField, product]);

//   console.log(data);
//   if (!data) return null; 

//   return (
//     <div className="flex justify-end w-full">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="outline"
//             className="border-none w-auto h-auto focus:ring-0 active:ring-0 outline-none bg-transparent hover:bg-transparent"
//           >
//             {/* <Settings /> */}
//             <My_Icon 
//             fontSize={30}
//             tooltipTitle="Actions"
//             icon="mi:options-horizontal"
//             onClick={()=>{}}
//             />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuLabel>Manage Product</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {/* <DropdownMenuItem onClick={onRemoveClick}>Remove</DropdownMenuItem> */}
//           <DropdownMenuItem
//             onClick={() => {
//               openTaskModal();
//               dispatch(fetchSellerOrStoreDetails("storeSeller"));
//               // openTaskModal(productId)
//             }}
//           >
//             Change On Stores
//           </DropdownMenuItem>

//           <ul>
//             {statusList.map(({ id, value, label }) => (
//               <DropdownMenuItem
//                 key={id}
//                 onClick={() => onChangeNewStatus(value as IProductStatus)}
//               >
//                 {label}
//               </DropdownMenuItem>
//             ))}
//           </ul>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* delete button */}
//       <MyDeleteIcon 
//       onClick={()=>{}}
//       />
   

//       <TaskModal>
//         <TaskModalHeader className="py-4 text-sm">
//           Change Status Of A Store {productId}
//         </TaskModalHeader>
//         <Separator />
//         <TaskModalContent className=" bg-slate- pt-5">
//           <ul className="flex flex-col gap-3">
//             {storeSeller.map((store) => (
//               <li
//                 key={store._id}
//                 onClick={() => handleSelectStores(store._id ?? "")}
//                 className={`border p-3 rounded-md text-sm cursor-pointer duration-300 transition-all transform ${
//                   selectedStores.includes(store._id ?? "")
//                     ? "bg-blue-500 text-white"
//                     : "hover:bg-slate-50"
//                 }`}
//               >
//                 {store.name}
//               </li>
//             ))}
//           </ul>
//         </TaskModalContent>

//         <TaskModalFooter>
//           <select
//             value={selectedField}
//             onChange={(e) => setSelectedField(e.target.value)}
//             className="border p-2 text-sm rounded-md w-full"
//           >
//             <option value="is_featured_product">Featured</option>
//             <option value="is_published">Publish</option>
//           </select>
//           <AyButton
//             title=""
//             onClick={() => {
//               onChangeNewToggle(selectedField, selectedStores);
//             }}
//           >
//             <Loader state={isPending} >Update Status</Loader>
//           </AyButton>
//         </TaskModalFooter>
//       </TaskModal>
//     </div>
//   );
// };
