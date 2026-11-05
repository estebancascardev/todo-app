export const PAGE_URL = process.env.PAGE_URL === "production"
    ? "https://todo-list-app-zrz0.onrender.com"
    : "http://localhost:3200";

export const MONGO_URI = process.env.PAGE_URL === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST