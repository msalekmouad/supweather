let CitiesController = require("../controllers/Cities");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app.js");
let should = chai.should();

describe("Cities test", () => {
    it('should return 400 bad request error',(done) => {
        chai.request(server)
            .get("/api/cities?id=")
            .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGI5YzI4M2ZlMTc1NjczMzQ5NGY2NiIsImVtYWlsIjoibW91YWRtc2FsZWtAb3V0bG9vay5jb20iLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzJkZmU2YzcxZTYxNGVjYjNhYzYzNDY4MjRjY2I2YTFiP3M9NjQmcj1wZyZkPW1tIiwiY3JlYXRlZF9hdCI6IjIwMTktMTItMzFUMTk6MDY6MTYuNTg0WiIsImxvZ2luX2RhdGUiOiIxLzIvMjAyMCwgMjE6Mzg6MDEiLCJpYXQiOjE1Nzc5OTc0ODEsImV4cCI6MTU3ODAxMTg4MX0.gETyUC8zwwWNn_Bz1PDScPELo5WWvI-c0FYSramQcFM")
            .end((err, res) =>{
                res.should.have.status(400);
                done();
            })
    })
});