// Componente Card que agora aceita props
// eslint-disable-next-line react/prop-types
export function Card({ title, value, percentage, percentageColor }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-400">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
            <p className={`text-sm ${percentageColor}`}>{percentage} from last month</p>
        </div>
    );
}
