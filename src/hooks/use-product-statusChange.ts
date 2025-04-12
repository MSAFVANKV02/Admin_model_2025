import { useMutationData } from "./useMutationData";
import {
  changeProductStatus,
  changeProductToggle,
  DeleteProductFn,
} from "@/actions/products/productActions";

import { IProductStatus } from "@/types/productType";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateProductStatus = (productId: string) => {
  const client = useQueryClient()
  const { mutate } = useMutationData(
    ["change-status", productId], // Ensure unique mutation key per product
    (newStatus: IProductStatus) => changeProductStatus(productId, newStatus), // Pass newStatus
    "product-status",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        // dispatch(fetchProducts());
        client.invalidateQueries({queryKey:["all-products"]})
      }
      //
    }
  );

  const onChangeNewStatus = (newStatus: IProductStatus) => {
    mutate(newStatus); // Mutate with actual selected status
  };

  return { onChangeNewStatus };
};

export const useUpdateToggleWithStore = (productId: string, refetch: any) => {
  const { mutate, isPending } = useMutationData(
    ["change-toggle", productId], // Ensure unique mutation key per product
    ({ fieldName, storeIds }: { fieldName: string; storeIds: string[] }) =>
      changeProductToggle({ productId, fieldName, storeIds }), // Pass newStatus
    "product-toggle",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        refetch();
      }
      //
    }
  );

  const onChangeNewToggle = (fieldName: string, storeIds: string[]) => {
    mutate({ fieldName, storeIds });
  };

  return { onChangeNewToggle, isPending };
};

// 3. soft delete mutation
export const useSoftDeleteProduct = (refetch: any) => {
  const { softDeleteProductFn } = DeleteProductFn();

  const { mutate, isPending } = useMutationData(
    ["softDeleteProduct"],
    ({ productId }: { productId: string }) =>
      softDeleteProductFn({ productId: productId }),
    "product-delete",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        refetch();
      }
      //
    }
  );

  const onSoftDelete = (productId: string | undefined) => {
    mutate({ productId });
  };

  return { onSoftDelete, isPending };
};

export const useHardDeleteProduct = (refetch: any) => {
  const { hardDeleteSingleProductFn } = DeleteProductFn();

  const { mutate, isPending } = useMutationData(
    ["hardDelete-single-Product"],
    ({ productId }: { productId: string;}) =>
      hardDeleteSingleProductFn({
        productId: productId,
        hardDelete: true,
      }),
    "product-delete",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        refetch();
      }
      //
    }
  );

  const onSoftDelete = (productId: string | undefined) => {
    mutate({ productId });
  };

  return { onSoftDelete, isPending };
};
