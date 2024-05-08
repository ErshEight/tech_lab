import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { loginToServer } from '../middlewares/loginToServer.middleware';
import Joi from 'joi';

//let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, loginToServer, this.addData); 
        this.router.delete(`${this.path}/:id`, loginToServer, this.removePost); 
        this.router.delete(`${this.path}/:id`, loginToServer, this.deleteById);
        this.router.delete(`${this.path}`, loginToServer ,this.deleteAllPosts);
        this.router.get(`${this.path}/:id`, loginToServer ,this.getById);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        });
        try {
            const validatedData = await schema.validateAsync({title, text, image});
            await this.dataService.createPost(validatedData);
            response.status(200).json(validatedData);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    };

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    }; 

    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    }

    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteData({});
        response.sendStatus(200);
    };

}

export default PostController;