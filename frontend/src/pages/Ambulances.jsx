import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";

import {
    Ambulance,
    MapPin,
    Clock
} from "lucide-react";



function Ambulances(){



    const [ambulances,setAmbulances] = useState([]);




    async function fetchAmbulances(){


        try{


            const response = await fetch(

                "http://localhost:5000/api/ambulances"

            );


            const data = await response.json();


            setAmbulances(data);



        }

        catch(error){


            console.log(
                "Error fetching ambulances",
                error
            );


        }


    }





    useEffect(()=>{


        fetchAmbulances();


    },[]);






    return(


        <div className="bg-gray-100 min-h-screen">


            <Sidebar />



            <div className="ml-64">


                <Header />



                <div className="p-8">


                    <h1 className="text-4xl font-bold mb-8">

                        🚑 Ambulance Availability

                    </h1>




                    <div className="grid md:grid-cols-3 gap-6">



                    {

                    ambulances.length===0 ?


                    (

                        <p className="text-gray-500">

                            No ambulances available

                        </p>

                    )


                    :



                    ambulances.map((item)=>(


                        <div

                            key={item._id}

                            className="
                            bg-white
                            rounded-2xl
                            shadow-lg
                            p-6
                            "

                        >



                            <Ambulance

                                size={40}

                                className="text-red-600"

                            />



                            <h2 className="text-2xl font-bold mt-4">

                                {item.vehicleNumber}

                            </h2>



                            <p className="flex gap-2 mt-3 text-gray-600">


                                <MapPin size={18}/>


                                {item.location}


                            </p>





                            <p className="flex gap-2 mt-3 text-gray-600">


                                <Clock size={18}/>


                                {item.type}


                            </p>





                            <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full">

                                {item.status}

                            </span>



                        </div>



                    ))


                    }



                    </div>



                </div>


            </div>


        </div>


    );


}


export default Ambulances;