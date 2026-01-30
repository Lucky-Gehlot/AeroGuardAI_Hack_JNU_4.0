import React from "react";
import Header from "./Header";
import AqiCard from "./AqiCard.jsx";
import GasCard from "./GasCard.jsx";
import WildfireCard from "./WildfireCard.jsx";
import AIhealthadvisioryCard from "./AIhealthadvisioryCard.jsx";
import LocationMapCard from "./LocationMapCard.jsx";


// gasName, value, category

function Home() {
    return (
        // <div>

        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        //         <Header/>
        //         <div className="py-4 sm:col-span-2"><AqiCard/></div>

        //         <div className="py-4"><GasCard gasName="Nitrogen Dioxide" value={430} category="Hazardous"/></div>
        //         <div className="py-4"><GasCard gasName="Carbon Monoxide" value={120} category="Moderate"/></div>
        //         <div className="py-4"><GasCard gasName="Ozone" value={85} category="Good"/></div>
        //         <div className="py-4"><GasCard gasName="Sulfur Dioxide" value={250} category="Hazardous"/></div>
        //         <div className="py-4"><WildfireCard probabilityLevel={75}/></div>
        //         <div className="py-4"><AIhealthadvisioryCard/></div>
        //         <div className="py-4"><LocationMapCard/></div>
        //     </div>
        // </div>

        <div>
            {/* Header usually stays full width at the top */}
            <Header />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 items-stretch">

                {/* Row 1: Left Side - AQI Card */}
                {/*after xs every time my aqi card will take 2 column space */}

                <div className="sm:col-span-2 order-1 flex flex-col">
                    <AqiCard className="h-full flex-1" />
                </div>

                {/* Row 1: Right Side - AI Advisory */}
                <div className="sm:col-span-2 order-2 lg:order-3">
                    <AIhealthadvisioryCard className="h-full" />
                </div>


                {/* Row 2: Map Card (Spans 3 columns on desktop for wide view) */}
                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 order-3 lg:order-5">
                    <LocationMapCard />
                </div>

                {/* Row 2: Wildfire Card (Stands next to Map on desktop) */}
                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 order-4 lg:order-6">
                    <WildfireCard probabilityLevel={75} className="h-full" />
                </div>

                {/* Row 3: Gas Cards in a uniform row */}
                <div className="flex flex-col gap-4 order-5 sm:flex-row lg:flex-col sm:col-span-2 lg:col-span-1 xl:col-span-2 lg:order-2 h-full">
                    {/* Use flex-1 so each card takes exactly 50% of the AqiCard's height */}
                    <div className="flex-1">
                        <GasCard gasName="Nitrogen Dioxide" value={430} category="Hazardous" className="h-full" />
                    </div>
                    <div className="flex-1">
                        <GasCard gasName="Carbon Monoxide" value={120} category="Moderate" className="h-full" />
                    </div>
                </div>

                <div className="flex flex-col gap-4 order-6 sm:flex-row sm:gap-4 sm:col-span-2 lg:col-span-1 xl:col-span-2 lg:order-4 lg:flex-col">
                    <div className="grow"><GasCard gasName="Ozone" value={85} category="Good" /></div>
                    <div className="grow"><GasCard gasName="Sulfur Dioxide" value={250} category="Hazardous" /></div>
                </div>

            </div>
        </div>
    )
}

export default Home;