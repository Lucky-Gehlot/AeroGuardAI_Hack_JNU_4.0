import { Flame } from 'lucide-react';
import { CategoryBar } from "@/components/ui/CategoryBar"
function WildfireCard({ probabilityLevel }) {
    return (<div className="w-full  bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center mb-4">
            <Flame className="text-[#FC6400] mr-2" size={48}/>
            <span>
                <h2 className="text-white text-xl font-bold">Wildfire Alert</h2>
                <p className='text-sm'>Real time wildfire probability Analysis</p>
            </span>
        </div>
        <div>
            <span className='text-4xl md:text-5xl  text-white'>{probabilityLevel}%</span>
            <span className='text-xl md:text-2xl  pl-2 text-amber-100'>probability</span>
        </div>

        {/*3.Probability Bar */}
        <div className="pt-4 space-y-3 pb-8">
            <CategoryBar
                //define spacing 
                values={[33,33,34]}
                //This wil take colors from chartUtils.ts
                colors={["emerald", "orange", "rose"]}
                marker={{
                    value: probabilityLevel,
                    tooltip: `${probabilityLevel}% chance of wildfire`,
                    showAnimation: true
                }}

                showLabels={true}
                className="h-2.5"
            />
        </div>
    </div>);
}

export default WildfireCard;