import { User } from "../schemas/user.schema"

export interface IUserService {
    checkIfUsernameTaken(username: string): Promise<boolean>;
    createUser(request: {
        username: string
    }): Promise<User>;
}