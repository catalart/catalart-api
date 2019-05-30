import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../business/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
