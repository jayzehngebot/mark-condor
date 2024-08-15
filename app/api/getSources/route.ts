import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/sources?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
      { next: { revalidate: 30 } } // 10 sec
    );

    if (!response.ok) {
      throw new Error("Failed to fetch source data");
    }

    const data = await response.json();
    const [headers, ...rows] = data.values;

    // Function to transform the array to a JSON object
    const transformData = (row: any) => {
      return row.reduce((acc: any, value: any, index: any) => {
        if (value === "TRUE") {
          acc[headers[index]] = true;
        } else if (value === "FALSE") {
          acc[headers[index]] = false;
        } else {
          acc[headers[index]] = value;
        }
        return acc;
      }, {});
    };

    // Transform the rows into an array of objects
    const transformedData = rows.map(transformData);
    return NextResponse.json(transformedData);

  } catch (error) {
    console.error("Error fetching alert text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}  