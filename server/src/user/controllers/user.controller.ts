import { Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}
    @Get()
    async checkIfUsernameTaken(
        @Query('username') username: string
    ) {
        const alreadyTaken = await this.userService.checkIfUsernameTaken(username)
        return {
            alreadyTaken
        }
    }
}