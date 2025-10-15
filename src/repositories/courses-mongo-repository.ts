import type { DBType, CourseType } from '../db/db.js';
import { client } from './db.js';

const ProductsCollection = client.db("shop").collection<CourseType>("products");
export const coursesRepository = {
    async findCourses(title: string | null | undefined, DB: DBType):Promise<CourseType[]> {
        const filter: any ={}
        if (title) {
            filter.title = {$regex: title}
        } 
        return ProductsCollection.find(filter).toArray();
    },

    async findCoursesById(id: number, DB: DBType):Promise<CourseType | null> {
        let product: CourseType | null = await ProductsCollection.findOne({id});
        if (product) {
            return product
        } else {
            return null
        }
    },

    async createCourse(title: string, DB: DBType):Promise<CourseType | undefined> {

        if (!title) {
            return;
        } else {
            const createdProducts: CourseType = {
                id: +(new Date()),
                title: title,
                studentsCount: 0
            }
            const result = await ProductsCollection.insertOne(createdProducts);
            
            return createdProducts
            }
        
    },

    async deleteOneCourse(id: Number, DB: DBType):Promise<boolean> {
        const result = await ProductsCollection.deleteOne({id});
        return result.deletedCount === 1
    },

    async updateCourse(id: Number, title: string, DB: DBType):Promise<boolean> {
        const result = await ProductsCollection.updateOne({id}, {$set: {title: title}});     
        return result.matchedCount === 1 
    },

    async deleteCourse(db:any):Promise<boolean> {
        const result = await client.db("shop").collection("products").deleteMany();
        return result.acknowledged
    }
}

