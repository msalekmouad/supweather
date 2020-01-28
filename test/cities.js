let CitiesController = require("../controllers/Cities");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app.js");
let should = chai.should();
let {getJWT} = require("../custom/_utils");

//? import model for user auth
let Users = require("../models/User").User;

