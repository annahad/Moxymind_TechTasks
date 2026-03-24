import 'dotenv/config';
import { test, expect } from '@playwright/test';
//dotenv.config();

const API_KEY = process.env.API_KEY; // read API key


test.describe('GET request', () => {
    test('GET - List Users with correct total and last names', async ({ request }) => {
      // Send GET request with x-api-key header
        const firstResponse = await request.get('/api/users?page=1', {
             headers: {
        'x-api-key': API_KEY
        },
  });

  console.log("Prvý request status:", firstResponse.status());

  // Overenie status kódu
  expect(firstResponse.status()).toBe(200);
  const jsonResponse = await firstResponse.json();
  console.log(jsonResponse);

    // assert received data in total
      expect(jsonResponse.total).toBe(12)

      // assert “last_name” for the first and for the second User in “data”
      expect(jsonResponse.data.length).toBeGreaterThan(2);
      expect(jsonResponse.data[0].last_name.length).toBeGreaterThan(0);
      expect(jsonResponse.data[1].last_name.length).toBeGreaterThan(0);

  // Count number of received users in “data” and compare it to the received value “total”.
  // Dynamiccally read total, per_page a total_pages
  let totalItems = 0;

  const total = jsonResponse.total;
  const perPage = jsonResponse.per_page;
  const totalPages = jsonResponse.total_pages;

  // Add count from first page
  totalItems += jsonResponse.data.length;
  console.log(`Page 1: ${jsonResponse.data.length} items, totalItems so far: ${totalItems}`);


  // Read other pages
  for (let page = 2; page <= totalPages; page++) {
    const resp = await request.get(`/api/users?page=${page}`, {
      headers: {
        'x-api-key': API_KEY
      },
    });
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    totalItems += json.data.length;
  }

  // Assertion
  console.log("Total from all sites:", totalItems);
  expect(totalItems).toBe(total);

  /////Bonus task: assertions for possible data types present in the response.
      expect(jsonResponse).toMatchObject({
        page: expect.any(Number),
        per_page: expect.any(Number),
        total: expect.any(Number),
        total_pages: expect.any(Number),
        support: {
          url: expect.any(String),
          text: expect.any(String)
        },
        _meta: expect.any(Object)
      });

      jsonResponse.data.forEach(user => {
        expect(user).toMatchObject({
          id: expect.any(Number),
          email: expect.stringMatching(/.+@.+\..+/), // overí základný formát emailu
          first_name: expect.any(String),
          last_name: expect.any(String),
          avatar: expect.stringMatching(/^https:\/\/.*\.jpg$/) // musí začať https a končiť .jpg
        });
      });

    });
});