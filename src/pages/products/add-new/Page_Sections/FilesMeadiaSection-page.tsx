

type Props = {
  setFieldValue: any;
  values: FileFormValues;
  errors: any;
};

type FileFormValues ={
  file: File | undefined;
}

export default function FilesMediaSectionPage({
  setFieldValue,
  values,
  errors,
}:Props) {
  console.log(  setFieldValue,
    values,
    errors,);
  
  return (
    <div className="">
      {/* Main container starts here ======= */}
    
    </div>
  );
}
