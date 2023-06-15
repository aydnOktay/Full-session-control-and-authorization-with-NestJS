import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class AuthSignUpRequest {
    
    @IsString()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    rpassword: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}

export class ForgetPasswordRequests {
    @IsString()
    email:string;
}

export class AuthSignInRequest {
    

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    email: string;

}