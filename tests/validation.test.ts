import request from 'supertest';
import app from '../src/index';

let token = '';

beforeAll(async () => {
  // Login and get fresh token before running validation tests
  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'valid@example.com',
    password: 'test123'
  });

  token = `Bearer ${loginRes.body.token}`;
});

describe('🧪 Zod Validation Errors', () => {
  it('should fail signup with missing fields', async () => {
    const res = await request(app).post('/api/auth/signup').send({ name: 'Only Name' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('should fail board creation with missing name', async () => {
    const res = await request(app)
      .post('/api/boards')
      .set('Authorization', token)
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error[0].path).toContain('name');
  });

  it('should fail comment creation with empty content & invalid boardId', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', token)
      .send({
        content: '',
        visibility: 'EVERYONE',
        boardId: '123' // invalid UUID
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.length).toBeGreaterThan(0);
  });
});