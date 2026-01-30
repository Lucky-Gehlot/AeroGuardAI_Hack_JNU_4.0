function Gascard({ gasName, value, category }) {

    const categoryColors = {
        Good: "bg-green-500",
        Moderate: "bg-yellow-400",
    };
    return ( 
    <div className="w-full  bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6">
      
      {/* 1. Top: Category Badge */}
      <span className={`${categoryColors[category] || 'bg-blue-500'} text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider`}>
        {category}
      </span>

      {/* 2. Middle: Circular Data View */}
      <div className="relative w-40 h-40 rounded-full border-4 border-slate-700 flex flex-col items-center justify-center bg-slate-800 shadow-inner">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-tighter mb-1">
          {gasName}
        </h3>
        <p className="text-white text-3xl font-black">
          {value} <span className="text-xs font-normal text-slate-500">ppm</span>
        </p>
      </div>

      {/* 3. Bottom: Category Bar (Segmented Progress) */}
      {/* <div className="w-full space-y-2">
        <div className="flex h-2 w-full rounded-full overflow-hidden gap-0.5">
          <div className="flex-1 bg-green-500" title="Good"></div>
          <div className="flex-1 bg-yellow-400" title="Moderate"></div>
          <div className="flex-1 bg-orange-500" title="Poor"></div>
          <div className="flex-1 bg-red-500" title="Unhealthy"></div>
          <div className="flex-1 bg-purple-600" title="Severe"></div>
          <div className="flex-1 bg-red-700" title="Hazardous"></div>
        </div>

        {/* Simple marker representation based on a 0–50 scale */}
        {/* <div className="relative w-full h-[8px]">
          <div 
            className={`absolute top-[2px] w-[8px] h-[8px] ${category === "Hazardous" ? "bg-red" : "bg-white"} border ${category === "Hazardous" ? "border-red" : "border-white"} rounded-full -translate-x-[4px]`}
            style={{ left: `${(markerValue / 5) * 18}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-[12px] text-slate-gray font-mono">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div> */}
      
    </div>
    )
}

export default Gascard;

// import React from 'react';

// const GasCard = ({ gasName, value, category, markerValue }) => {
//   // Mapping categories to Tailwind colors
//   const categoryColors = {
//     Good: "bg-green-500",
//     Moderate: "bg-yellow-400",
//     Poor: "bg-orange-500",
//     Unhealthy: "bg-rose-500",
//     Severe: "bg-purple-600",
//     Hazardous: "bg-red-700",
//   };

//   return (
//     <div className="w-80 bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6">
      
//       {/* 1. Top: Category Badge */}
//       <span className={`${categoryColors[category] || 'bg-blue-500'} text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider`}>
//         {category}
//       </span>

//       {/* 2. Middle: Circular Data View */}
//       <div className="relative w-40 h-40 rounded-full border-4 border-slate-700 flex flex-col items-center justify-center bg-slate-800 shadow-inner">
//         <h3 className="text-slate-400 text-sm font-medium uppercase tracking-tighter mb-1">
//           {gasName}
//         </h3>
//         <p className="text-white text-3xl font-black">
//           {value} <span className="text-xs font-normal text-slate-500">ppm</span>
//         </p>
//       </div>

//       {/* 3. Bottom: Category Bar (Segmented Progress) */}
//       <div className="w-full space-y-2">
//         <div className="flex h-2 w-full rounded-full overflow-hidden gap-0.5">
//           <div className="flex-1 bg-green-500" title="Good"></div>
//           <div className="flex-1 bg-yellow-400" title="Moderate"></div>
//           <div className="flex-1 bg-orange-500" title="Poor"></div>
//           <div className="flex-1 bg-rose-500" title="Unhealthy"></div>
//           <div className="flex-1 bg-purple-600" title="Severe"></div>
//           <div className="flex-1 bg-red-700" title="Hazardous"></div>
//         </div>
        
//         {/* Simple marker representation based on a 0-500 scale */}
//         <div className="relative w-full h-4">
//           <div 
//             className="absolute top-0 w-3 h-3 bg-white border-2 border-red-500 rounded-full -translate-x-1/2"
//             style={{ left: `${(markerValue / 500) * 100}%` }}
//           ></div>
//         </div>

//         <div className="flex justify-between text-[10px] text-slate-500 font-mono">
//           <span>0</span>
//           <span>100</span>
//           <span>200</span>
//           <span>300</span>
//           <span>400</span>
//           <span>500+</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center">
//       <GasCard 
//         gasName="Nitrogen Dioxide" 
//         value={430} 
//         category="Hazardous" 
//         markerValue={430} 
//       />
//     </div>
//   );
// }