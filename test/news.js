process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const News = require('../src/models/news')
chai.should()

chai.use(chaiHttp)

describe('News', () => {
  beforeEach(done => {
    News.deleteMany({})
      .then(() => done())
  })

  describe('GET', () => {
    it('should return nothing with db is empty', done => {
      chai.request(server)
        .get('/news')
        .end((_, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)

          done()
        })
    })
  })

  it('should return news when db has a record', done => {
    const newsobj = {
      title: 'Asadf',
    }

    News.create(newsobj).then(createdNews => {
      const expectedNews = {
        ...newsobj,
        _id: createdNews.id,
      }

      chai.request(server)
        .get('/news')
        .end((_, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(1)
          res.body[0].should.be.eql(expectedNews)

          done()
        })
    })
  })
})
