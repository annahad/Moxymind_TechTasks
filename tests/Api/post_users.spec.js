import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import userData from "./data_users.json" with { type: "json" };
const LIMIT = 400;

const API_KEY = process.env.API_KEY; // read API key

test.describe('POST - Create user from json file', () => {

     for (const data of userData) {

        test(`Create user with name: ${data.name}`, async ({ request }) => {

            // Sended data from file
            console.log("Post json", data.name); //for debug
            console.log("Post json", data.job); //for debug

            const startTime = Date.now();

            const response = await request.post('api/users', {
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY
                }
            });

            const responseTime = Date.now() - startTime;
            console.log(`Real response time for data ${data.name}: ${responseTime} ms`); // for debug
            const body = await response.json();

            //Assert status code
            expect(response.status()).toBe(201);

            //Assert ID and createdAt exists
            expect(body.id).toBeTruthy();
            expect(body.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

            // check for data
            expect(body.name).toBe(data.name);
            expect(body.job).toBe(data.job);

            // ✅ response time
            expect(responseTime).toBeLessThan(LIMIT);

            //Bonus task: verify response schema
            expect(body).toEqual({
                name: expect.any(String),
                job: expect.any(String),
                id: expect.any(String), 
                createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/), //ISO data format
                _meta: expect.any(Object) 
            });

        });

    }

});
