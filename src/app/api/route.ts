import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url)

        const email = searchParams.get("email");

        if (email) {
            const data = await prisma.info.findUnique({
                where: { email },
                select: {
                    name: true,
                    email: true,
                }
            })
            return Response.json(data);
        }

        return Response.json("Email is undefined")

    }
    catch (error) {
        console.error(error);
        return Response.json("Error: " + error);
    }
}
