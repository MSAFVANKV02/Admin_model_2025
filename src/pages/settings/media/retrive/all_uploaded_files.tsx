import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import { Calendar } from "@/components/ui/calendar";
import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useNavigateClicks from "@/hooks/useClicks";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchMediaDetails } from "@/redux/actions/mediaSlice";
import File_Size_Formatter from "@/components/myUi/File_Size_Formatter";
import PreloaderPage from "@/preloader-page";

export interface IFileDataMedia {
  _id: number;
  name: string;
  format: string;
  imageurl: string;
  size: number;
  width: number;
  height: number;
  uploadedAt: Date;
}

type Props = {
  onClick?: (selectedFiles: IFileDataMedia[], imageurl: string[]) => void;
  multiple?: boolean;
  mediaType?: "pdf" | "image" | "videos" | "xl" | "";
  selectedFiles: IFileDataMedia[]; // New prop
  setSelectedFiles: (files: IFileDataMedia[]) => void; // New prop
};

export default function AllUploadedFiles({
  onClick,
  multiple,
  mediaType = "",
  selectedFiles = [],
  setSelectedFiles
}: Props) {
  const { handleClick } = useNavigateClicks();
  const { media: files, isLoading } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | undefined>();
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);

  // const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);

  useEffect(() => {
    dispatch(fetchMediaDetails());
  }, [dispatch]);

  // console.log(date);

  const filteredFiles = files.filter(
    (file) =>
      !date || new Date(file.uploadedAt).toDateString() === date.toDateString()
  );

  const categorizedFiles = {
    image: filteredFiles.filter((file) => file.format.startsWith("image/")),
    videos: filteredFiles.filter((file) => file.format.startsWith("video/")),
    pdf: filteredFiles.filter((file) => file.format === "application/pdf"),
    xl: filteredFiles.filter(
      (file) =>
        file.format === "application/vnd.ms-excel" ||
        file.format ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ),
    other: filteredFiles.filter(
      (file) =>
        !file.format.startsWith("image/") &&
        !file.format.startsWith("video/") &&
        file.format !== "application/pdf" &&
        file.format !== "application/vnd.ms-excel" &&
        file.format !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ),
  };


