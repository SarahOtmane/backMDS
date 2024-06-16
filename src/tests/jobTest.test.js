const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jobController = require('../controllers/jobController.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock routes for testing
app.get('/jobs', jobController.getAllJobs);
app.get('/jobs/:name_job', jobController.getJobByName);
app.get('/jobs/id/:id_job', jobController.getJobById);
app.post('/jobs', jobController.createJob);
app.put('/jobs/:id_job', jobController.updateJob);
app.delete('/jobs/:id_job', jobController.deleteJob);

// Mock dependencies
jest.mock('../models/jobModel.js');

const Job = require('../models/jobModel.js');

describe('Job Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all jobs', async () => {
        Job.findAll.mockResolvedValue([{ id: 1, name: 'Job 1' }]);

        const response = await request(app)
            .get('/jobs');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get job by name', async () => {
        Job.findOne.mockResolvedValue({ id: 1, name: 'Job 1' });

        const response = await request(app)
            .get('/jobs/Job%201');

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Job 1');
    });

    test('should get job by id', async () => {
        Job.findOne.mockResolvedValue({ id: 1, name: 'Job 1' });

        const response = await request(app)
            .get('/jobs/id/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test('should create a job', async () => {
        Job.create.mockResolvedValue({ id: 1, name: 'Job 1' });

        const response = await request(app)
            .post('/jobs')
            .send({
                name: 'Job 1'
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

    test('should update a job', async () => {
        Job.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/jobs/1')
            .send({
                name: 'Updated Job'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Job updated successfully.');
    });

    test('should delete a job', async () => {
        Job.destroy.mockResolvedValue(1);

        const response = await request(app)
            .delete('/jobs/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Job deleted successfully.');
    });
});
