import  { Prisma, PrismaClient } from '@prisma/client'
import {id_ID, fakerID_ID} from "@faker-js/faker"
const client = new PrismaClient()

// const getUsers = async  (): Promise<Prisma.UserCreateInput[]> => {
//     const userInput: Prisma.UserCreateInput[] = []
//     for (let i = 0; i < 10; i++) {
//         const password = "$2a$10$UrMAEMawtX2YQTIbqsq6ceMVeSO7Yb3qCoe7SxE4KKqap/0XqAxAO"
//         userInput.push({
//             username: fakerID_ID.internet.userName(),
//             email: fakerID_ID.internet.email(),
//             phone: fakerID_ID.phone.number().substring(0, 15),
//             password
//         })
//     }
//     return userInput
// }

function randomSize() {
    const size = ["S", "M", "L", "XL", "XXL"]
    return size[Math.floor(Math.random() * size.length)]

}

const getClothes = (): Prisma.clothesCreateInput[] => {
    const clothesInput: Prisma.clothesCreateInput[] = [];
    for (let i = 0; i < 5; i++) {
        clothesInput.push({
            name: fakerID_ID.commerce.productName(),
            price: parseFloat(fakerID_ID.commerce.price()),
            description: fakerID_ID.commerce.productDescription(),
            image: fakerID_ID.image.fashion(),
            category: fakerID_ID.commerce.department(),
            size: randomSize(),
            color: fakerID_ID.color.human(),
            stock: fakerID_ID.number.int({ min: 1, max: 100 }),
        })
    }
    return clothesInput;
}

const main = async () => {
    // const users = await getUsers()
    const clothes = await getClothes()
    // for (const user of users) {
    //     await client.user.create({data: user})
    // }
    for (const cloth of clothes) {
        await client.clothes.create({ data: cloth });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await client.$disconnect();
    })
