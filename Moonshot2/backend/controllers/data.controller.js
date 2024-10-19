import { getFilteredDataset } from "../services/dataService.js";

export const fetchData = async (req, res) => {
    console.log("Fetching data with filters:", req.query); 
    try {
        const { age, gender, startDate, endDate } = req.query;
        const data = await getFilteredDataset({ age, gender, startDate, endDate });
        res.json(data);
    } catch (error) {
        console.error("Error fetching filtered data:", error);
        res.status(500).send('Internal Server Error');
    }
};

