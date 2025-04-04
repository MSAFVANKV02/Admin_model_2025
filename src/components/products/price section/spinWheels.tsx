// // import React from 'react'
// // import { Wheel } from 'react-custom-roulette'

// // const data = [
// //   { option: 'better luck next time' },
// //   { option: 'won 70' },
// //   { option: 'won 10' },
// //   { option: 'better luck next time' },
// //   { option: 'won 2' },
// //   { option: 'won uber pass' },
// //   { option: 'better luck next time' },
// //   { option: 'won a voucher' }
// // ]

// // export const SpinWheels = () => {
// //   const [mustSpin, setMustSpin] = React.useState(false)
// //   const [prizeNumber, setPrizeNumber] = React.useState(0)

// //   const handleSpinClick = () => {
// //     const newPrizeNumber = Math.floor(Math.random() * data.length)
// //     setPrizeNumber(newPrizeNumber)
// //     setMustSpin(true)
// //   }

// //   return (
// //     <div>
// //       <Wheel
// //         mustStartSpinning={mustSpin}
// //         prizeNumber={prizeNumber}
// //         data={data}
// //         backgroundColors={['#3e3e3e', '#df3428']}
// //         textColors={['#ffffff']}
// //         onStopSpinning={() => {
// //           setMustSpin(false)
// //           alert(`You won: ${data[prizeNumber].option}`)
// //         }}
// //       />
// //       <button onClick={handleSpinClick} className="mt-4 px-4 py-2 bg-black text-white rounded">
// //         Spin
// //       </button>
// //     </div>
// //   )
// // }
// // =================================================================
// import React, { useRef, useState } from "react";
// import { Stage, Layer, Group, Arc, Image as KonvaImage, Text, Line } from "react-konva";
// import useImage from "use-image";

// // Wheel Data
// const prizes = [
//   { label: "Pizza", image: "https://via.placeholder.com/50" },
//   { label: "Gift", image: "https://via.placeholder.com/50" },
//   { label: "Voucher", image: "https://via.placeholder.com/50" },
//   { label: "Uber", image: "https://via.placeholder.com/50" },
//   { label: "70 Coins", image: "https://via.placeholder.com/50" },
//   { label: "Better Luck", image: "https://via.placeholder.com/50" },
// ];

// const SpinWheel = () => {
//   const wheelRef = useRef<any>(null);
//   const [rotation, setRotation] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);

//   const spin = () => {
//     if (isSpinning) return;
//     setIsSpinning(true);
//     const randomRotation = 360 * 5 + Math.floor(Math.random() * 360);
//     const duration = 3000;
//     const start = Date.now();

//     const animate = () => {
//       const now = Date.now();
//       const time = now - start;
//       const progress = Math.min(time / duration, 1);
//       const easing = 1 - Math.pow(1 - progress, 3);
//       setRotation(easing * randomRotation);
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         setIsSpinning(false);
//         alert("Spin finished!");
//       }
//     };
//     animate();
//   };

//   const radius = 150;
//   const anglePerSlice = 360 / prizes.length;

//   return (
//     <div className="flex flex-col items-center">
//       <Stage width={400} height={400}>
//         <Layer>
//           {/* ✅ Pointer Lowered */}
//           <Line
//             points={[200, 50, 190, 30, 210, 30]} // moved down
//             closed
//             fill="red"
//             stroke="black"
//             strokeWidth={1}
//           />

//           {/* Wheel */}
//           <Group ref={wheelRef} x={200} y={200} rotation={rotation}>
//             {prizes.map((prize, i) => (
//               <Group key={i} rotation={i * anglePerSlice}>
//                 <Arc
//                   innerRadius={30}
//                   outerRadius={radius}
//                   angle={anglePerSlice}
//                   fill={i % 2 === 0 ? "#FFCC00" : "#FF9900"}
//                   rotation={-anglePerSlice / 2}
//                 />
//                 <WheelItem prize={prize} angle={anglePerSlice} radius={radius} />
//               </Group>
//             ))}
//           </Group>
//         </Layer>
//       </Stage>
//       <button
//         onClick={spin}
//         disabled={isSpinning}
//         className="mt-4 px-4 py-2 bg-black text-white rounded"
//       >
//         {isSpinning ? "Spinning..." : "Spin"}
//       </button>
//     </div>
//   );
// };

// const WheelItem = ({ prize, angle, radius }: any) => {
//   const [image] = useImage(prize.image);

//   const imageDistance = radius * 0.82; // ✅ move image outward
//   const textDistance = radius * 0.68;  // ✅ move text outward

//   return (
//     <>
//       {/* ✅ Image Positioned Better */}
//       <KonvaImage
//         image={image}
//         x={-15}
//         y={-imageDistance}
//         width={30}
//         height={30}
//         offsetX={15}
//         offsetY={15}
//       />

//       {/* ✅ Text Corrected */}
//       <Text
//         text={prize.label}
//         fontSize={14}
//         fill="black"
//         x={-40}
//         y={-textDistance}
//         width={80}
//         align="center"
//         rotation={-angle / 2} // keeps text facing outward correctly
//       />
//     </>
//   );
// };

// export default SpinWheel;
