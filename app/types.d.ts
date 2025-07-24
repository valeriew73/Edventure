
type UserMetadata = {
    userId: string;
    name?: string;
    email?: string;
    createdAt?: number;
    updatedAt?: number;
    [x: string]: any; // Allow additional properties
}
