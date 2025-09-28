import type { DBType, CourseType } from '../db/db.js';


export const coursesRepository = {

    findCourses(title: string | null, DB: DBType) {
        const DBCourses = DB.courses
        if (title) {
            return DBCourses.filter(p => p.title.includes(title));
        } else {
            return DBCourses
        }
    },

    findCoursesById(id: number | null, DB: DBType) {
        return DB.courses.find(a => a.id === id) || null
    },

    createCourse(title: string, DB: DBType) {
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

    deleteCourse(id: Number, DB: DBType) {

        const currentCourse = DB.courses.findIndex(c => c.id === id)
        if (isNaN(currentCourse)) {
            return false;
        } else {
            DB.courses.splice(currentCourse, 1)
            return true;
        }

    },

    updateCourse(id: Number, title: string, DB: DBType) {
        let foundProduct = DB.courses.find(p => p.id === id)
        if (foundProduct) {
            foundProduct.title = title;
            return true;
        } else {
            return false;
        }

    }
}

