// import AyButton from "@/components/myUi/AyButton";
// import MyPdf from "@/components/myUi/MyPdf";
// import { Calendar } from "@/components/ui/calendar";
// import PagesLayout, {
//   PageLayoutHeader,
//   PagesLayoutContent,
// } from "@/layouts/Pages_Layout";
// import { useEffect, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import useNavigateClicks from "@/hooks/useClicks";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchMediaDetails } from "@/redux/actions/mediaSlice";

// export interface IFileDataMedia {
//   id: number;
//   name: string;
//   format: string;
//   imageurl: string;
//   size: number;
//   width: number;
//   height: number;
//   uploadedAt: Date;
// }

// type Props = {
//   onClick?: (selectedFiles: IFileDataMedia[],imageurl:string[]) => void;
//   multiple?: boolean;
//   mediaType?: "pdf" | "image" | "";
// };

// export default function AllUploadedFiles({
//   onClick,
//   multiple,
//   mediaType,
// }: Props) {
//   const { handleClick } = useNavigateClicks();
//   const {media:files} = useAppSelector((state)=>state.media);
//   const dispatch = useAppDispatch();
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);

//   console.log(files,'files');

//   // const files: IFileDataMedia[] = [
//   //   {
//   //     id: 1,
//   //     name: "image1.jpg",
//   //     imageurl: "/img/kyc/banner2.webp",
//   //     size: 1024,
//   //     height: 300,
//   //     width: 300,
//   //     uploadedAt: new Date(),
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "image2.jpg",
//   //     imageurl: "/img/bg/bg-admin-transparent.png",
//   //     size: 1024,
//   //     height: 600,
//   //     width: 600,
//   //     uploadedAt: new Date(),
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "image3.jpg",
//   //     imageurl: "/img/products/Group 710.jpg",
//   //     size: 1024,
//   //     height: 300,
//   //     width: 300,
//   //     uploadedAt: new Date(),
//   //   },
//   //   {
//   //     id: 4,
//   //     name: "image4.jpg",
//   //     imageurl: "/Invoice_INV1482989614215502 (16).pdf",
//   //     size: 1024,
//   //     height: 300,
//   //     width: 300,
//   //     uploadedAt: new Date(),
//   //   },
//   // ];

//   useEffect(()=>{
//         dispatch(fetchMediaDetails())
//   },[])

//   // const filteredFiles = files.filter(
//   //   (file) => !date || file.uploadedAt.toDateString() === date.toDateString()
//   // );
//   const filteredFiles = files.filter(
//     (file) =>
//       !date ||
//       new Date(file.uploadedAt).toDateString() === date.toDateString()
//   );

//   const mediaFilteredFiles = filteredFiles.filter((file) =>
//     mediaType === "pdf"
//       ? file.format.includes("application")
//       : mediaType === "image"
//       ? !file.format.includes("image")
//       : true
//   );

//   // const handleFileClick = (file: IFileDataMedia) => {
//   //   if (multiple) {
//   //     setSelectedFiles((prev) =>
//   //       prev.find((f) => f.id === file.id)
//   //         ? prev.filter((f) => f.id !== file.id)
//   //         : [...prev, file]
//   //     );
//   //   } else {
//   //     setSelectedFiles((prev) => (prev[0]?.id === file.id ? [] : [file]));
//   //   }
//   //   onClick?.(
//   //     multiple ? selectedFiles : selectedFiles[0] ? [selectedFiles[0]] : []
//   //   );
//   // };
//   const handleFileClick = (file: IFileDataMedia) => {
//     let updatedFiles;
//     if (multiple) {
//       if (selectedFiles.some((selected) => selected.imageurl === file.imageurl)) {
//         updatedFiles = selectedFiles.filter((selected) => selected.imageurl !== file.imageurl);
//       } else {
//         updatedFiles = [...selectedFiles, file];
//       }
//     } else {
//       updatedFiles = selectedFiles[0]?.imageurl === file.imageurl ? [] : [file];
//     }
//     setSelectedFiles(updatedFiles);
//     onClick?.(
//       updatedFiles,
//       updatedFiles.map((file) => file.imageurl)
//     );
//   };

