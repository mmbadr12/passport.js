/**
 * test app 
 */
const request = require('supertest');
const router = require('./routers/passport');

// >>> test post router
describe('muset fiell all' , ()=>{

   test("email and all info", ()=>{

   return request(router)
    .get('/auth/google')
    .then(response=>{

       expect(response.statusCode)
        .toBe(200);
        done()     
    })


  })

});




//test mongodb connect


// describe('mongoConnectOrdisconnect', async()=>{

//  await beforeAll(()=>{

//     Mongoose.connection();

//   })

//  await aferAll((done)=>{

//     Mongoose.disconnect(done);

// })

// done()

// })
