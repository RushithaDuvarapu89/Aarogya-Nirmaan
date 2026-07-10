 function StatCard({ title, value, color }) {
    return (
        <div
            className={`
                ${color}
                rounded-2xl
                p-7
                text-white
                shadow-lg
                hover:shadow-2xl
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
            `}
        >
            <h3 className="text-2xl font-semibold">
                {title}
            </h3>

            <p className="text-6xl font-bold mt-6">
                {value}
            </p>
        </div>
    );
}

export default StatCard;