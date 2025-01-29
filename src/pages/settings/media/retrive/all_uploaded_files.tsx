import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import { Calendar } from "@/components/ui/calendar";
import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useNavigateClicks from "@/hooks/useClicks";

type Props = {
  onClick?: (selectedFiles: string[]) => void;
  multiple?: boolean;
  mediaType?: "pdf" | "image" | "";
};

export default function AllUploadedFiles({
  onClick,
  multiple,
  mediaType,
}: Props) {
  const { handleClick } = useNavigateClicks();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const files = [
    {
      id: 1,
      name: "image1.jpg",
      src: "/img/kyc/banner2.webp",
      size: "5MB",

      createdAt: new Date(),
    },
    {
      id: 2,
      name: "image2.jpg",
      src: "/img/bg/bg-admin-transparent.png",
      size: "3MB",

      createdAt: new Date(),
    },
    {
      id: 3,
      name: "image3.jpg",
      src: "/img/products/Group 710.jpg",
      size: "7MB",

      createdAt: new Date(),
    },
    {
      id: 4,
      name: "image4.jpg",
      src: "/Invoice_INV1482989614215502 (16).pdf",
      size: "10MB",

      createdAt: new Date(),
    },
  ];

  // Filter files by the selected date
  const filteredFiles = files.filter((file) => {
    if (!date) return true; // Show all files if no date is selected
    return file.createdAt.toDateString() === date.toDateString(); // Match dates
  });

  const mediaFilteredFiles = filteredFiles.filter((file) => {
    if (mediaType === "pdf") return file.src.endsWith(".pdf");
    if (mediaType === "image") return !file.src.endsWith(".pdf");
    return true; // Show all files if no mediaType is specified
  });

  const handleFileClick = (src: string) => {
    if (multiple) {
      // Toggle file selection
      if (selectedFiles.includes(src)) {
        setSelectedFiles((prev) => prev.filter((file) => file !== src));
      } else {
        setSelectedFiles((prev) => [...prev, src]);
      }
      onClick?.(
        selectedFiles.includes(src)
          ? selectedFiles.filter((file) => file !== src)
          : [...selectedFiles, src]
      );
    } else {
      // Single file selection
      if (selectedFiles[0] === src) {
        setSelectedFiles([]); // Unselect the file
        onClick?.([]); // Call onClick with an empty array
      } else {
        setSelectedFiles([src]); // Select the new file
        onClick?.([src]); // Call onClick with the selected file
      }
    }
  };

  return (
    <PagesLayout>
      <PageLayoutHeader>
        <h1>All Uploaded Files</h1>

        <AyButton
          title="Upload Media"
          onClick={() => {
            handleClick("/settings/media");
          }}
        />
      </PageLayoutHeader>

      <PagesLayoutContent className="space-y-10">
        {/* Calendar for date filtering */}
        <Popover>
          <PopoverTrigger>
            <AyButton
              icon="fluent-color:calendar-clock-20"
              iconSize={23}
              variant="outlined"
              outLineColor="gray"
              title="Filter With Date"
              sx={{
                width:"fit-content",
              }}
            />
          </PopoverTrigger>
          <PopoverContent className="ml-36 z-[10005]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=""
            />
          </PopoverContent>
        </Popover>

        {/* Show message if no files match the selected date */}
        {mediaFilteredFiles.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold">
            No files found for the selected date.
          </p>
        ) : (
          <>
            {/* Render PDF files */}

            {mediaType !== "image" && (
              <h2 className="tex-lg uppercase font-bold underline text-textGray">
                All Documents
              </h2>
            )}
            <ul className="grid xl:grid-cols-12 gap-3 md:grid-cols-8 sm:grid-cols-6 grid-cols-3">
              {mediaFilteredFiles
                .filter((file) => file.src.endsWith(".pdf"))
                .map((file, index) => (
                  <li
                    className={`aspect-square border cursor-pointer m-auto p-5 rounded-xl shadow-lg ${
                      selectedFiles.includes(file.src) ? "border-blue-500" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      if (onClick) {
                        handleFileClick(file.src);
                      }
                    }}
                  >
                    <MyPdf value={file.src} isPdfShown />
                  </li>
                ))}
            </ul>

            {/* Render non-PDF files (images) */}
            {mediaType !== "pdf" && (
              <h2 className="tex-lg uppercase font-bold underline text-textGray">
                All Images
              </h2>
            )}

            <ul className="grid xl:grid-cols-6 gap-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-2">
              {mediaFilteredFiles
                .filter((file) => !file.src.endsWith(".pdf"))
                .map((file, index) => (
                  <li
                    className={`aspect-square border cursor-pointer ${
                      selectedFiles.includes(file.src) ? "border-blue-500" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      if (onClick) {
                        handleFileClick(file.src);
                      }
                    }}
                  >
                    <img
                      src={file.src}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onClick={() => {
                        if (!onClick) {
                          window.open(file.src, "_blank");
                        }
                        // Opens the image in a new tab
                      }}
                    />
                  </li>
                ))}
            </ul>
          </>
        )}
      </PagesLayoutContent>
    </PagesLayout>
  );
}
