const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('./index');

test('Test Token', async () => {
    const token = await request(app).get('/login');
    console.log(token._body.token);
    const userId = "JRP"
    const key = "kim"
    const verify = jwt.verify(token._body.token, key)
    expect(verify.id).toEqual(userId)
})