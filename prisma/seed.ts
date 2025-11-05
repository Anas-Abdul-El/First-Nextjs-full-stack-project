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

    const user = await prisma.info.findMany({
        where: {
            email: email,
        }
    })

    if (!user[0]) {
        return false
    }

    return { user }
}