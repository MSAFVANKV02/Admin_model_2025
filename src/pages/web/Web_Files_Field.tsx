import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import MediaFiles from "@/components/media/MediaFiles";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

type Props = {
  label: string;
  fieldName: string;
  images: { imageUrl: File | string; imageLink: string }[];
  setFieldValue: (field: string, value: any) => void;
  handleNewImageUpload: (src: string[], fieldName: string) => void;
  handleLinkChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

export default function WebFilesField({
  label,
  fieldName,
  images,
  setFieldValue,
  handleNewImageUpload,
  handleLinkChange
}: Props) {
  return (
    <div>
      <MediaFiles
        img="typcn:camera"
        title={label}
        mediaType="image"
        multiple
        name={fieldName}
        handleFileUpload={(src, fieldName) => {
          handleNewImageUpload(src, fieldName);
        }}
      />
      <div className="flex flex-col gap-2">
        {images.map((imageObj, index) => (
          <div key={index} className="flex items-center gap-4 p-2 rounded">
            <div className="relative w-16 h-16">
              <Link
                to={
                  typeof imageObj.imageUrl === "string"
                    ? imageObj.imageUrl
                    : URL.createObjectURL(imageObj.imageUrl)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    typeof imageObj.imageUrl === "string"
                      ? imageObj.imageUrl
                      : URL.createObjectURL(imageObj.imageUrl)
                  }
                  alt={`Slider ${index + 1}`}
                  className="w-full h-full object-cover border rounded-lg"
                />
              </Link>

              <div className="absolute -right-4 -top-8">
                <MyDeleteIcon
                  color="#5F08B1"
                  onClick={() => {
                    const updatedImages = images.filter((_, i) => i !== index);
                    setFieldValue(fieldName, updatedImages);
                  }}
                  icon="zondicons:close-solid"
                />
              </div>
            </div>
            <Input
              placeholder="Enter image link"
              value={imageObj.imageLink}
              onChange={(e) => handleLinkChange(e, index)}
              className="flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}