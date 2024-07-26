import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const jwtToken = request.headers.jwt;
      const decoded = jwt.verify(jwtToken, 'secret');
      if (decoded) return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
