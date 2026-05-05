import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI is missing in .env");

const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4 // Force IPv4 to avoid DNS issues in some environments
});

export const auth = betterAuth({
    database: mongodbAdapter(client.db("ceramica")), 
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    trustedOrigins: ["http://localhost:3000"],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            photoURL: {
                type: "string",
                required: false,
            },
        },
    },
});
