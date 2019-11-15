const request = require('supertest')
const server = require('../api/server.js')

const Auth = require('../auth/auth-model.js');

describe('Jokes API', function() {
    
    it('Should return error due to no token (400)', () => {
        return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(400)
            })
    });
    it('Should be successful with login (200)', () => {
        const loginInfo = {username: 'joketest', password: 'password'};

        Auth.add(loginInfo)
            request(server)
            .post('/api/auth/login')
            .send(loginInfo)
            .then(res => {
                const token = res.token

                let auth = req.headers.authorization;

                return request(server)
                .get('/api/jokes')
                .set({auth, token})
                .then(res => {
                    expect(res.status).toBe(200)
                })
            })
        
    });
})