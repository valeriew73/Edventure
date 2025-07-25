
type UserMetadata = {
    userId: string;
    name?: string;
    email?: string;
    createdAt?: number;
    updatedAt?: number;
    [x: string]: any; // Allow additional properties
}

type SpiderConfig = {
    version: number;
    "listing-sites": {
        url: string;
        type: "scroll" | "pagination" | "single";
        listings: {
            selector: string;
            item: {
                title?: string;
                company?: string;
                location?: string;
                date?: string;
                link: string;
            };
        };
    }[],
    "single-sites": {
        url: string
    }[];
};
