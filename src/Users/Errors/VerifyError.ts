import { HttpException, HttpStatus } from "@nestjs/common";

export class VerifyError extends HttpException{
    constructor()
    {
        super("Verify your email first, A verifiation email was sent to your email",HttpStatus.UNAUTHORIZED)
    }
}