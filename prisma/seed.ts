import prisma from "../lib/prisma";

type info = {
    name: string,
    email: string
}

export async function addInfo({ name, email }: info) {
    try {

        await prisma.info.create({
            data: {
                name,
                email,
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export async function getInfo(email: string) {

    try {

        const data = {
            name: "",
            email: "",
            message: ''
        }

        const user = await prisma.info.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            data.message = "there is an error";
        } else {
            data.name = user?.name;
            data.email = user?.email;
        }


        return data
    } catch (error) {
        console.error(error);

    }
}