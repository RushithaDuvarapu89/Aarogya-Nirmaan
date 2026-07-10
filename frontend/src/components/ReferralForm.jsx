import { useState } from "react";
import { User, Stethoscope } from "lucide-react";


function ReferralForm() {


    const [patient, setPatient] = useState({

        patientName: "",
        age: "",
        gender: "",
        condition: "",
        severity: "Low",
        currentHospital: ""

    });



    function handleChange(e) {


        setPatient({

            ...patient,

            [e.target.name]:
            e.target.value

        });


    }





    async function handleSubmit(e) {


        e.preventDefault();



        try {


            const response = await fetch(

                "http://localhost:5000/api/referrals",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },


                    body:
                    JSON.stringify(patient)

                }

            );



            const data = await response.json();



            console.log(data);



            if(response.ok){


                alert(
                    "Referral Created Successfully!"
                );


                setPatient({

                    patientName:"",
                    age:"",
                    gender:"",
                    condition:"",
                    severity:"Low",
                    currentHospital:""

                });


            }


            else {


                alert(data.message);

            }



        }

        catch(error){


            console.log(error);


            alert(
                "Server Error"
            );


        }



    }





    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">


            <div className="flex items-center gap-3 mb-6">


                <User
                    className="text-blue-600"
                    size={30}
                />


                <h2 className="text-2xl font-bold">

                    Patient Referral Form

                </h2>


            </div>




            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >



                <input

                    type="text"

                    name="patientName"

                    placeholder="Patient Name"

                    value={patient.patientName}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-3"

                    required

                />




                <input

                    type="number"

                    name="age"

                    placeholder="Age"

                    value={patient.age}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-3"

                    required

                />





                <select

                    name="gender"

                    value={patient.gender}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-3"

                    required

                >

                    <option value="">
                        Select Gender
                    </option>


                    <option>
                        Male
                    </option>


                    <option>
                        Female
                    </option>


                    <option>
                        Other
                    </option>


                </select>





                <input

                    type="text"

                    name="condition"

                    placeholder="Medical Condition"

                    value={patient.condition}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-3"

                    required

                />





                <select

                    name="severity"

                    value={patient.severity}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-3"

                >


                    <option>
                        Low
                    </option>


                    <option>
                        Medium
                    </option>


                    <option>
                        High
                    </option>


                    <option>
                        Critical
                    </option>


                </select>





                <select

                    name="currentHospital"

                    value={patient.currentHospital}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-3"


                >


                    <option value="">
                        Current Hospital (Optional)
                    </option>

                    <option>
                    New Patient / Self Registered
                    </option>

                    <option>
                    Government General Hospital
                    </option>

                    <option>
                    Area Hospital
                    </option>

                    <option>
                    District Hospital
                    </option>


                    </select>






                <button

                    type="submit"

                    className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    rounded-lg
                    p-3
                    font-semibold
                    "

                >


                    <div className="flex justify-center items-center gap-2">


                        <Stethoscope size={20}/>


                        Find Best Hospital


                    </div>


                </button>



            </form>



        </div>


    );


}


export default ReferralForm;