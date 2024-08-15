import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/thoughts?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
          { next: { revalidate: 30 } } // 5 mins
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch thoughts");
        }    
        const data = await response.json();
        const [headers, ...rows] = data.values; 
        // format the data
        const transformData = (row: any) => {
            return row.map((row: any) => ({
                id: row[0],
                title: row[1],
                subhead: row[2],
                image: row[3],
                text: row[4]
            }));
        };

        const transformedData = transformData(rows);
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error("Error fetching thought data:", error);
        return NextResponse.json({ error: "Failed to fetch thought data" }, { status: 500 });
    }
}