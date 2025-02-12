import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 users over 30 seconds
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
  ],
  thresholds: {
    http_reqs: ['count < 1000'], // Ensure less than 1000 requests
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

const BASE_URL = 'http://localhost:3000/graphql';

export default function () {
  const registerPayload = JSON.stringify({
    query: `
      mutation {
        register(userDto: {
          email: "test${Math.random()}@example.com",
          firstName: "Test",
          lastName: "User",
          phoneNumber: "${Math.floor(Math.random() * 1000000000)}",
          password: "StrongP@ssword1",
          role: "CUSTOMER"
        }) {
          id
          firstName
          lastName
          phoneNumber
          email
          role
          access_token
        }
      }
    `,
  });

  const registerHeaders = { 'Content-Type': 'application/json' };

  const registerRes = http.post(BASE_URL, registerPayload, { headers: registerHeaders });
  check(registerRes, {
    'is status 200': (r) => r.status === 200,
    'registration successful': (r) => r.json('data.register.id') !== null,
  });

  const loginPayload = JSON.stringify({
    query: `
      mutation {
        login(loginDto: {
          email: "test@example.com",
          password: "StrongP@ssword1"
        }) {
          access_token
        }
      }
    `,
  });

  const loginHeaders = { 'Content-Type': 'application/json' };

  const loginRes = http.post(BASE_URL, loginPayload, { headers: loginHeaders });
  check(loginRes, {
    'is status 200': (r) => r.status === 200,
    'token received': (r) => r.json('data.login.access_token') !== '',
  });

  sleep(1);
}