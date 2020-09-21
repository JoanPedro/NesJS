import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialDTO: AuthCredentialsDTO) {
    return await this.authService.signUp(authCredentialDTO)
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) authCredentialDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialDTO)
  }
}
