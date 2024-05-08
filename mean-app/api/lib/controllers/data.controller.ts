import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { loginToServer } from '../middlewares/loginToServer.middleware';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, loginToServer, this.addData); 
        this.router.post(`${this.path}/:num`, loginToServer, this.getManyData);
        this.router.delete(`${this.path}/:id`, loginToServer, this.deleteData);
        this.router.delete(`${this.path}`, loginToServer ,this.deleteAll);
        this.router.get(`${this.path}/:id`, loginToServer ,this.getData);
        this.router.get(`${this.path}`, loginToServer ,this.getAll);
        
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        if (elem === null || elem === undefined) {
            return response.status(400).json({ error: "Bad request." });
        }

        testArr.push(elem);

        response.status(200).json(testArr);
    }

    private deleteData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        if (! Number.isInteger(Number(id)) || Number(id) >= testArr.length || Number(id) < 0) {
            return response.status(404).json({ error: "Not found." });
        }

        testArr = testArr.filter((elem, index) => index !== Number(id));

        response.status(200).json(testArr);
    };

    private getManyData = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;

        if (!Number.isInteger(Number(num)) || Number(num) >= testArr.length || Number(num) < 0) {
            return response.status(404).json({ error: "Not found." });
        }

        const slicedArray = testArr.slice(0, Number(num));
        response.status(200).json(slicedArray);
    }

    private getData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        if (!Number.isInteger(Number(id)) || Number(id) >= testArr.length || Number(id) < 0) {
            return response.status(404).json({ error: "Not found." });
        }

        response.status(200).json(testArr[Number(id)]);
    }
    
    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    };

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json(testArr);
    };
}

export default DataController;