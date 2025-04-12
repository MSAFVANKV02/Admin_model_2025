import { MySwitch } from "@/components/myUi/mySwitch";
import { toggleProductButton } from "@/redux/actions/product_Slice";
import { dispatch } from "@/redux/hook";
import { IFinalProductTypes } from "@/types/final-product-types";

type Props = {
  row: IFinalProductTypes;
  refetch: () => void;
  name: "is_featured_product" | "is_published" | "is_todays_deal";
};

export const SwitchCells = ({ row, refetch, name }: Props) => {
  // console.log(row.product,'row.product');

  // const { currentAdmin } = useAppSelector((state) => state.admin);

  // const { onChangeNewToggle } = useUpdateToggleWithStore(
  //   row.product._id ?? "",
  //   refetch
  // );

  // const matchNames =
  // name === "is_featured_product"
  //   ? row?.product.non_featured_stores
  //   : name === "is_published"
  //   ? row?.product.non_published_stores
  //   : row?.product.non_todays_deal_stores; // Corrected this line

  // console.log(matchNames,'matchNames');

  const mainToggles =
    name === "is_featured_product"
      ? row?.product.is_featured_product
      : name === "is_published"
      ? row?.product.is_published
      : row?.product.is_todays_deal; // Corrected this line

  // const matchedStore = matchNames?.find(
  //   (task) => task.store === currentAdmin?._id
  // );

  // const checking = matchedStore ? false : mainToggles ? true : false;
  // const checking = mainToggles ? true : false;

  // console.log(mainToggles, "mainToggles");

  return (
    <div className="flex items-center gap-1 py-3">
      <MySwitch
        isOn={!!mainToggles}
        id={`${name}-${row.product._id}`}
        handleToggle={async () => {
          await dispatch(
            toggleProductButton({
              fieldName: name,
              productId: row.product._id ?? "",
            })
          );
          refetch();
          // onChangeNewToggle(
          //   name,
          //   currentAdmin?._id ? [currentAdmin._id] : []
          // );
        }}
      />
    </div>
  );
};
