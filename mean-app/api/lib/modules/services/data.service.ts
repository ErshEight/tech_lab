import {IData, Query} from "../models/data.model";
import PostModel from '../schemas/data.schema';

class DataService {

    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await PostModel.find(query, { __v: 0, _id: 0 });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

   public async addNew(postParams: IData) {
    try {
        const dataModel = new PostModel(postParams);
        await dataModel.save();
    } catch (error) {
        console.error('Wystąpił błąd podczas tworzenia danych:', error);
        throw new Error('Wystąpił błąd podczas tworzenia danych');
    }
}

public async getPostByNum(numStr: string) {
    try {
        const num = parseInt(numStr);
        const result = await PostModel.find().limit(num);
        return result;
    } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych: ', error);
        throw new Error('Wystąpił błąd podczas pobierania danych');
    }
}

public async getData(query: Query<number | string | boolean>) {
    try {
        const result = await PostModel.find(query, { __v: 0, _id: 0 });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

public async getAll() {
    try {
        const result = await PostModel.find();
        return result;
    } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych: ', error);
        throw new Error('Wystąpił błąd podczas pobierania danych');
    }
}

public async deleteThis(query: Query<number | string | boolean>) {
    try {
        await PostModel.deleteMany(query);
    } catch (error) {
        console.error('Wystąpił błąd podczas usuwania danych:', error);
        throw new Error('Wystąpił błąd podczas usuwania danych');
    }
}

public async deleteAll() {
    try {
        await PostModel.deleteMany();
    } catch (error) {
        console.error('Wystąpił błąd podczas usuwania danych:', error);
        throw new Error('Wystąpił błąd podczas usuwania danych');
    }
} 

}

export default DataService;