//   return (
//     <PagesLayout className="h-fit">
//       <PageLayoutHeader>
//         <h1>All Uploaded Files</h1>
//         <AyButton
//           title="Upload Media"
//           onClick={() => handleClick("/settings/media")}
//         />
//       </PageLayoutHeader>

//       <PagesLayoutContent className="space-y-10">
//         <Popover>
//           <PopoverTrigger>
//             <AyButton
//               icon="fluent-color:calendar-clock-20"
//               iconSize={23}
//               variant="outlined"
//               outLineColor="gray"
//               title="Filter With Date"
//               sx={{ width: "fit-content" }}
//             />
//           </PopoverTrigger>
//           <PopoverContent className="ml-36 z-[10005]">
//             <Calendar mode="single" selected={date} onSelect={setDate} />
//           </PopoverContent>
//         </Popover>

//         {mediaFilteredFiles.length === 0 ? (
//           <p className="text-center text-gray-500 font-semibold">
//             No files found for the selected date.
//           </p>
//         ) : (
//           <>
// {mediaType !== "image" && (
//   <h2 className="tex-lg uppercase font-bold underline text-textGray">
//     All Documents
//   </h2>
// )}
//             <ul className="grid xl:grid-cols-12 gap-3 md:grid-cols-8 sm:grid-cols-6 grid-cols-3">
//               {mediaFilteredFiles
//                 .filter((file) => file.format.includes("application"))
//                 .map((file) => (
//                   <li
//                     key={file.id}
//                     className={`aspect-square border cursor-pointer m-auto p-5 rounded-xl shadow-lg ${
//                       selectedFiles.find((f) => f.id === file.id)
//                         ? "border-blue-500"
//                         : ""
//                     }`}
//                     onClick={() => {
//                       if (onClick) {
//                         handleFileClick(file);
//                       }
//                     }}
//                   >
//                     <MyPdf value={file.imageurl} isPdfShown />
//                   </li>
//                 ))}
//             </ul>

//             {mediaType !== "pdf" && (
//               <h2 className="tex-lg uppercase font-bold underline text-textGray">
//                 All Images
//               </h2>
//             )}
//             <ul className="grid xl:grid-cols-6 gap-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-2">
//               {mediaFilteredFiles
//                 .filter((file) => !file.format.includes("image/"))
//                 .map((file) => (
//                   <li
//                     key={file.id}
//                     className={`aspect-square border cursor-pointer ${
//                       selectedFiles.find((f) => f.id === file.id)
//                         ? "border-blue-500"
//                         : ""
//                     }`}
//                     onClick={() => {
//                       if (onClick) {
//                         handleFileClick(file);
//                       }
//                     }}
//                   >
//                     <img
//                       src={file.imageurl}
//                       alt={file.name}
//                       className="w-full h-full object-cover"
// onClick={() =>
//   !onClick && window.open(file.imageurl, "_blank")
// }
//                     />
//                   </li>
//                 ))}
//             </ul>
//           </>
//         )}
//       </PagesLayoutContent>
//     </PagesLayout>
//   );
// }
// =================================================
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
import { useAppSelector } from "@/redux/hook";

import File_Size_Formatter from "@/components/myUi/File_Size_Formatter";
import PreloaderPage from "@/preloader-page";
import { makeToast, makeToastError } from "@/utils/toaster";
import {
  Delete_Media_Api,
  Delete_Media_Selected_Ids_Api,
} from "@/services/media/route";
import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import Modal from "@/components/modals/main";
import { Trash } from "lucide-react";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllMediaById } from "@/actions/media/mediaAction";
import CheckBox from "@/components/myUi/checkBox";
import MyCopyAction from "@/components/myUi/MyCopyAction";

export interface IFileDataMedia {
  _id: string;
  name: string;
  format: string;
  imageurl: string;
  size: number;
  width: number;
  height: number;
  uploadedAt: Date;
  category: IFIlesCategory;
}

export type IFIlesCategory = "all" | "products" | "category" | "brand";

type Props = {
  onClick?: (selectedFiles: IFileDataMedia[], imageurl: string[]) => void;
  multiple?: boolean;
  mediaType?: "pdf" | "image" | "videos" | "xl" | "";
  selectedFiles?: IFileDataMedia[]; // New prop
  setSelectedFiles?: (files: IFileDataMedia[]) => void; // New prop
  category?: IFIlesCategory;
};

