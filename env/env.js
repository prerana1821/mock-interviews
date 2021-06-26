export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://mock-interviews.vercel.app/";
