import BrandTable from "@/components/brand/Brand_Table";
import { Input } from "@/components/ui/input";


export default function BrandPage() {
  return (
    <div className="min-h-[80vh]">
        <div className="sm:w-1/2 w-full mb-3">
            <Input type="text" className="border-none outline-none sm:w-1/2 w-3/4 text-xs" placeholder="Search By Brand Name"/>
        </div>
        <div className="lg:h-[80vh] rounded-lg  flex justify-between gap-3 lg:flex-row flex-col">
            {/* Brand Table */}
            <div className="lg:w-[65%] w-full bg-white rounded-lg p-5 shadow ">
            <BrandTable/>
            
            </div>
            <div className="flex-grow bg-white rounded-lg p-5 shadow "></div>
        </div>
    </div>
  )
}