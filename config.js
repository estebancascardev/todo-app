export const PAGE_URL = process.env.PAGE_URL === "production"
    ? "placeholder"
    : "http://localhost:3200";

export const MONGO_URI = process.env.PAGE_URL === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST