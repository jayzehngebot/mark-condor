// first, update the count
// then, return the updated count
import { NextResponse } from "next/server";
import { GoogleAuth } from 'google-auth-library';

async function updateCount() {
    // get current count, add one
    // console.log("updating count");
    const currentCount = await getCount();
    console.log("currentCount", currentCount.values[1][0]);
    const updatedCount = parseInt(currentCount.values[1][0]) + 1;

    // now I want to update the count in the same cell we use to write the updated count
    try {
        const auth = new GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        const updateResponse = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/visitors!A2:updated?valueInputOption=RAW`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    values: [[updatedCount.toString()]],
                }),
            }
        );
        console.log("Update response status:", updateResponse.status);
        console.log("Update response body:", await updateResponse.text());
        if (!updateResponse.ok) {
            throw new Error("Failed to update visitor count");
        }
    } catch (error) {
        console.error("Error updating visitor count:", error);
        throw error;
    }

    // call google sheets api to update count
    // put updatedCount into the same cell we use to write the updated count
    // const updateResponse = await fetch(
    //     `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/visitors!A2?valueInputOption=RAW&key=${process.env.GOOGLE_SHEETS_API_KEY}`,
    //     {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             values: [[updatedCount]],
    //         }),
    //     }
    // );
    return updatedCount;

    // if (updateResponse.ok) {
    //     return updatedCount;
    // } else {
    //     throw new Error("Failed to update visitor count");
     
    // }
}

async function getCount() {
    // fetch from google sheets
    console.log("fetching count");
    try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/visitors?key=${process.env.GOOGLE_SHEETS_API_KEY}`,
          { next: { revalidate: 0 } } // 5 mins
        );
    
        if (!response.ok) {
          throw new Error("Failed to fetch visitor count");
        }    
        const data = await response.json();
        console.log("count", data);
        return data;
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        return 0; // default to 0 in case of error
    }
}

export async function GET() {
    console.log("Calling updateCount");
    const updatedCount = await updateCount();
    console.log("Updated count received:", updatedCount);
    return NextResponse.json({ count: updatedCount });
}