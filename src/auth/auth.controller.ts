import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('/signup')
  async signUp(@Body() authCredentialDTO: AuthCredentialsDTO) {
    return await this.authService.signUp(authCredentialDTO)
  }
}
