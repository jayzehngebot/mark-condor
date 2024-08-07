import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/testimony?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
          { next: { revalidate: 300 } } // 5 mins
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch alert data");
        }
    
        const data = await response.json();
        console.log('data from fetch api : ' + data.values);
        const [headers, ...rows] = data.values; 

        const transformTestimonyData = (data: any) => {
            return data.map((row: any) => {
                return {
                    id: row[0],
                    name: row[1],
                    testimony: row[2],
                };
            });
        };
    
        const transformedData = transformTestimonyData(rows);
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error("Error fetching testimony data:", error);
        return NextResponse.json({ error: "Failed to fetch testimony data" }, { status: 500 });
    }
}

