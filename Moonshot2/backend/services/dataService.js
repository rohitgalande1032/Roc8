import { getDataset } from "../dataPipeline.js";

export const getFilteredDataset = async ({ age, gender, startDate, endDate }) => {
    let data = await getDataset();

    if (age) {
        data = data.filter(item => item.age === age);
    }

    if (gender) {
        data = data.filter(item => item.gender === gender);
    }

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        data = data.filter(item => {
            const itemDate = new Date(item.day);
            return itemDate >= start && itemDate <= end;
        });
    }

    return data;
};
