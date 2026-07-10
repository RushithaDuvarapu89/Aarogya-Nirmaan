import {
    UserRoundCheck,
    Brain,
    Send,
    CheckCircle,
    Ambulance,
    Hospital
} from "lucide-react";


function ReferralTimeline() {


    const steps = [

        {
            title: "Patient Registered",
            description: "Patient details submitted for referral",
            icon: <UserRoundCheck size={28}/>,
            status: "completed"
        },

        {
            title: "AI Hospital Selected",
            description: "Best hospital identified based on requirements",
            icon: <Brain size={28}/>,
            status: "completed"
        },

        {
            title: "Referral Sent",
            description: "Referral request sent to recommended hospital",
            icon: <Send size={28}/>,
            status: "completed"
        },

        {
            title: "Hospital Accepted",
            description: "Hospital confirmed patient admission",
            icon: <CheckCircle size={28}/>,
            status: "pending"
        },

        {
            title: "Ambulance Assigned",
            description: "Ambulance tracking started",
            icon: <Ambulance size={28}/>,
            status: "pending"
        },

        {
            title: "Patient Reached Hospital",
            description: "Transfer completed successfully",
            icon: <Hospital size={28}/>,
            status: "pending"
        }

    ];



    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">


            <h2 className="text-2xl font-bold mb-8">

                🚑 Referral Tracking Timeline

            </h2>



            <div className="relative">


                {/* Vertical line */}

                <div className="absolute left-6 top-0 h-full w-1 bg-gray-200">

                </div>



                <div className="space-y-8">


                    {

                        steps.map((step,index)=>(


                            <div
                                key={index}
                                className="flex items-start gap-6 relative"
                            >


                                {/* Icon Circle */}

                                <div

                                    className={`z-10 rounded-full p-3 text-white

                                    ${
                                        step.status === "completed"

                                        ?

                                        "bg-green-500"

                                        :

                                        "bg-gray-400"

                                    }

                                    `}

                                >

                                    {step.icon}

                                </div>



                                {/* Content */}

                                <div>


                                    <h3 className="text-lg font-bold">

                                        {step.title}

                                    </h3>


                                    <p className="text-gray-500">

                                        {step.description}

                                    </p>


                                </div>


                            </div>


                        ))

                    }


                </div>


            </div>


        </div>

    );

}


export default ReferralTimeline;