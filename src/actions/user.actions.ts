import db from "@/lib/db";

interface fetchUserParams {
    id: string,
    name?: string,
    username?: string,
    email?: string,
    image?: string,
}

export const fetchUser = async ({
    id,
    name = '',
    username = '',
    email = '',
    image = '',
}: fetchUserParams) => {
    try {
        const user = await db.user.findUnique({
            where: { id }
        })

        if (user) return user;

        if (!name || !username || !email) return null;

        const createUser = await db.user.create({
            data: {
                id,
                name,
                username,
                email,
                image,
            }
        })

        return createUser;
    } catch (error: any) {
        throw new Error(error.message)
    }
}