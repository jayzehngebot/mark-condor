import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/koans?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
          { next: { revalidate: 300 } } // 5 mins
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch alert data");
        }
    
        const data = await response.json();
        const [headers, ...rows] = data.values; 
        // format data as json with headers as keys
        const formattedData = rows.map((row: any) => {
            return headers.reduce((obj: any, header: any, index: any) => {
                obj[header] = row[index];
                return obj;
            }, {});
        }); 

        // return data
        return NextResponse.json(formattedData);

    } catch (error) {
        console.error("Error fetching koans:", error);
        return NextResponse.json({ error: "Failed to fetch koans" }, { status: 500 });
    }
}

