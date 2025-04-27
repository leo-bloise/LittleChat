import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { IUserService } from "./user.service.interface";
import { Model } from "mongoose";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}
    async checkIfUsernameTaken(username: string): Promise<boolean> {
        const model = await this.userModel.exists({
            username
        })
        return model !== null;
    }
    async createUser(request: { username: string; }): Promise<User> {
        if(await this.checkIfUsernameTaken(request.username)) {
            throw new UserAlreadyExistsError(request.username);
        }
        const userCreated = new this.userModel({
            username: request.username
        });
        return userCreated.save();
    }
}