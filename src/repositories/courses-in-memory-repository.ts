import { type DBType, type CourseType, db } from '../db/db.js';

export const coursesRepository = {
    
    async findCourses(title: string | null | undefined, DB: DBType):Promise<CourseType[]> {
        const DBCourses = DB.courses
        if (title) {
            return DBCourses.filter(p => p.title.includes(title));
        } else {
            return DBCourses
        }
    },

    async findCoursesById(id: number | null, DB: DBType):Promise<CourseType | null> {
        return DB.courses.find(a => a.id === id) || null
    },

    async createCourse(title: string, DB: DBType):Promise<CourseType | undefined> {
        const DBCourses = DB.courses

    if (!title) {
        return;
    } else {
        const createdProducts: CourseType = {
            id: +(new Date()),
            title: title,
            studentsCount: 0
        }
        DBCourses.push(createdProducts);
        return createdProducts;
        }
        
    },

    async deleteOneCourse(id: Number, DB: DBType):Promise<boolean> {

        const currentCourse = DB.courses.findIndex(c => c.id === id)
        if (isNaN(currentCourse)) {
            return false;
        } else {
            DB.courses.splice(currentCourse, 1)
            return true;
        }

    },

    async updateCourse(id: Number, title: string, DB: DBType):Promise<boolean> {
        let foundProduct = DB.courses.find(p => p.id === id)
        if (foundProduct) {
            foundProduct.title = title;
            return true;
        } else {
            return false;
        }

    },

    async deleteCourse(db:DBType):Promise<boolean> {
            db.courses = [];
            return true
        }
}

