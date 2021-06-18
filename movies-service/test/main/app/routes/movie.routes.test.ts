  
import { disconnect } from 'mongoose';
import request from 'supertest';

import { connect } from '@/infra/database/mongodb';
import { MovieSchema  } from '@/infra/database/mongodb/schemas/MovieSchema';
import { app } from '@/main/app';
import { Movie } from '@/domain/entities/Movie';
import { map } from '@/infra/database/mongodb/helpers/mapper';

describe('Movie Routes Tests', () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await MovieSchema.deleteMany({});
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('POST /movies', () => {
    it('should be able to create a new movie', async () => {
      const response = await request(app)
        .post('/api/movies')
        .send({
          name: "anyName",
          duration: 145,
          release_date: new Date("2020-06-16"),
          sinopsis: "anySinopsis",
          categories: ["anyCategory"],
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('should not be able to create a new movie with name that already taken', async () => {
      const body = {
          name: "anyName",
          duration: 145,
          release_date: new Date("2020-06-16"),
          sinopsis: "anySinopsis",
          categories: ["anyCategory"],
      };

      await MovieSchema.create(body);

      const response = await request(app).post('/api/movies').send(body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Movie already exists');
    });
  });

  describe("GET/movies", () => {
    it('should return movies with default pagination', async () => {
      const body = {
        name: "anyName",
        duration: 145,
        release_date: new Date("2020-06-16"),
        sinopsis: "anySinopsis",
        categories: ["anyCategory"]
      };

      await MovieSchema.create(body);

      const response = await request(app).get('/api/movies');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe(body.name);
    });
  });

  describe("GET/movies/:id", () => {
    it("should be return movie by id", async () => {
      const movieCreated = await request(app)
        .post('/api/movies')
        .send({
          name: "anyName",
          duration: 145,
          release_date: new Date("2020-06-16"),
          sinopsis: "anySinopsis",
          categories: ["anyCategory"],
        });
     
      const response = await request(app).get(`/api/movies/${movieCreated.body.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("anyName");
    });

    it("should be return movie by id", async () => { 
      const response = await request(app).get(`/api/movies/anyId`);
      expect(response).toHaveProperty("error");
    });
  });
});