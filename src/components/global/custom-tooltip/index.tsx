// import React, { useState, useRef, useCallback, ReactNode } from "react";
// import { debounce } from "lodash";

// type Offset = {
//   x: number;
//   y: number;
// };

// type CustomTooltipProps = {
//   children: ReactNode;
//   tooltipContent: ReactNode;
//   delay?: number;
//   offset?: Offset;
//   className?: string;
// };

// const CustomTooltip: React.FC<CustomTooltipProps> = ({
//   children,
//   tooltipContent,
//   delay = 200,
//   offset = { x: 10, y: 10 },
//   className = "",
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const updateTooltipPosition = useCallback(
//     debounce((e: React.MouseEvent<HTMLDivElement>) => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left + offset.x;
//         const y = e.clientY - rect.top + offset.y;

//         // Boundary detection
//         const tooltipWidth = 200; // Estimated tooltip width
//         const tooltipHeight = 40; // Estimated tooltip height

//         const boundedX = Math.min(Math.max(0, x), rect.width - tooltipWidth);
//         const boundedY = Math.min(Math.max(0, y), rect.height - tooltipHeight);

//         setPosition({ x: boundedX, y: boundedY });
//       }
//     }, 10),
//     [offset]
//   );

//   const handleMouseEnter = () => {
//     setIsVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setIsVisible(false);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`relative ${className}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseMove={updateTooltipPosition}
//       aria-describedby="tooltip"
//     >
//       {children}
//       {isVisible && (
//         <div
//           id="tooltip"
//           role="tooltip"
//           className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 bg-opacity-90 rounded-md shadow-lg transition-opacity duration-200 ease-in-out"
//           style={{
//             left: `${position.x}px`,
//             top: `${position.y}px`,
//             transform: "translate(-50%, -100%)",
//           }}
//         >
//           {tooltipContent}
//           <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-800 transform rotate-45 -translate-x-1/2" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomTooltip;
// =================================================================
// import React, {
//     useState,
//     useRef,
//     useCallback,
//     ReactNode,
//     MouseEvent,
//   } from "react";
//   import { debounce } from "lodash";
  
//   type Offset = {
//     x: number;
//     y: number;
//   };
  
//   type CustomTooltipProps = {
//     children: ReactNode;
//     tooltipContent: ReactNode;
//     delay?: number;
//     offset?: Offset;
//     className?: string;
//   };
  
//   const CustomTooltip: React.FC<CustomTooltipProps> = ({
//     children,
//     tooltipContent,
//     delay = 200,
//     offset = { x: 10, y: 10 },
//     className = "",
//   }) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const containerRef = useRef(null);

//     const updateTooltipPosition = useCallback(
//         debounce((e) => {
//             if (containerRef.current) {
//                 const rect = containerRef.current.getBoundingClientRect();
//                 const x = e.clientX - rect.left + offset.x;
//                 const y = e.clientY - rect.top + offset.y;

//                 const tooltipWidth = 300;
//                 const tooltipHeight = 80;

//                 const boundedX = Math.min(
//                     Math.max(0, x),
//                     rect.width - tooltipWidth
//                 );
//                 const boundedY = Math.min(
//                     Math.max(0, y),
//                     rect.height - tooltipHeight
//                 );

//                 setPosition({ x: boundedX, y: boundedY });
//             }
//         }, 10),
//         [offset]
//     );

//     const handleMouseEnter = () => {
//         setIsVisible(true);
//     };

//     const handleMouseLeave = () => {
//         setIsVisible(false);
//     };
  
//     return (
//         <div
//         ref={containerRef}
//         className={`relative ${className}`}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onMouseMove={updateTooltipPosition}
//         aria-describedby="tooltip"
//     >
//         {children}
//         {isVisible && (
//             <span
//                 id="tooltip"
//                 role="tooltip"
//                 className="absolute z-50 p-4 text-base text-gray-700 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[300px] max-w-[400px]"
//                 style={{
//                     left: `${position.x}px`,
//                     top: `${position.y}px`,
//                     transform: "translate(-50%, -120%)"
//                 }}
//             >
//                 {tooltipContent}
//             </span>
//         )}
//     </div>
//     );
//   };
  
//   export default CustomTooltip;
  