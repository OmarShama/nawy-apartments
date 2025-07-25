import axios from "axios";
import { FetchParams } from "@/types/fetchParams";
import { buildQueryParams } from "@/utils/queryParams";
import { ApartmentCreateForm } from "@/types/apartmentCreateForm";

const apiUrl = process.env.API_URL || "http://localhost:3005";

// Listing Apartments API call
export const getApartments = async (params: FetchParams = {}) => {
    const query = buildQueryParams(params);

    const res = await axios.get(`${apiUrl}/apartments${query}`);
    return res.data;
};

// Apartment Details API call
export const getApartmentById = async (id: number) => {
    console.log('here', id);
    const res = await axios.get(`${apiUrl}/apartments/${id}`);
    return res.data;
};

// Create Apartment API call
export const createApartment = async (form: ApartmentCreateForm) => {

    const formData = new FormData();

    // Handle arrays in form-data
    Object.entries(form).forEach(([key, value]) => {
        if (key === 'images') {
            (value as File[]).forEach((file) => {
                formData.append('images', file);
            });
        } else if (key === 'amenities') {
            (value as string[]).forEach((a) => formData.append('amenities', a));
        } else {
            formData.append(key, String(value));
        }
    });

    const res = await fetch(`${apiUrl}/apartments`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) {
        const data = await res.json();
        console.log(data.message)
        throw new Error(data.message);
    }
    return await res.json();
};
