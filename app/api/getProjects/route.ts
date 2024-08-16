import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/projects?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
      { next: { revalidate: 10 } } // 5 mins
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }

    const data = await response.json();
    const [headers, ...rows] = data.values;

    // the headers should define the keys of the object
    const transformedData = rows.map((row: any) => {
      return row.reduce((acc: any, value: any, index: any) => {
        acc[headers[index]] = value; // Use headers to define keys
        return acc;
      }, {});
    });

    console.log(transformedData);
    return NextResponse.json(transformedData);

  } catch (error) {
    console.error("Error fetching alert text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}   