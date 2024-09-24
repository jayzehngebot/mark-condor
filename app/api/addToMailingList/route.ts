
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
