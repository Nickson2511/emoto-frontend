export type Address = {
    _id: string;
    fullName: string;
    phoneNumber: string;
    county: string;
    city: string;
    area: string;
    building?: string;
    landmark?: string;
    isDefault?: boolean;
};