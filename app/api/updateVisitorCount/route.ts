// first, update the count
// then, return the updated count
import { NextResponse } from "next/server";
import { google, sheets_v4 } from 'googleapis'; // Import sheets_v4 along with google
import { JWT } from 'google-auth-library'; // Import GoogleAuth
import keys from '../../../client_secret.json'; // Import your GoogleAuth keys
import type { NextRequest } from 'next/server'; // Import NextRequest

async function updateCount() {
    const currentCount = await getCount();
    const updatedCount = parseInt(currentCount.values[1][0]) + 1;

    // Configure GoogleAuth client for Google Sheets API
    const client = new JWT({
        email: keys.client_email,
        key: keys.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: client });

    try {
        if (!process.env.SHEET_ID) {
            throw new Error("SHEET_ID environment variable is not set.");
        }

        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.SHEET_ID,
            range: 'visitors!A2',
            valueInputOption: 'RAW',
            requestBody: { values: [[updatedCount.toString()]] }, // Change 'resource' to 'requestBody'
        }) as sheets_v4.Schema$UpdateValuesResponse; // Ensure type is correctly asserted

        return updatedCount;
    } catch (err) {
        console.error("Error updating visitor count:", err);
        throw err; // Rethrowing the error is fine, but ensure upstream handlers are prepared
    }
}

async function getCount() {
    // fetch from google sheets
    try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/visitors?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
          { next: { revalidate: 0 } } // 5 mins
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch visitor count");
        }    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        return 0; // default to 0 in case of error
    }
}

export async function GET(req: NextRequest) { // Change type to NextRequest
    const url = new URL(req.url || '', `http://${req.headers.get('host')}`); // Use req.headers.get('host') instead of req.headers.host
    const hasVisited = url.searchParams.get("hasVisited");
    // if they have visited, just call getCount
    if (hasVisited === "true") {
        const count = await getCount();
        return NextResponse.json({ count: count.values[1][0] });
    } else {
        const updatedCount = await updateCount();
        return NextResponse.json({ count: updatedCount });
    }
}