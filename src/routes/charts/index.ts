import express, { NextFunction, Request, Response } from "express";
import {
    singer
} from "./schema";
import { schemaType } from "./types";
import ChartRepo from "../../database/repos/charts";

const router = express.Router();

const getAndSaveChart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chart = await ChartRepo.getChartList();
    
        //insert
        const results = await ChartRepo.insertCharts(chart)
        
        return res.status(200).send({
            status: 200,
            service: "productsList",
        
        });
    } catch (error: any) {
        console.log(error)
        return res.send({
            status: 500,
            type: "InternalServerError",
            message: "Internal server error.",
            error: error.message,
        });
    }
}

const getSingerDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { error }: schemaType = singer.validate(req.query);

        if (error) return next({ status: 400, message: error.details[0].message });

        let results = await ChartRepo.getbyArtist(String(req.query.singerName));

        console.log(typeof results)
        let result
        result = results === null ? "result not found" : results
        

        return res.status(200).send({
            status: 200,
            service: "productsList",
            // count,
            data: result
        });
    } catch (error: any) {
        return res.send({
            status: 500,
            type: "InternalServerError",
            message: "Internal server error.",
            error: error.message,
        });
    }
}





router.post('/total', getAndSaveChart);
router.get('/singer', getSingerDetail);




export default router;
