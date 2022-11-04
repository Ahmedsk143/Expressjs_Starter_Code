import { Request, Response } from 'express';
import UserModel, { User } from '../models/userModel';
import * as jwt from 'jsonwebtoken';
class userController {
    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await UserModel.getAll();
            res.json(result);
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static getUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await UserModel.getById(id);
            res.send(result);
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static deleteUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await UserModel.deleteById(id);
            res.json({ message: 'User has been deleted' });
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static registerNewUser = async (req: Request, res: Response) => {
        try {
            const user: User = req.body;
            await UserModel.addNew(user);
            res.json({ message: 'User has been created, Please signin' });
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static authenticateUser = async (req: Request, res: Response) => {
        try {
            const user: User = req.body;
            const authenicated = await UserModel.authenticate(user);
            const token = jwt.sign(user, process.env.PRIVATE_KEY as string);
            if (authenicated) {
                res.json({ token });
            } else
                res.status(201).json({ message: 'Wrong username or password' });
        } catch (err) {
            res.status(400).json({ err });
        }
    };
}
export default userController;
