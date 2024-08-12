import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/projects?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
      { next: { revalidate: 300 } } // 5 mins
    );

    if (!response.ok) {
      throw new Error("Failed to fetch alert data");
    }

    const data = await response.json();
    const [headers, ...rows] = data.values;

    // Function to transform the array to a JSON object
    const transformData = (row: any) => {
      return row.reduce((acc: any, value: any, index: any) => {
        return acc;
      }, {});
    };

    // Transform the rows into an array of objects
    const transformedData = rows.map(transformData);

    console.log(transformedData);
    return NextResponse.json(transformedData);
    // return NextResponse.json([enabled, alert]);
  } catch (error) {
    console.error("Error fetching alert text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}   