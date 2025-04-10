// import CouponsTable from "@/components/marketing/Coupons_Table";
import AllCouponsCreateForm from "@/components/marketing/coupon_forms/All_Coupons_Create_Form";

import CouponsFormForWelcome from "@/components/marketing/coupon_forms/Coupons_Form_Wlcome";

import AyButton from "@/components/myUi/AyButton";
import { CouponTableColumn } from "@/components/tasks/table_columns/marketing/Couon_table_columns";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { getCouponsRedux } from "@/redux/actions/coupon_slice";
import { dispatch, useAppSelector } from "@/redux/hook";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from 'react-select';

type CouponOption = {
  value: string;
  label: string;
};

const couponOptions: CouponOption[] = [
  { value: "product", label: "Normal Type" },
  // { value: "store", label: "For Store" },
  // { value: "total_order", label: "For Total Order" },
  { value: "welcome_coupon", label: "Welcome Coupon" },
];


export default function MarketingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [selectedCouponType, setSelectedCouponType] = useState<CouponOption | null>(null);
  const {coupons} = useAppSelector((state)=>state.coupons)

  const params = searchParams.get("add");

  const showCouponForm = (params: string) => {
    navigate(`/marketing/coupons?add=${params}`);
  };

  const handleCouponsPage = () => {
    navigate("/marketing/coupons", { replace: false }); // Navigate to the base route without query parameters
    setView(false);
  };

  const handleCouponTypeChange = (selectedOption: CouponOption | null) => {
    setSelectedCouponType(selectedOption);
  };
  

  useEffect(() => {
    if (params) {
      setView(true);
    } else {
      setView(false);
    }
  }, [searchParams, params]);

  useEffect(()=>{
    dispatch(getCouponsRedux())
  },[])

  // const renderFormContent = () => {
  //   switch (selectedCouponType?.value) {
  //     case "product":
  //       return   <CouponsFormForProduct/>;
  //     case "store":
  //       return <CouponsFormForStore />;
  //     case "total_order":
  //       return <CouponsForm />;
  //     case "welcome_coupon":
  //       return <CouponsFormForWelcome />;
  //     default:
  //       return <p>Select a coupon type to start.</p>;
  //   }
  // };
  const renderFormContent = () => {
    switch (selectedCouponType?.value) {
      case "product":
        return   <AllCouponsCreateForm/>;
      case "welcome_coupon":
        return <CouponsFormForWelcome />;
      default:
        return  <AllCouponsCreateForm/>;
    }
  };

  return (
    <div>
      <div className="font-bold text-sm p-4">
        <h1>All Coupon Information</h1>
      </div>
      {/* ===== */}
      <div className="page-outer">
        <div className="flex justify-between mb-5">
          {view ? (
            <>
              <span className="text-sm font-bold capitalize">Add Coupon </span>

              <AyButton
                title="Show All Coupons"
                sx={{
                  borderRadius: "100px",
                  height: "50px",
                }}
                onClick={() => {
                  // Navigate to CouponsForm
                  // setIsOpen(true);
                  handleCouponsPage();
                }}
              />
            </>
          ) : (
            <>
              <span className="text-sm font-bold capitalize">Coupon List</span>
              <AyButton
                title="+ Add New Coupon"
                sx={{
                  borderRadius: "100px",
                  height: "50px",
                }}
                onClick={() => {
                  // Navigate to CouponsForm
                  // setIsOpen(true);
                  showCouponForm("coupon");
                }}
              />
            </>
          )}
        </div>
        {/* <CouponsTable /> */}

        {!view ? (
          <DataTable
            enableSearch
            searchWith="name"
            data={coupons}
            columns={CouponTableColumn}
          />
        ) : (
          <div className="max-w-screen-lg mx-auto ">
            <Select
              className="basic-single text-xs"
              classNamePrefix="select"
              isClearable
              isSearchable
              placeholder="Select Coupon Type"
              options={couponOptions}
              value={selectedCouponType}
              onChange={handleCouponTypeChange}
            />
             <div className="mt-4">
              {renderFormContent()}
            </div>
          
          </div>
         
        )}
      </div>

      {/* 
      
      ===== coupons adding from ===============================================================
      */}
    </div>
  );
}
