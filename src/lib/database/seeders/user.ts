import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { db } from "..";
import type { User } from '@prisma/client';

export const createFakeUsers = async (count: number) => {
    const users: User[] = []
    for await (let _ of Array.from({ length: count })) {
        const randomPassword = await bcrypt.hash(faker.internet.password({ length: 3 }), 5)
        const user = await db.user.create({
            data: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: randomPassword,
            }
        })
        users.push(user)
    }
    return users
}