import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { loginToServer } from '../middlewares/loginToServer.middleware';

//let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, loginToServer ,this.addData);
        this.router.post(`${this.path}/:num`, loginToServer, this.getPostByNum);
        this.router.delete(`${this.path}/:id`, loginToServer ,this.deleteData);
        this.router.delete(`${this.path}`, loginToServer ,this.deleteAll);
        this.router.get(`${this.path}/:id`, loginToServer ,this.getPost);
        this.router.get(`${this.path}`, loginToServer ,this.getAll);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;
        const readingData = {
            title,
            text,
            image
        };
        try {
            await this.dataService.addNew(readingData);
            response.status(200).json(readingData);
        } catch (error: any) {
                console.log('eeee', error)
                console.error(`Validation Error: ${error.message}`);
                response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private deleteData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteThis({_id: id});
        response.status(200);
    };

    private getPostByNum = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const numData = await this.dataService.query({_id: id});
        response.status(200).json(numData);
    }; 

    private getPost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const post = await this.dataService.getData({ _id: id });
        response.status(200).json(post);
    }
    
    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        const posts = await this.dataService.getAll();
        response.status(200).json(posts);
    };

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteAll();
        response.status(200);
    };
}

export default PostController;