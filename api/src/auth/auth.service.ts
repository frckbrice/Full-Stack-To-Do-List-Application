//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService, private jwtService: JwtService) { }
  /**
   * FOR THE SAKE OF DEMO ONLY
   */

  async login({ email, password }: { email: string, password: string }): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    // const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    // if (!user) {
    //   throw new NotFoundException(`No user found for email: ${email}`);
    // }

    // Step 2: Check if the password is correct
    // const isPasswordValid = user.password === password;

    // If password does not match, throw an error
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid password');
    // }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ email }),
    };
  }

  async logout() {

    return {
      accessToken: null,
    };
  }
}
