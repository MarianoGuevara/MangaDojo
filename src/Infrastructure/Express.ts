import express from "express";
import { Router } from "express";

const app = express();
app.use(express.json());

const router = Router();

// router.route("/products")
//    .get((request, response) => {
//         console.log("HOLAAAa")
//     })