import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"//ح نعمله بعد شوي

export async function POST(req: Request) {
    try {
        // نستقبل البيانات من الrequest body
        const { name, email, phoneNumber } = await req.json();

        // تحقق بسيط
        if (!name || !email || !phoneNumber) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // نحفظ البيانات بPrisma
        const newUser = await prisma.info.create({
            data: {
                name,
                email,
                phoneNumber,
            },
        });

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}