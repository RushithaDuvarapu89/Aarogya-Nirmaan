import { useEffect, useState } from "react";

import {
    History,
    CheckCircle,
    Clock,
    Truck
} from "lucide-react";



function ReferralHistory() {


    const [referrals, setReferrals] = useState([]);



    async function fetchReferrals(){


        try{


            const response = await fetch(

                "http://localhost:5000/api/referrals"

            );


            const data = await response.json();


            setReferrals(data);



        }

        catch(error){


            console.log(
                "Error fetching referrals",
                error
            );


        }


    }





    useEffect(()=>{


        fetchReferrals();


    },[]);







    function getStatus(status){



        if(status==="Accepted"){


            return (

                <span className="flex items-center gap-2 text-green-600 font-semibold">

                    <CheckCircle size={18}/>

                    Accepted

                </span>

            );


        }



        if(status==="Pending"){


            return (

                <span className="flex items-center gap-2 text-yellow-600 font-semibold">

                    <Clock size={18}/>

                    Pending

                </span>

            );


        }



        return (

            <span className="flex items-center gap-2 text-blue-600 font-semibold">

                <Truck size={18}/>

                {status}

            </span>

        );


    }







    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">



            <div className="flex items-center gap-3 mb-6">


                <History
                    size={30}
                    className="text-purple-600"
                />


                <h2 className="text-2xl font-bold">

                    Referral History

                </h2>


            </div>





            <div className="overflow-x-auto">


                <table className="w-full">


                    <thead>


                        <tr className="border-b text-left">


                            <th className="p-3">
                                Patient
                            </th>


                            <th className="p-3">
                                Condition
                            </th>


                            <th className="p-3">
                                Hospital
                            </th>


                            <th className="p-3">
                                Status
                            </th>


                            <th className="p-3">
                                Date
                            </th>


                        </tr>


                    </thead>





                    <tbody>



                    {

                        referrals.length === 0 ? (


                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center p-5 text-gray-500"
                                >

                                    No referrals found

                                </td>

                            </tr>


                        )

                        :

                        (


                        referrals.map((item)=>(


                            <tr

                                key={item.id}

                                className="border-b hover:bg-gray-50"

                            >


                                <td className="p-3 font-semibold">

                                    {item.patientName}

                                </td>


                                <td className="p-3">

                                    {item.condition}

                                </td>


                                <td className="p-3">

                                    {item.recommendedHospital}

                                </td>


                                <td className="p-3">

                                    {getStatus(item.status)}

                                </td>


                                <td className="p-3">

                                    {
                                        new Date(
                                            item.createdAt
                                        ).toLocaleDateString()
                                    }

                                </td>


                            </tr>


                        ))

                        )


                    }


                    </tbody>


                </table>


            </div>



        </div>

    );

}


export default ReferralHistory;