import { Injectable } from '@nestjs/common';
import { greetFromShared, User } from '@app/shared/test';

@Injectable()
export class AppService {
  getHello(): string {
    return greetFromShared('Backend API');
  }

  getUser(): User {
    return {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    };
  }
}
