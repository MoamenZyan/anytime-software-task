import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interface/userInterface';


// users controller
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() user: IUser) {
        const result = await this.usersService.create(user);
        if (result) {
            return {status: true, message: "user created"};
        } else {
            return {status: false, message: "error in creating user"}
        }
    }
}


// authentication controller
@Controller('users/login')
export class AuthenticationController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async login(@Body() body: {email: string, password: string}) {
        const {email, password} = body;
        const result = await this.usersService.login(email, password);
        if (result[0] == true) {
            return {status: true, message: "user logged in", user:result[1], token: result[2], linkedin: result[3]}
        } else {
            return {status: false, message: "incorrect info"}
        }
    }
}
