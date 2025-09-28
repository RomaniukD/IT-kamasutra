import express from "express";
import { type DBType} from '../db/db.js';

export const getTestsRouter=(db: DBType) => {
    const router = express.Router();

    router.delete('/data', (req,res)=> {
        db.courses = [];
        res.sendStatus(204);
    })
    return router;
}
