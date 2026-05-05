import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const GET = async (req) => {
    try {
        return await handler.GET(req);
    } catch (err) {
        console.error("Auth API GET Error:", err);
        throw err;
    }
};

export const POST = async (req) => {
    try {
        return await handler.POST(req);
    } catch (err) {
        console.error("Auth API POST Error:", err);
        throw err;
    }
};
