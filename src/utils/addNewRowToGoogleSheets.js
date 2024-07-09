import { JWT } from "google-auth-library";
import sheets from "@googleapis/sheets";

// Configure the Google Sheets client
const privateKey = process.env.GOOGLESHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

const auth = new JWT({
  email: process.env.GOOGLESHEETS_CLIENT_EMAIL,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheetsClient = sheets?.sheets({ version: "v4", auth });

export const addNewRowToGoogleSheets = async (SSAEvents) => {
  console.log("🚀 ~ file: addNewRowToGoogleSheets.js:16 ~ SSAEvents:", SSAEvents);
  try {
    // Only execute this function if we have GOOGLESHEETS_SHEET_ID in the environment variables.
    if (!process.env.GOOGLESHEETS_SHEET_ID) return;

    const data = [];
    for (const row of SSAEvents) {
      const { identityId, displayName, event, urlSlug } = row;

      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0];
      const formattedTime = now.toISOString().split("T")[1].split(".")[0];

      const dataRowToBeInsertedInGoogleSheets = [
        formattedDate,
        formattedTime,
        identityId,
        displayName,
        "Wiggle",
        event,
        urlSlug,
      ];
      data.push(dataRowToBeInsertedInGoogleSheets);
    }

    await sheetsClient.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLESHEETS_SHEET_ID,
      range: process.env.GOOGLESHEETS_SHEET_RANGE || "Sheet1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [...data],
      },
    });
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};
