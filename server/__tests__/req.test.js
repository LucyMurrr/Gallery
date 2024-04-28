import request from 'supertest';
import app from '../app'; 

/* eslint-disable no-undef */
describe('POST /images', () => {
  test('returns error if no file is uploaded', async () => {
    const response = await request(app)
      .post('/images');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Нет загруженного файла');
  });
});
