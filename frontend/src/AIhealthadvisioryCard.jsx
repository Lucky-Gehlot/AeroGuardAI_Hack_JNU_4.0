// function AIhealthadvisioryCard() {
//     return ( <div className="w-full  bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
//         AIhealthadvisioryCard
//         </div> );
// }

// export default AIhealthadvisioryCard;

// AdvisoryCard.tsx
import Lottie from "lottie-react";
import AIChatbot from "./components/animations/AIChatbot.json"; // Placeholder for Lottie file

export default function AIhealthadvisioryCard({ message, quality })     {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
      {/* 1. Header: Badge-style title */}
      <h2 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xl ">
        AI Health Advisory
      </h2>

      {/* 2. Chatbot Animation Container */}
      <div className="max-w-xs">
        <Lottie animationData={AIChatbot} loop={true} />
      </div>

      {/* 3. Advice Message */}
      <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 mb-8 w-full">
        <p className="text-slate-700 dark:text-slate-300 text-center leading-relaxed italic">
          {"Hello there! Based on today's air quality, it's advisable to limit outdoor activities, especially for individuals with respiratory conditions. Consider using air purifiers indoors and wearing masks if you need to go outside. Stay safe!"}
        </p>
      </div>

      {/* 4. Footer: Expected Air Quality Today */}
      <div className="flex justify-between items-center w-full px-2">
        <p className="text-sm font-semibold text-slate-200 uppercase">
          Expected Air Quality Today
        </p>
        <span className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white ${quality === 'Good' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
          {"Very Bad"}
        </span>
      </div>
    </div>
  );
};