import { useNavigate } from "react-router-dom";

import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";
import EmergencyBanner from "../components/EmergencyBanner";
import StatCard from "../components/StatCard";
import HospitalCard from "../components/HospitalCard";


function Dashboard() {


    const navigate = useNavigate();



    const hospitals = [

        {
            name: "CARE Hospital",
            city: "Hyderabad",
            icu: 4,
            ambulances: 2,
        },

        {
            name: "Apollo Hospital",
            city: "Hyderabad",
            icu: 0,
            ambulances: 3,
        },

        {
            name: "Yashoda Hospital",
            city: "Hyderabad",
            icu: 2,
            ambulances: 1,
        },

    ];



    const stats = [

        {
            title: "Hospitals",
            value: "3",
            color: "bg-blue-600",
            path: "/hospitals"
        },

        {
            title: "ICU Beds",
            value: "6",
            color: "bg-green-600",
            path: "/hospitals"
        },

        {
            title: "Ambulances",
            value: "2",
            color: "bg-yellow-500",
            path: "/ambulances"
        },

        {
            title: "Referrals",
            value: "7",
            color: "bg-red-600",
            path: "/referral"
        },

    ];





    return (

        <div className="bg-gray-100 min-h-screen">


            <Sidebar />



            <div className="ml-64">


                <Header />



                <div className="p-8">


                    <EmergencyBanner />



                    {/* Statistics */}


                    <div className="grid grid-cols-4 gap-6 mt-8">


                        {

                            stats.map((item)=>(


                                <div

                                    key={item.title}

                                    onClick={() =>
                                        navigate(item.path)
                                    }

                                    className="
                                    cursor-pointer
                                    hover:scale-105
                                    transition
                                    "

                                >


                                    <StatCard

                                        title={item.title}

                                        value={item.value}

                                        color={item.color}

                                    />


                                </div>


                            ))

                        }


                    </div>





                    {/* Hospital Status */}


                    <h2 className="text-4xl font-bold mt-12 mb-6">

                        Hospital Status

                    </h2>




                    <div className="grid md:grid-cols-3 gap-6">


                        {

                            hospitals.map((hospital)=>(


                                <HospitalCard

                                    key={hospital.name}

                                    hospital={hospital}

                                />


                            ))

                        }


                    </div>



                </div>


            </div>


        </div>


    );

}


export default Dashboard;