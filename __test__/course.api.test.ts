import request from "supertest";
import { app } from "../src/app.js";

import type { CourseCreateModel } from '../src/models/CourseCreateModel.js';

describe('/', () => {

beforeAll(async () => {
    await request(app)
    .delete('/__test__/data')
    .expect(204);
  });

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/courses')
      .expect(200, []);
  });

  it('should return 404 for not  existing course', async () => {
    await request(app)
      .get('/courses/999')
      .expect(404);
  });
  
  let createdCourse1: any = null;
  it(`should create course with correct input data`, async () => {
    const data:CourseCreateModel = {
        title: 'it-incubator'
      }
    const createResponse = await request(app)
      .post('/courses')
      .send(data)
      .expect(201)

      createdCourse1 = createResponse.body;

      expect(createdCourse1).toEqual({
        id: expect.any(Number),
        title:'it-incubator',
        studentsCount: expect.any(Number)
      })

      await request(app)
      .get('/courses')
      .expect(200, [createdCourse1]);
  })
  
  let createdCourse2: any = null;
  it(`create new courses`, async () => {
    const createResponse = await request(app)
      .post('/courses')
      .send({
        title: 'it-incubator 2',
      })
      .expect(201)

      createdCourse2 = createResponse.body;

      expect(createdCourse2).toEqual({
        id: expect.any(Number),
        title:'it-incubator 2',
        studentsCount: expect.any(Number)
      })

      await request(app)
      .get('/courses')
      .expect(200, [createdCourse1, createdCourse2]);
  })

  it(`shouldn't update courses with incorrect input data`, async () => {
    await request(app)
      .put(`/courses/${createdCourse1.id}`)
      .send({
        title: '',
        price: 100
      })
      .expect(400)

      await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200, createdCourse1);
  })

  it(`shouldn't update courses that not exist`, async () => {
    await request(app)
      .put('/courses/'+ 2)
      .send({
        title: 'good title',
        price: 100
      })
      .expect(404)
  })

  it(`should update courses with correct input data`, async () => {
    await request(app)
      .put('/courses/'+ createdCourse1.id)
      .send({
        title: 'good new title',
        price: 100
      })
      .expect(204)

      await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200, {
        ...createdCourse1,
      title:'good new title'
    });

     await request(app)
      .get(`/courses/${createdCourse2.id}`)
      .expect(200, createdCourse2);
  })

  it(`should delete both courses`, async () => {
    await request(app)
      .delete('/courses/'+ createdCourse1.id)
      .expect(204);

      await request(app)
      .get('/courses/'+ createdCourse1.id)
      .expect(404, {});

      await request(app)
      .delete(`/courses/${createdCourse2.id}`)
      .expect(204);

      await request(app)
      .get('/courses/'+ createdCourse2.id)
      .expect(404, {});
  })

});

