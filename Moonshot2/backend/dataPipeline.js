import { google } from 'googleapis';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sheets = google.sheets('v4');
let dataset = [];

const auth = new google.auth.GoogleAuth({
    keyFile: join(__dirname, 'service-account.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Function to load data from Google Sheets
async function loadData(spreadsheetId, range) {
    const client = await auth.getClient();
    const request = {
        spreadsheetId: spreadsheetId,
        range: range,
        auth: client,
    };

    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values;

    // Validate rows and ensure we have data
    if (!rows || rows.length < 2) {
        console.error("No data found in the specified range.");
        return;
    }

    // Map rows to the expected dataset format
    dataset = rows.slice(1).map(row => {
        if (row.length < 9) { 
            console.error('Row is missing columns:', row);
            return null; 
        }
        
        const [day, age, gender, A, B, C, D, E, F] = row;
        
        // Parse the day into a valid date format
        const [dayNum, month, year] = day.split('/');
        const formattedDate = new Date(`${year}-${month}-${dayNum}`).toISOString(); 

        return {
            day: formattedDate,
            age: age,
            gender: gender,
            features: {
                A: parseInt(A) || 0,
                B: parseInt(B) || 0,
                C: parseInt(C) || 0,
                D: parseInt(D) || 0,
                E: parseInt(E) || 0,
                F: parseInt(F) || 0,
            },
        };
    }).filter(item => item !== null); 
    console.log("Loaded Data:", dataset);
}

// Function to get the dataset
async function getDataset() {
    if (dataset.length === 0) {
        throw new Error("Dataset is not loaded");
    }
    return dataset;
}

export { loadData, getDataset };
