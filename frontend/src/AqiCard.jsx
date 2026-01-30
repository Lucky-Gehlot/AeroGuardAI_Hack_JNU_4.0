import { useEffect } from "react";
import { Card, CardContent, CardFooter, CardTitle, CardHeader, CardDescription } from "./components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBar } from "@/components/ui/CategoryBar"
import { User, Wind, Activity } from 'lucide-react';

function AqiCard() {


    // const [aqiData, setAqiData] = useState({ value: 68, pm25: 12.5, pm10: 45 });

    // //set the connection 
    // useEffect(() => {

    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://your-api-url/aqi");
    //             const data = await response.json();
    //             setAqiData(data);
    //         } catch (error) {
    //             console.error("Error fetching sensor data:", error);
    //         }
    //     };

    //     fetchData(); //once called 

    //     //Then i want to fetch data in every 5 seconds 
    //     const interval = setInterval(fetchData, 5000);

    //     return () => clearInterval(interval);
    // }, []);


    // //Dynamic logic 
    // //i can set the props of card i will make a function this function will change values , according to those values i will display props in my card 
    // const getAqiConfig = (value) => {

    //     if (value <= 50) return {
    //         label: "Good", color: "emerald", img: "/happy.png", theme: "bg-emerald-500/10"
    //     };

    //     if (value <= 100) return {
    //         label: "Moderate", color: "yellow", img: "/neutral.png", theme: "bg-yellow-500/10"
    //     };

    //     if (value <= 150) return {
    //         label: "Poor", color: "orange", img: "/neutral.png", theme: "bg-yellow-500/10"
    //     };

    //     if (value <= 200) return {
    //         label: "Unhealthy", color: "dark-orange", img: "/neutral.png", theme: "bg-yellow-500/10"
    //     };

    //     if (value <= 300) return {
    //         label: "Severe", color: "purple", img: "/neutral.png", theme: "bg-yellow-500/10"
    //     };

    //     return {
    //         label: "Hazardous", color: "red", img: "/mask.png", theme: "bg-red-500/10"
    //     };
    // }

    // const config = getAqiConfig(aqiData.value);

    //dummy data to show frontend 
    const category = { color: 'red', label: 'danger' };
    const data = { value: 250, pm25: 12.5, pm10: 45 };

    return (
        <Card className="w-full  bg-slate-900 border-slate-800 text-white overflow-hidden shadow-2xl h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-black tracking-tighter text-indigo-500">
                        AIR QUALITY INDEX
                    </CardTitle>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE AQI FEED
                    </p>
                </div>
                <Badge className={`bg-${category.color}-500/10 text-${category.color}-400 border-${category.color}-500/20 px-4 py-1.5 rounded-xl`}>
                    {category.label}
                </Badge>
            </CardHeader>

            <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center justify-between">
                    <div className="space-y-6">
                        <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800 text-center">
                            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AQI VALUE</span>
                            <span className={`text-4xl md:text-5xl font-black text-${category.color}-500`}>{data.value}</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm px-2">
                                <span className="text-slate-500 flex items-center gap-2"><Wind size={14} /> PM-2.5</span>
                                <span className="font-mono font-bold">{data.pm25}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm px-2">
                                <span className="text-slate-500 flex items-center gap-2"><Activity size={14} /> PM-10</span>
                                <span className="font-mono font-bold">{data.pm10}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center "> {/* Fixed quote here */}
                        <div className=" rounded-full bg-white-800 border-4 border-slate-800 flex items-center justify-center overflow-hidden">
                            {/* Fixed comment and template literal below */}
                            <img src="/assets/hazardous_person.svg" alt="no" className=""/>
                        </div>
                        <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase">Health Recommendation</p>
                    </div>
                </div>

                <div className="mt-10 space-y-3 pb-8">
                    
                    <CategoryBar
                        //define spacing 
                        values={[50, 50, 100, 100, 100, 100]}
                        //This wil take colors from chartUtils.ts
                        colors={["emerald", "yellow", "orange", "red", "purple", "rose"]}
                        marker={{
                            value: data.value,
                            tooltip:`Current AQI: ${data.value}`,
                            showAnimation:true
                        }}

                        showLabels={true}
                        className="h-2.5"
                    />
                </div>
            </CardContent> {/* This is the only CardContent closer you need */}
        </Card>
    );
};

export default AqiCard;