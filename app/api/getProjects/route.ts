import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/projects?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
      { cache: 'no-store' } // Correctly place the cache option
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

    // Set revalidation header on the response you return
    const nextResponse = NextResponse.json(transformedData);
    nextResponse.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return nextResponse;

  } catch (error) {
    console.error("Error fetching alert text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}