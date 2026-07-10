 import { useState, useEffect } from "react";

import {
    SquarePen,
    User,
    HeartPulse,
    Flag,
    Save,
    X,
    ShieldPlus,
    Wind,
    Cross,
} from "lucide-react";

function EditReferralModal({

    referral,

    onClose,

    onSave,

}) {

    const [formData, setFormData] = useState(referral);

    useEffect(() => {

        setFormData(referral);

    }, [referral]);

    if (!referral) return null;

    function handleChange(event) {

        const {

            name,

            value,

            type,

            checked,

        } = event.target;

        setFormData({

            ...formData,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        });

    }

    function handleSubmit() {

        onSave(formData);

    }

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[550px]">

                <div className="flex items-center justify-between border-b p-6">

                    <div className="flex items-center gap-3">

                        <SquarePen
                            className="text-blue-600"
                            size={28}
                        />

                        <h2 className="text-2xl font-bold">

                            Edit Referral

                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600"
                    >

                        <X size={24} />

                    </button>

                </div>

                <div className="p-6 space-y-5">

                    <div>

                        <label className="font-semibold flex items-center gap-2 mb-2">

                            <User
                                size={18}
                                className="text-blue-600"
                            />

                            Patient Name

                        </label>

                        <input
                            className="border rounded-lg w-full p-3"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label className="font-semibold mb-2 block">

                            Age

                        </label>

                        <input
                            type="number"
                            className="border rounded-lg w-full p-3"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label className="font-semibold flex items-center gap-2 mb-2">

                            <HeartPulse
                                size={18}
                                className="text-red-600"
                            />

                            Condition

                        </label>

                        <input
                            className="border rounded-lg w-full p-3"
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label className="font-semibold flex items-center gap-2 mb-2">

                            <Flag
                                size={18}
                                className="text-orange-500"
                            />

                            Priority

                        </label>

                        <select
                            className="border rounded-lg w-full p-3"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >

                            <option>Critical</option>

                            <option>High</option>

                            <option>Medium</option>

                        </select>

                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2">

                        <label className="flex items-center gap-2">

                            <ShieldPlus
                                size={18}
                                className="text-green-600"
                            />

                            <input
                                type="checkbox"
                                name="needICU"
                                checked={formData.needICU}
                                onChange={handleChange}
                            />

                            ICU

                        </label>

                        <label className="flex items-center gap-2">

                            <Wind
                                size={18}
                                className="text-blue-600"
                            />

                            <input
                                type="checkbox"
                                name="needVentilator"
                                checked={formData.needVentilator}
                                onChange={handleChange}
                            />

                            Ventilator

                        </label>

                        <label className="flex items-center gap-2">

                            <Cross
                                size={18}
                                className="text-red-600"
                            />

                            <input
                                type="checkbox"
                                name="needTrauma"
                                checked={formData.needTrauma}
                                onChange={handleChange}
                            />

                            Trauma

                        </label>

                    </div>

                </div>

                <div className="border-t p-6 flex justify-end gap-4">

                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-5 py-3 rounded-lg border hover:bg-gray-100"
                    >

                        <X size={18} />

                        Cancel

                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                    >

                        <Save size={18} />

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditReferralModal;