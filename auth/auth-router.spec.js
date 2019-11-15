const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

const Auth = require('../auth/auth-model.js');

describe('Auth-Router', () => {
    describe('Register', () => {
        
        beforeEach(async () => {
            await db('users').truncate();
        })

        const loginInfo = {username: "fortest", password: "password"};

        it("Successful registration should give 201", () => {
            return request(server)
                .post('/api/auth/register')
                .send(loginInfo)
                .then(res => {
                    expect(res.status).toBe(201)
                })
        });

        it('Should return username', () => {
            const success = "Added fortest"
            return request(server)
                .post('/api/auth/register')
                .send(loginInfo)
                .then(res => {
                    expect(res.body.registered).toEqual(success)
                })
        });
    })

    describe('Login', () => {

        const loginInfo = {username: "fortest", password: "password"};
        it('Successful login returns 200', () => {
            return request(server)
                .post('/api/auth/login')
                .send(loginInfo)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        });
        it('Successful login returns welcome message', () => {
            const success = 'Welcome fortest!'
            return request(server)
                .post('/api/auth/login')
                .send(loginInfo)
                .then(res => {
                    expect(res.body.message).toEqual(success)
                })
        });
    })
})