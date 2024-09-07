export function RecentSales() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Recent Sales</h2>
      <ul>
        <li className="flex justify-between mb-3">
          <div>
            <p>Olivia Martin</p>
            <p className="text-sm text-gray-400">olivia.martin@email.com</p>
          </div>
          <span className="font-bold">+$1,999.00</span>
        </li>
      </ul>
    </div>
  );
}
