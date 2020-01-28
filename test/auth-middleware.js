const passport = require("passport");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app.js");
let should = chai.should();
chai.use(chaiHttp);
let AuthController = require("../controllers/Users.js");

describe('----> Testing Auth Routes', () => {
   
   it('it should return unauthorized status code 401', (done) => {
    chai.request(server)
        .get('/api/cities?id=6547294')
        .end((err, res) => {
              res.should.have.status(401);
          done();
        });
  });

     

  it('it should failed with passing wrong token ', (done)=>{
      chai
        .request(server)
        .get("/api/cities?id=6547294")
        .set("Authorization","Bearer fs5e515d2w55x.w5rwe4d1")
        .end((err , res)=>{
            res.should.have.status(401);
            done();
        })
  });

  it('it should return 403 forbidden access',(done)=>{
    chai
            .request(server)
            .post("/api/users/login")
            .send({
                email: "mouadmsalek@outlook.com"
            })
            .end((err, res) =>{
                res.should.have.status(403);
                done();
                });
    })

    it('it should return 403 forbidden access',(done)=>{
        chai
            .request(server)
            .post("/api/users/register")
            .send({
                email: "mouadmsalek@outlook.com"
            })
            .end((err, res) =>{
                res.should.have.status(403);
                done();
                });
        });
        
})