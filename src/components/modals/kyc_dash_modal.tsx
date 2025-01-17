import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "./TaskModal";
import AyButton from "../myUi/AyButton"; // Import shadcn UI components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Field, Form, Formik } from "formik";
import { useModal } from "@/providers/context/context";
import MyPdf from "../myUi/MyPdf";
import MyCloseIcon from "../icons/My_CloseIcon";

export default function KycDashModal() {
  const { selectedTask , closeModal} = useModal(); // Get the modal context

  // console.log(selectedTask,'selectedTask');

  return (
    <TaskModal className="h-[85vh] lg:w-[40vw] sm:w-[70vw] w-full flex flex-col">
      <TaskModalHeader>
        <h2 className="text-lg font-semibold">KYC Details</h2>
        <MyCloseIcon
        onClick={()=>{
          closeModal();
        }}
        />
      </TaskModalHeader>

      {/* KYC Form */}
      <Formik
        initialValues={{
          businessName: selectedTask ? selectedTask.kyc?.businessName : "",
          emailId: selectedTask ? selectedTask.kyc?.emailId : "",
          buildingName: selectedTask ? selectedTask.kyc.buildingName : "",
          street: selectedTask ? selectedTask.kyc.street : "",
          mobile: selectedTask ? selectedTask.user.mobile : "",
          pinCode: selectedTask ? selectedTask.kyc.pinCode : "",
          state: selectedTask ? selectedTask.kyc.state : "",
          country: selectedTask ? selectedTask.kyc.country : "",
          proof: selectedTask ? selectedTask.kyc.proof : "",
          kycStatus: selectedTask ? selectedTask.user?.kycStatus:"",
          proofType: selectedTask ? selectedTask.kyc.proofType :"",
          gstNumber: selectedTask ? selectedTask.kyc?.gstNumber : "",
        }}
        onSubmit={(values) => {
          console.log("Form submitted", values);
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-4">
           
            <TaskModalContent className="space-y-5">
              {/* Business Name */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Business Name
                </Label>
                <Field
                  name="businessName"
                  id="businessName"
                  value={values.businessName}
                  as={Input}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Business Name"
                />
              </div>

              {/* GST Number */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  GST Number
                </Label>
                <Field
                  as={Input}
                  name="gstNumber"
                  id="gstNumber"
                  value={values.gstNumber}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter GST Number"
                />
              </div>

              {/* Contact Number */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Contact Number
                </Label>
                <Field
                  as={Input}
                  name="mobile"
                  id="mobile"
                  value={values.mobile}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Contact Number"
                />
              </div>

              {/* Email ID */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Email ID
                </Label>
                <Field
                  as={Input}
                  className="md:w-[70%] w-full rounded-lg"
                  name="emailId"
                  id="emailId"
                  value={values.emailId}
                  type="email"
                  placeholder="Enter Email ID"
                />
              </div>

              {/* Building Name/Number */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Building Name/Number
                </Label>
                <Field
                  as={Input}
                  name="buildingName"
                  id="buildingName"
                  value={values.buildingName}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Building Name/Number"
                />
              </div>

              {/* Street */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Street
                </Label>
                <Field
                  as={Input}
                  name="street"
                  id="street"
                  value={values.street}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Street"
                />
              </div>

              {/* Post */}
              {/* <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Post
                </Label>
                <Field
                  as={Input}
                  name="post"
                  id="post"
                  value={values.post}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Post"
                />
              </div> */}

              {/* State */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  State
                </Label>
                <Field
                  as={Input}
                  name="state"
                  id="state"
                  value={values.state}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter State"
                />
              </div>

              {/* Pincode */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Pincode
                </Label>
                <Field
                  as={Input}
                  name="pinCode"
                  id="pinCode"
                  value={values.pinCode}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Pincode"
                />
              </div>

              {/* Country */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Country
                </Label>
                <Field
                  as={Input}
                  name="country"
                  id="country"
                  value={values.country}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter Country"
                />
              </div>

                {/* proofType */}
                <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  proofType
                </Label>
                <Field
                  as={Input}
                  name="proofType"
                  id="proofType"
                  value={values.proofType}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Enter proofType"
                />
              </div>

              {/* Uploaded Document */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Uploaded Document
                </Label>
                <div className="md:w-[70%] w-full flex items-start">
                  <MyPdf value={selectedTask?.kyc.proof ?? ""} />
                  {/* <a
                    href={"/Invoice_INV1482989614215502 (16).pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                  >
                    <PdfFile
                      fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                      className="h-16 w-12"
                    />
                    <div className="absolute h-16 w-12 bg-black/50 top-0 rounded-md flex items-center justify-center">
                      <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                    </div>
                  </a> */}
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Status
                </Label>
                <Field
                  as={Select}
                  name="kycStatus"
                  id="kycStatus"
                  value={values.kycStatus}
                  className="md:w-[70%] w-full rounded-lg"
                  placeholder="Select kycStatus"
                >
                  <SelectTrigger className="md:w-[70%] w-full rounded-lg">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className=" z-[10004]">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Field>
                {/* <Select>
                  <SelectTrigger className="md:w-[70%] w-full rounded-lg">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className=" z-[10004]">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>

              {/* Comment */}
              <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
                <Label className="text-textGray mb-2 block text-sm font-medium">
                  Comment
                </Label>
                <Textarea
                  placeholder="Enter Comment"
                  className="md:w-[70%] w-full rounded-lg"
                />
              </div>
            </TaskModalContent>

            <TaskModalFooter>
              <span className="mr-auto">[esc] for close</span>
              <AyButton
                type="button"
                title="Cancel"
                outLineColor="gray"
                variant="outlined"
              />
              <AyButton type="submit" title="Submit" />
            </TaskModalFooter>
          </Form>
        )}
      </Formik>
    </TaskModal>
  );
}