export default function AllUploadedFiles({
  onClick,
  multiple,
  mediaType = "",
  selectedFiles = [],
  setSelectedFiles,
  category = "all",
}: Props) {
  const { handleClick } = useNavigateClicks();
  // const { media: files } = useAppSelector((state) => state.media);
  const { currentAdmin } = useAppSelector((state) => state.admin);

  const { data, isFetching, refetch } = useQueryData(["get-media"], () =>
    getAllMediaById(currentAdmin?._id ?? "")
  );
  const files = data ?? [];

  // console.log(files,'data by id');

  const [date, setDate] = useState<Date | undefined>();
  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null
  );
  const [loadingFiles, setLoadingFiles] = useState<{ [key: string]: boolean }>(
    {}
  );

  // const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);

  // useEffect(() => {
  //   // dispatch(fetchMediaDetails());
  //   dispatch(setMediaData(data));

  // }, [dispatch]);

  // console.log(date);

  // const filteredFiles = files.filter(
  //   (file) =>
  //     !date || new Date(file.uploadedAt).toDateString() === date.toDateString()
  // );
  // const filteredFiles = Array.isArray(files)
  //   ? files.filter(
  //       (file) =>
  //         !date ||
  //         new Date(file.uploadedAt).toDateString() === date.toDateString()
  //     )
  //   : [];
  const filteredFiles = Array.isArray(files)
    ? files.filter((file) => {
        const matchesCategory =
          category === "all" || file.category === category;
        const matchesDate =
          !date ||
          new Date(file.uploadedAt).toDateString() === date.toDateString();
        const matchesMediaType =
          mediaType === "" ||
          file.format.startsWith(`${mediaType}/`) ||
          file.format.endsWith(`${mediaType}`);

        return matchesCategory && matchesDate && matchesMediaType;
      })
    : [];

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
    const fileIndex = filteredFiles.findIndex((f) => f?._id === file?._id);
    let updatedFiles = [...selectedFiles];

    if (multiple) {
      if (event.shiftKey && lastSelectedIndex !== null) {
        // Multi-select files between last selected and current
        const start = Math.min(lastSelectedIndex, fileIndex);
        const end = Math.max(lastSelectedIndex, fileIndex);
        const filesToSelect = filteredFiles.slice(start, end + 1);

        updatedFiles = Array.from(
          new Set([...selectedFiles, ...filesToSelect])
        ); // Avoid duplicates
      } else {
        // Normal toggle selection
        if (selectedFiles.some((selected) => selected?._id === file?._id)) {
          updatedFiles = selectedFiles.filter(
            (selected) => selected?._id !== file?._id
          );
        } else {
          updatedFiles.push(file);
        }
      }
    } else {
      updatedFiles = selectedFiles[0]?._id === file?._id ? [] : [file];
    }

    setSelectedFiles?.(updatedFiles);
    setLastSelectedIndex(fileIndex); // Store last clicked index
    onClick?.(
      updatedFiles,
      updatedFiles.map((file) => file.imageurl)
    );
  };
  // console.log(deleteIds);

  const handleDeleteFileFromServer = async (id: string) => {
    try {
      // Set the loading state to true for the specific file
      setLoadingFiles((prevState) => ({ ...prevState, [id]: true }));

      const response = await Delete_Media_Api(id);
      if (response.status === 200) {
        // dispatch(fetchMediaDetails());
        refetch();
        makeToast(response.data.message);
      }
    } catch (error: any) {
      makeToastError(error.message || "Failed to delete files");
    } finally {
      // Set the loading state to false for the specific file after the operation
      setLoadingFiles((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handleDeleteSelectedFilesFromServer = async () => {
    try {
      if (deleteIds.length === 0) return;

      const response = await Delete_Media_Selected_Ids_Api(deleteIds);
      if (response.status === 200) {
        setDeleteIds([]); // Clear selected IDs first
        // dispatch(fetchMediaDetails()); // Fetch new data
        await refetch();
        makeToast(response.data.message);
      }
    } catch (error: any) {
      makeToastError(error.message || "Failed to delete files");
    }
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

  if (isFetching) return <PreloaderPage />;

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
          {/* ==== delete button ====== */}
          <div className="flex items-center gap-3">
            {filteredFiles.length > 0 && !onClick && (
              <AyButton
                title={deleteIds?.length > 0 ? "DeSelect All" : "Select All"}
                variant="outlined"
                sx={{
                  minWidth: "100px",
                  width: "fit-content",
                  borderBottom: "1px solid black",
                  color: "black",
                  borderRadius: "0px",
                }}
                onClick={() => {
                  if (deleteIds?.length > 0) {
                    // If all are selected, deselect all
                    setDeleteIds([]);
                  } else {
                    // Select all file IDs
                    setDeleteIds(filteredFiles.map((file) => file._id));
                  }
                }}
              />
            )}

            {deleteIds && deleteIds?.length > 0 && !onClick && (
              <Modal
                trigger={
                  <span
                    className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90
          hover:bg-neutral-800/60 w-full p-[5px] rounded-sm gap-2
          "
                  >
                    <Trash
                      size={15}
                      className="text-neutral-800/90 fill-neutral-500"
                    />
                    <span className="text-neutral-400 font-semibold text-xs">
                      Delete
                    </span>
                  </span>
                }
                title="Are you Sure?"
                description="this Action Can not be undone"
              >
                <div className="flex justify-end">
                  <AyButton
                    variant="delete"
                    title="Delete"
                    onClick={handleDeleteSelectedFilesFromServer}
                  />
                </div>
              </Modal>
            )}
          </div>
        </div>
        {/* {deleteIds} */}
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
                    {deleteIds.length > 0 && (
                      <span className="text-xs font-semibold">
                        {deleteIds.length} nos selected
                        {/* {type === "image"? "Images" : "Videos"} */}
                      </span>
                    )}

                    <ul className="grid xl:grid-cols-7 gap-3 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
                      {files.map((file) => (
                        <li
                          key={file?._id}
                          className={`aspect-square shadow-2xl group hover:scale-105 duration-200 transition-transform relative flex-col max-w-[200px] flex justify-center items-center border cursor-pointer
                            ${
                              selectedFiles.some((f) => f._id === file._id)
                                ? "border-blue-500"
                                : ""
                            }
                            ${
                              deleteIds?.includes(file._id)
                                ? "border-red-500"
                                : ""
                            }
                            ${
                              deleteIds?.length === files.length
                                ? "border-red-500 border-2"
                                : ""
                            }`}
                          onClick={(event) => {
                            if (onClick) {
                              handleFileClick(file, event);
                            }
                          }}
                        >
                          {!onClick && (
                            <>
                              <div className="absolute top-2 shadow-xl left-2 ">
                                <CheckBox
                                  size="small"
                                  color="secondary"
                                  onChange={(checked) => {
                                    if (checked) {
                                      // Add the checked ID
                                      setDeleteIds((prev) => [
                                        ...(prev || []),
                                        file._id,
                                      ]);
                                    } else {
                                      // Remove unchecked ID
                                      setDeleteIds((prev) =>
                                        prev?.filter((id) => id !== file._id)
                                      );
                                    }
                                  }}
                                />
                              </div>
                              {/* <Input
                              type="checkbox"
                              className="w-4 h-4 absolute top-2 shadow-xl left-2 group-hover:block hidden"
                              checked={deleteIds?.includes(file._id) || false} // Check if ID is in deleteIds
                              onChange={(e) => {
                                if (e.target.checked) {
                                  // Add the checked ID
                                  setDeleteIds((prev) => [
                                    ...(prev || []),
                                    file._id,
                                  ]);
                                } else {
                                  // Remove unchecked ID
                                  setDeleteIds((prev) =>
                                    prev?.filter((id) => id !== file._id)
                                  );
                                }
                              }}
                            /> */}
                            </>
                          )}

                          <div
                            className={`absolute top-0 right-0 ${
                              loadingFiles[file?._id] ||
                              selectedFiles.some((f) => f?._id === file?._id)
                                ? "block"
                                : "group-hover:block hidden"
                            }`}
                          >
                            <MyDeleteIcon
                              loading={loadingFiles[file?._id] || false}
                              onClick={() =>
                                handleDeleteFileFromServer(file?._id)
                              }
                            />
                            <MyCopyAction
                              enabled={true}
                              isCopy={`${file.imageurl}`}
                              message="Image Copied "
                              title=""
                            />
                          </div>

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
                                select?._id === file?._id && (
                                  <span
                                    key={select?._id}
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
