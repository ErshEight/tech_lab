import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkPostCount } from 'middlewares/checkPostCount.middleware';
import DataService from 'modules/services/data.service';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.post(`${this.path}/:num`, checkPostCount, this.getPostByNum);
        this.router.delete(`${this.path}/:id`, this.deleteData);
        this.router.get(`${this.path}s/:id`, this.getData);
        this.router.get(`${this.path}s`, this.getAll);
        this.router.delete(`${this.path}s`, this.deleteAll);
    }

    

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;
        const readingData = {
            title,
            text,
            image
        };
        try {
            await this.dataService.addData(readingData);
            response.status(200).json(readingData);
        } catch (error: any) {
                console.log('eeee', error)
                console.error(`Validation Error: ${error.message}`);
                response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private deleteData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.status(200);
    };

    private getPostByNum = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;
        const numData = await this.dataService.getPostByNum(num);
        response.status(200).json(numData);
    }; 

    private getData = async (request: Request, response: Response, next: NextFunction) => {
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