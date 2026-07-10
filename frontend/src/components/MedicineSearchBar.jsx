import {
    Search,
    Building2,
    Filter,
    ArrowUpDown,
} from "lucide-react";

function MedicineSearchBar({

    search,
    setSearch,

    hospital,
    setHospital,

    stock,
    setStock,

    sort,
    setSort,

    hospitals,

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

            <div className="grid grid-cols-4 gap-5">

                {/* Search */}

                <div className="relative">

                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                    />

                    <input

                        type="text"

                        placeholder="Search Medicine..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        className="w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                    />

                </div>

                {/* Hospital */}

                <div className="relative">

                    <Building2
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                    />

                    <select

                        value={hospital}

                        onChange={(e) =>
                            setHospital(e.target.value)
                        }

                        className="w-full border rounded-xl pl-10 pr-4 py-3 appearance-none focus:ring-2 focus:ring-blue-500 outline-none"

                    >

                        <option value="">
                            All Hospitals
                        </option>

                        {

                            hospitals.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >

                                    {item}

                                </option>

                            ))

                        }

                    </select>

                </div>

                {/* Stock */}

                <div className="relative">

                    <Filter
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                    />

                    <select

                        value={stock}

                        onChange={(e) =>
                            setStock(e.target.value)
                        }

                        className="w-full border rounded-xl pl-10 pr-4 py-3 appearance-none focus:ring-2 focus:ring-blue-500 outline-none"

                    >

                        <option value="">
                            All Stock
                        </option>

                        <option value="available">
                            Available
                        </option>

                        <option value="low">
                            Low Stock
                        </option>

                        <option value="out">
                            Out of Stock
                        </option>

                    </select>

                </div>

                {/* Sort */}

                <div className="relative">

                    <ArrowUpDown
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                    />

                    <select

                        value={sort}

                        onChange={(e) =>
                            setSort(e.target.value)
                        }

                        className="w-full border rounded-xl pl-10 pr-4 py-3 appearance-none focus:ring-2 focus:ring-blue-500 outline-none"

                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="name">
                            Medicine Name
                        </option>

                        <option value="quantity">
                            Quantity
                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

}

export default MedicineSearchBar;