const handleFileClick = (file: IFileDataMedia, event: React.MouseEvent) => {
  const fileIndex = filteredFiles.findIndex((f) => f._id === file._id);
  let updatedFiles = [...selectedFiles];

  if (multiple) {
    if (event.shiftKey && lastSelectedIndex !== null) {
      // Multi-select files between last selected and current
      const start = Math.min(lastSelectedIndex, fileIndex);
      const end = Math.max(lastSelectedIndex, fileIndex);
      const filesToSelect = filteredFiles.slice(start, end + 1);

      updatedFiles = Array.from(new Set([...selectedFiles, ...filesToSelect])); // Avoid duplicates
    } else {
      // Normal toggle selection
      if (selectedFiles.some((selected) => selected._id === file._id)) {
        updatedFiles = selectedFiles.filter((selected) => selected._id !== file._id);
      } else {
        updatedFiles.push(file);
      }
    }
  } else {
    updatedFiles = selectedFiles[0]?._id === file._id ? [] : [file];
  }

  setSelectedFiles(updatedFiles);
  setLastSelectedIndex(fileIndex); // Store last clicked index
  onClick?.(updatedFiles, updatedFiles.map((file) => file.imageurl));
};


  // ======= working fine old function for select files =====

  // const handleFileClick = (file: IFileDataMedia) => {
  //   let updatedFiles;
  //   if (multiple) {
  //     if (
  //       selectedFiles.some((selected) => selected.imageurl === file.imageurl)
  //     ) {
  //       updatedFiles = selectedFiles.filter(
  //         (selected) => selected.imageurl !== file.imageurl
  //       );
  //     } else {
  //       updatedFiles = [...selectedFiles, file];
  //     }
  //   } else {
  //     updatedFiles = selectedFiles[0]?.imageurl === file.imageurl ? [] : [file];
  //   }
  //   setSelectedFiles(updatedFiles);
  //   onClick?.(
  //     updatedFiles,
  //     updatedFiles.map((file) => file.imageurl)
  //   );
  // };

  if (isLoading) return <PreloaderPage />;

  return (
    <PagesLayout className="h-fit">
      <PageLayoutHeader>
        {selectedFiles && selectedFiles.length > 0 ? (
          <div>
            <h1 className="text-xs">{selectedFiles.length} selected</h1>
          </div>
        ) : (
          <h1>All Uploaded Files</h1>
        )}

        <AyButton
          title="Upload Media"
          onClick={() => handleClick("/settings/media")}
        />
      </PageLayoutHeader>

      <PagesLayoutContent className="space-y-10">
        <div className="flex items-center gap-5 flex-wrap">
          <Popover>
            <PopoverTrigger>
              <AyButton
                icon="fluent-color:calendar-clock-20"
                iconSize={23}
                variant="outlined"
                outLineColor="gray"
                title={`${date ? "Filter With Date" : "Filter With Date"}`}
                sx={{ width: "fit-content" }}
              />
            </PopoverTrigger>
            <PopoverContent className="ml-36 z-[10006]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="z-[10006]"
              />
            </PopoverContent>
          </Popover>
          {/* reset button calendar ======= */}
          {date && (
            <div className="">
              <AyButton
                title="Reset"
                variant="outlined"
                sx={{
                  width: "fit-content",
                }}
                onClick={() => {
                  if (date) {
                    setDate(undefined);
                  }
                }}
              />
            </div>
          )}
        </div>

        {filteredFiles.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold ">
            No files found for the selected date.
          </p>
        ) : (
          Object.entries(categorizedFiles).map(([type, files], index) =>
            mediaType === "" || mediaType === type
              ? files.length > 0 && (
                  <div key={`${index}-${files}`}>
                    {/* {index} */}
                    <h2 className="tex-lg uppercase font-bold underline text-textGray mb-3">
                      All {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h2>
                    <ul className="grid xl:grid-cols-7 gap-3 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
                      {files.map((file) => (
                        <li
                          key={file._id}
                          className={`aspect-square shadow-2xl hover:scale-105 duration-200 transition-transform relative flex-col max-w-[200px] flex justify-center items-center border cursor-pointer ${
                            selectedFiles.find((f) => f._id === file._id)
                              ? "border-blue-500"
                              : ""
                          }`}
                          // className="border cursor-pointer p-5 rounded-xl shadow-lg"
                          // onClick={() => {
                          //   if (onClick) {
                          //     handleFileClick(file);
                          //   }
                          // }}
                          onClick={(event) => {
                            if (onClick) {
                              handleFileClick(file, event);
                            }
                          }}
                          
                        >
                          {/* {JSON.stringify(file)} */}
                          {/* {file.imageurl} sdas */}
                          {type === "image" ? (
                            <img
                              src={file.imageurl}
                              onClick={() =>
                                !onClick && window.open(file.imageurl, "_blank")
                              }
                              alt={file.name}
                              className="w-full h-full object-contain"
                            />
                          ) : type === "videos" ? (
                            <video
                              src={file.imageurl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          ) : type === "pdf" ? (
                            <MyPdf value={file.imageurl} isPdfShown />
                          ) : (
                            <span className="block text-center font-semibold">
                              {file.name}
                            </span>
                          )}
                          {selectedFiles.length > 0 &&
                            selectedFiles.map(
                              (select) =>
                                select._id === file._id && (
                                  <span
                                    key={select._id}
                                    className=" absolute bg-black/10 flex items-center justify-center 
                                    flex-col backdrop-blur-sm top-0 left-0 w-full h-full text-white text-center text-xs"
                                  >
                                    <File_Size_Formatter
                                      size={select.size}
                                      className="text-xs text-white"
                                    />
                                    <span>
                                      {select.width} x {select.height}
                                    </span>
                                    {/* {select.size} */}
                                  </span>
                                )
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              : null
          )
        )}
      </PagesLayoutContent>
    </PagesLayout>
  );
}
