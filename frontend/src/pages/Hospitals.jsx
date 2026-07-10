import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";

import {
    Hospital,
    Bed,
    Ambulance,
    MapPin
} from "lucide-react";


function Hospitals() {


    const [hospitals, setHospitals] = useState([]);



    async function fetchHospitals(){


        try{


            const response = await fetch(

                "http://localhost:5000/api/hospitals"

            );


            const data = await response.json();

              console.log("Hospital Data:", data);
              console.log("Length:", data.length);

              setHospitals(data);



        }

        catch(error){


            console.log(
                "Error fetching hospitals",
                error
            );


        }


    }




    useEffect(()=>{


        fetchHospitals();


    },[]);






console.log("Hospitals State:", hospitals);
    return (

        <div className="bg-gray-100 min-h-screen">


            <Sidebar />



            <div className="ml-64">


                <Header />



                <div className="p-8">


                    <h1 className="text-4xl font-bold mb-8">

                        🏥 Available Hospitals

                    </h1>





                    <div className="grid md:grid-cols-2 gap-6">


                    {


                    hospitals.length===0 ?


                    (

                        <p className="text-gray-500">

                            No hospitals available

                        </p>

                    )


                    :


                    hospitals.map((hospital)=>(



                        <div

                            key={hospital.id}

                            className="
                            bg-white
                            rounded-2xl
                            shadow-lg
                            p-6
                            "

                        >



                            <div className="flex items-center gap-3">


                                <Hospital

                                    size={35}

                                    className="text-blue-600"

                                />



                                <h2 className="text-2xl font-bold">

                                    {hospital.name}

                                </h2>


                            </div>





                            <div className="mt-5 space-y-3">



                                <p className="flex gap-2 text-gray-600">


                                    <MapPin size={20}/>


                                    {hospital.city}


                                </p>





                                <p className="flex gap-2 text-gray-600">


                                    <Bed size={20}/>


                                    ICU Beds:

                                    {hospital.icuBeds}


                                </p>





                                <p className="flex gap-2 text-gray-600">

                                    <Ambulance size={20}/>

                                    Ambulances:

                                    {hospital.ambulance}

                                </p>



                            </div>




                        </div>



                    ))


                    }


                    </div>



                </div>


            </div>


        </div>

    );

}


export default Hospitals;