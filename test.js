var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./app');
var should = chai.should();

chai.use(chaiHttp);

describe('get users data from json', function () {
    it('it should return users array', function (done) {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                done();
            });
    });
});

describe('get two numbers from route params', function () {
    it('it should return product of number', function (done) {
        chai.request(app)
            .get('/users/product/3/5')
            .end((err, res) => {
                var product = 3 * 5;
                console.log(res.text);
                res.should.have.status(200);
                res.text.should.equal("Product of the numbers is: 15")
                product.should.equal(15);
                done();
            });
    });
    it('it should throw error', function (done) {
        chai.request(app)
            .get('/users/product/3/abc')
            .end((err, res) => {
                res.should.have.status(500);
                res.text.should.equal("Please provide numbers only")
                done();
            });
    });
});

describe('read data from one file and write to other', function () {
    it('it should create new file and write data', function (done) {
        chai.request(app)
            .get('/users/write')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                done();
            });
    });
});

describe('get string from route params', function () {
    it('it should return the first non-repeating character in the String', function (done) {
        chai.request(app)
            .get('/users/concat/gursimran')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('gursiman');
                done();
            });
    });
});
