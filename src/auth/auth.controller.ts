import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Request()
        req
    ){
             
        return req.user;
    }

    @Get('profile')
    profile(){
        return {
            message: "RESPUESTA DE CONJUNTO DE DATOS!"
        }
    }



}
