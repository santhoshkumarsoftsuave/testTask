const request = require("supertest");
let {matchersWithOptions} = require("jest-json-schema");
// import {server}  from "./server";


expect.extend(
    matchersWithOptions({
      verbose: true,
    })
);

// test("Bookable events", async ()=>{
//         const resp = await request("./server")
//             .get('/test')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//     });

describe("Bookable events", ()=>{
    test("Bookable events", async ()=>{
        const resp = await request("./server")
            .post('/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    } );
});