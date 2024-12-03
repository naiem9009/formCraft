"use server";
import { currentUser } from "@clerk/nextjs/server";
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

class UserNotFoundErr extends Error{}

export async function getFormStats () {
    const user = await currentUser()

    if (!user) {
        throw new UserNotFoundErr()
    }

    const stats = await prisma.form.aggregate({
        where : {
            userId : user.id
        },
        _sum : {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0
    const submissions = stats._sum.submissions || 0;


    
}
