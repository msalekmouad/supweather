const passport = require("passport");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app.js");
let should = chai.should();
chai.use(chaiHttp);
let AuthController = require("../controllers/Users.js");
describe('Testing Auth Routes', () => {
   
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


  it('it should return 200 code with an resonse object',()=>{

        const req ={
            body: {
                email: "mouadmsalek@outlook.com",
                password: "Zidane200"
            }
        }
        AuthController.userLogin(req,{}, () => {}).then(res => {
            res.should.have.status(203);
        });

  })

})