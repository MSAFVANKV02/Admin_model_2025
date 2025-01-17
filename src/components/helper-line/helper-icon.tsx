import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Draggable from "react-draggable";

export default function HelperIcon() {
  const [openHelper, setOpenHelper] = useState(false);
  return (
    <div className="relative">
      <Draggable>
        <div
          className={`${
            !openHelper ? "w-16 h-16" : "w-0 h-0"
          }   duration-700 transition-all bg-bg rounded-full shadow-2xl cursor-pointer fixed bottom-7 right-7 flex items-center justify-center`}
          onClick={() => {
            setOpenHelper(!openHelper);
          }}
        >
          <Icon icon="mdi:customer-service" color="white" fontSize={40} />
        </div>
      </Draggable>
      <div
        className={`${
          openHelper ? "w-[300px] h-[500px] p-3 shadow-lg" : "w-0 h-0"
        }  duration-700 transition-all bg-black/30 backdrop-blur-sm  fixed bottom-10 right-7 rounded-md rounded-br-3xl `}
      >
        <div className={`${openHelper ? "" : "hidden"} flex flex-col justify-between h-full`}>
          <span
            onClick={() => {
              setOpenHelper(!openHelper);
            }}
          >
            close
          </span>
          <h2 className="text-lg font-medium text-gray-800">Helper Line</h2>
          <p className="text-sm text-gray-600">
            Our customer service team is here to help you.
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
            Chat Bot
          </button>
        </div>
      </div>
    </div>
  );
}
