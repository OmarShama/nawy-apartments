import { z } from 'zod';

export const apartmentSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(1, { message: 'Name cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Name must contain only letters' }),

    title: z
        .string({ required_error: 'Title is required' })
        .min(1, { message: 'Title cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Title must contain only letters' }),

    description: z
        .string({ required_error: 'Description is required' })
        .min(1, { message: 'Description cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Description must contain only letters' }),

    unitNumber: z
        .string({ required_error: 'Unit number is required' })
        .min(1, { message: 'Unit number cannot be empty' })
        .regex(/^[A-Za-z0-9-]+$/, { message: 'Only letters, numbers, and dashes allowed' }),

    price: z.coerce
        .number({ invalid_type_error: 'Price must be a number' })
        .positive({ message: 'Price must be greater than 0' }),

    size: z.coerce
        .number({ invalid_type_error: 'Size must be a number' })
        .positive({ message: 'Size must be greater than 0' }),

    bedroomsCount: z.coerce
        .number({ invalid_type_error: 'Bedrooms count must be a number' })
        .positive({ message: 'Bedrooms count must be greater than 0' }),

    bathroomsCount: z.coerce
        .number({ invalid_type_error: 'Bathrooms count must be a number' })
        .positive({ message: 'Bathrooms count must be greater than 0' }),

    address: z
        .string({ required_error: 'Address is required' })
        .min(1, { message: 'Address cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Address must contain only letters' }),

    city: z
        .string({ required_error: 'City is required' })
        .min(1, { message: 'City cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'City must contain only letters' }),

    country: z
        .string({ required_error: 'Country is required' })
        .min(1, { message: 'Country cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Country must contain only letters' }),

    project: z
        .string({ required_error: 'Project name is required' })
        .min(1, { message: 'Project cannot be empty' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Project must contain only letters' }),

    amenities: z
        .array(z.string().regex(/^[A-Za-z\s]+$/, { message: 'Each amenity must contain only letters' }))
        .optional(),

    longitude: z
        .string()
        .regex(/^(-?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?)$/, { message: 'Longitude must be between -180 and 180' })
        .optional()
        .or(z.literal('')),

    latitude: z
        .string()
        .regex(/^(-?([1-8]?\d(\.\d+)?|90(\.0+)?))$/, { message: 'Latitude must be between -90 and 90' })
        .optional()
        .or(z.literal('')),

    images: z.any().optional(),
});
