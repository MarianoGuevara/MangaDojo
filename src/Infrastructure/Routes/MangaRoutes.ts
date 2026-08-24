import { Router } from 'express';

const mangaRouter = Router();

// mangaRouter.route("/products")
//    .get((request, response) => {
//         console.log("HOLAAAa")
//     })


mangaRouter.route("/")
   .get((request, response) => {
        console.log("HOLAAAa")
    })

export { mangaRouter };