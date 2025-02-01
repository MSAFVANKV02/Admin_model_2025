import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchSellerOrStoreDetails,
  resetStoreData,
} from "@/redux/actions/storeSellerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProducts } from "@/types/productType";
import { useEffect } from "react";

type Props = {
  values: IProducts;
  setFieldValue: any;
};

export function StoreSelection({ setFieldValue }: Props) {
  const { isLogged } = useAppSelector((state) => state.admin);
  const { storeSeller = [] } = useAppSelector((state) => state.storeSeller);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetStoreData()); // Clear previous data
    dispatch(fetchSellerOrStoreDetails("store"));
  }, [isLogged, dispatch]);

  return (
    <div className="">
      {/* {
        JSON.stringify(storeSeller)
      } */}
      <Select
        onValueChange={(value) => {
          if (value === "no") {
            setFieldValue("store", "");
          }
          setFieldValue("store", value);
        }}
      >
        <SelectTrigger className="w-full py-6">
          <SelectValue placeholder="Select a Store" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Stores</SelectLabel>
            {storeSeller.length > 0 ? (
              storeSeller.map((store) => (
                <SelectItem key={store._id} value={store?.name ?? ""}>
                  {store.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="none" value="no">
                No Store Found
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
