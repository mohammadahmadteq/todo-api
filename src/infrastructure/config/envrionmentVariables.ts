import "dotenv/config";

export const apiVersion = process.env.API_VERSION;
export const secret: string | undefined = process.env.SECRET;
export const apiPort = process.env.API_PORT;

