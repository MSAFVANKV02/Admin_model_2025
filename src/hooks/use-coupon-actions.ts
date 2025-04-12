// import { useMutationData } from "./useMutationData";


// export const useHardDeleteProduct = (refetch: any) => {
//     const { hardDeleteSingleProductFn } = DeleteProductFn();
  
//     const { mutate, isPending } = useMutationData(
//       ["hardDelete-single-Product"],
//       ({ productId }: { productId: string;}) =>
//         hardDeleteSingleProductFn({
//           productId: productId,
//           hardDelete: true,
//         }),
//       "product-delete",
//       (data) => {
//         if (data.status === 200 || data.status === 201) {
//           refetch();
//         }
//         //
//       }
//     );
  
//     const onSoftDelete = (productId: string | undefined) => {
//       mutate({ productId });
//     };
  
//     return { onSoftDelete, isPending };
//   };