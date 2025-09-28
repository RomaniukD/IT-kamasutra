import express, { type Response } from 'express';
import {body} from 'express-validator';

import type { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types.js';
import type { CourseCreateModel } from '../models/CourseCreateModel.js';
import type { CourseUpdateModel } from '../models/CourseUpdateModel.js';
import type { GetCourseQueryModel } from '../models/GetCourseQueryModel.js';
import type { CourseViewModel } from '../models/CourseViewModel.js';
import type { URIParamsCourseIdModel } from '../models/URIParamsCourseIdModel.js'
import type { DBType, CourseType } from '../db/db.js';
import { coursesRepository } from '../repositories/courses-repository.js';
import { inputMiddlaleware } from '../middleware/InputTitleMiddleware.js';

const titleValidation = body('title').trim().isLength({min:3, max:20}).withMessage('title incorrect');

export const getCoursesRoutes = (db: DBType) => {
  const router = express.Router();

  router.get('/',  (req: RequestWithQuery<GetCourseQueryModel>, res: Response<CourseViewModel[]>) => {
    const foundCourse = coursesRepository.findCourses(req.query.title, db)
    res.status(200).send(foundCourse);
  })

  router.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.sendStatus(400)
      return;
    }
    const foundCourse = coursesRepository.findCoursesById(id, db)
    if (!foundCourse) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(foundCourse)
  })

  router.post('/', 
    titleValidation,
    inputMiddlaleware,
    (req: RequestWithBody<CourseCreateModel>, res: Response<CourseType>) => {

    const createdCourse = coursesRepository.createCourse(req.body.title, db)

    if (!createdCourse) {
      res.sendStatus(400)
      return;
    }
    res.status(201).json(createdCourse);
  })

  router.put('/:id', 
    titleValidation,
    inputMiddlaleware,
    (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateModel>, res: Response) => {
    const id = +req.params.id;

    if (!id || !req.body.title) {
      res.sendStatus(400);
      return;
    }
    const updateCourse = coursesRepository.updateCourse(id, req.body.title, db);
    if (updateCourse) {
      const updatedCourse = coursesRepository.findCoursesById(id, db)
      res.status(204).send(updatedCourse);
    } else {
      res.sendStatus(404)
    }

  })
  
  router.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModel>,
    res: Response) => {
    const id = Number(req.params.id);

    if (!id) {
      res.sendStatus(400);
      return;
    }
    const isDeleted = coursesRepository.deleteCourse(id, db)

    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  })

  return router
}