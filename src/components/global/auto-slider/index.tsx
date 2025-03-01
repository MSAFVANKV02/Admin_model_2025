// import React, { useEffect, useState } from "react";
// import { FaPlay, FaPause } from "react-icons/fa";

// const LogoSlider = () => {
//   const [isPlaying, setIsPlaying] = useState(true);

//   const partners = [
//     {
//       id: 1,
//       name: "Tech Corp",
//       logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
//       website: "https://example.com"
//     },
//     {
//       id: 2,
//       name: "Innovation Labs",
//       logo: "https://images.unsplash.com/photo-1616469829581-73886d59bc73",
//       website: "https://example.com"
//     },
//     {
//       id: 3,
//       name: "Digital Solutions",
//       logo: "https://images.unsplash.com/photo-1622937033912-36850940842b",
//       website: "https://example.com"
//     },
//     {
//       id: 4,
//       name: "Future Systems",
//       logo: "https://images.unsplash.com/photo-1622937033912-36850940842b",
//       website: "https://example.com"
//     },
//     {
//       id: 5,
//       name: "Global Tech",
//       logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
//       website: "https://example.com"
//     },
//     {
//       id: 6,
//       name: "Smart Solutions",
//       logo: "https://images.unsplash.com/photo-1616469829581-73886d59bc73",
//       website: "https://example.com"
//     },
//     {
//       id: 7,
//       name: "Tech Innovate",
//       logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
//       website: "https://example.com"
//     },
//     {
//       id: 8,
//       name: "Future Labs",
//       logo: "https://images.unsplash.com/photo-1616469829581-73886d59bc73",
//       website: "https://example.com"
//     }
//   ];

//   useEffect(() => {
//     const slider = document.querySelector(".slider");
//     let animationFrame;

//     const animate = () => {
//       if (isPlaying) {
//         slider.scrollLeft += 1;
//         if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) {
//           slider.scrollLeft = 0;
//         }
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [isPlaying]);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Our Trusted Partners</h2>
//           <button
//             onClick={togglePlay}
//             className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
//             aria-label={isPlaying ? "Pause slider" : "Play slider"}
//           >
//             {isPlaying ? (
//               <FaPause className="text-gray-600 w-4 h-4" />
//             ) : (
//               <FaPlay className="text-gray-600 w-4 h-4" />
//             )}
//           </button>
//         </div>
        
//         <div className="relative overflow-hidden">
//           <div 
//             className="slider flex gap-8 overflow-x-hidden"
//             onMouseEnter={() => setIsPlaying(false)}
//             onMouseLeave={() => setIsPlaying(true)}
//           >
//             {[...partners, ...partners].map((partner, index) => (
//               <a
//                 key={`${partner.id}-${index}`}
//                 href={partner.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-shrink-0 group"
//                 aria-label={`Visit ${partner.name} website`}
//               >
//                 <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
//                   <img
//                     src={partner.logo}
//                     alt={`${partner.name} logo`}
//                     className="w-[150px] h-[100px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.src = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9";
//                     }}
//                   />
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogoSlider;