// first, update the count
// then, return the updated count
import { NextResponse } from "next/server";
import { google } from 'googleapis'; // Import sheets_v4 along with google
import { JWT } from 'google-auth-library'; // Import GoogleAuth
import keys from '../../../client_secret.json'; // Import your GoogleAuth keys
import type { NextRequest } from 'next/server'; // Import NextRequest


    export async function POST(req: NextRequest) {
        return addToMailingList(req);
    }

    async function addToMailingList(req: NextRequest) {
        try {
            // Parse the email from the request body
            const { email } = await req.json();
            if (!email || typeof email !== 'string') {
                return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
            }
            console.log("Adding email to mailing list:", email);

            // Configure GoogleAuth client for Google Sheets API
            const client = new JWT({
                email: keys.client_email,
                key: keys.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth: client });

            if (!process.env.SHEET_ID) {
                throw new Error("SHEET_ID environment variable is not set.");
            }

            // Append the email to the first available cell in 'subscribers' sheet column A
            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID,
                range: 'subscribers!A1:A',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values: [[email]] },
            });

            return NextResponse.json({ message: 'Email added successfully' }, { status: 200 });
        } catch (err) {
            console.error("Error adding to mailing list:", err);
            return NextResponse.json({ error: 'Failed to add email to mailing list' }, { status: 500 });
        }
    }

// async function writeEmail(email: string) {
//     // write to google sheets
//     try     
//         const response = await fetch(
//             `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/subscribers?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
//             { next: { revalidate: 0 } } // 5 mins
//         );
    
//         if (!response.ok) {
//             throw new Error("failed to fetch emails");
//         }    
//         const data = await response.json();
//         return data;
//     } catch (error) {
        
// }

// async function getCount() {
//     // fetch from google sheets
//     try {
//         const response = await fetch(
//           `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/visitors?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
//           { next: { revalidate: 0 } } // 5 mins
//         );
    
//         if (!response.ok) {
//           throw new Error("Failed to fetch visitor count");
//         }    
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching visitor count:", error);
//         return 0; // default to 0 in case of error
//     }
// }

// export async function GET(req: NextRequest) { // Change type to NextRequest
//     const url = new URL(req.url || '', `http://${req.headers.get('host')}`); // Use req.headers.get('host') instead of req.headers.host
//     const firstVisit = url.searchParams.get("firstVisit");
//     console.log("firstVisit 3", firstVisit);
//     // if they have visited, just call getCount
//     if (firstVisit === "false") {
//         const count = await getCount();
//         return NextResponse.json({ count: count.values[1][0] });
//     } else {
//         const updatedCount = await updateCount();
//         return NextResponse.json({ count: updatedCount });
//     }
// }