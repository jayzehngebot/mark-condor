import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/alerts?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
      { next: { revalidate: 3000 } } // 5 mins
    );

    if (!response.ok) {
      throw new Error("Failed to fetch alert data");
    }

    const data = await response.json();
    const enabled = data.values[0][1];
    const alert = data.values[1][1];

    return NextResponse.json([enabled, alert]);
  } catch (error) {
    console.error("Error fetching alert text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
