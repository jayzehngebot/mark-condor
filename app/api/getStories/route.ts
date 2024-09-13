import { NextResponse } from "next/server";

export async function getStories() {
    try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/thoughts?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
          { next: { revalidate: 0 } } // 5 mins
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch thoughts");
        }    
        const data = await response.json();
        const [headers, ...rows] = data.values; 
        // format the data
        const transformData = (headers: string[], rows: any[]) => {
            return rows.map((row: any) => {
                let obj: any = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index];
                });
                return obj;
            }).sort((a, b) => a.priority - b.priority);
        };  


        const transformedData = transformData(headers, rows);
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error("Error fetching thought data:", error);
        return NextResponse.json({ error: "Failed to fetch thought data" }, { status: 500 });
    }
}
