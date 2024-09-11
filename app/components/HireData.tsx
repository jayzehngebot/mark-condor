async function fetchHireData() {
    const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/hire?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
        { next: { revalidate: 300 } } // 5 mins
    );
    const data = await res.json();
    console.log(data);
    // shape the data
    const [headers, ...rows] = data.values;

    // Function to transform the array to a JSON object
    const transformData = (row: any) => {
        return row.reduce((acc: any, value: any, index: any) => {
          acc[headers[index]] = value;
          return acc;
        }, {});
    };

    // Transform the rows into an array of objects
    const transformedData = rows.map(transformData);

    return transformedData;
}

interface Hire {
    id: string;
    packageDescription: string;
    sale_price: string;
    price: string;
    time: string;
}

export default async function HireData() {
    const hireData = await fetchHireData();
    console.log(hireData);
    return (
        <div className="relative w-full sm:w-1/2 lg:w-2/3 xlg:w-2/3 max-w-7xl overflow-x-auto shadow-md sm:rounded-lg sm:m-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-slate-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Package</th>
                        <th scope="col" className="px-6 py-3">Preview</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Time</th>
                        <th scope="col" className="px-6 py-3">Book</th>
                    </tr>
                </thead>
                <tbody>
                    {hireData.map((hire: any, index: number) => (
                        <tr key={hire.id} className="bg-slate-900 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-2 py-3 sm:px-6 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {hire.packageDescription}
                            </th>
                            <td className="px-2 py-3 sm:px-6 sm:py-3">
                                {hire.exampleURL && <a href={hire.exampleURL} target="_blank" rel="noopener noreferrer">Ex. Project</a>}
                            </td>
                            <td className="px-2 py-3 sm:px-6 sm:py-3"><span className="line-through text-gray-500">{hire.price}</span> {hire.sale_price}</td>
                            <td className="px-2 py-3 sm:px-6 sm:py-3">{hire.time}</td>
                            <td className="px-2 py-3 sm:px-6 sm:py-3">
                                <a href={`mailto:booking@example.com?subject=Booking for ${hire.packageDescription}`} className="text-blue-500 hover:text-blue-700">Book</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}