import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/interface/jwtPayload.type';
import fs = require('fs');
import path = require('path');

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
       secretOrKey: config.get<string>('AT_SECRET'),
      algorithms: ['HS256'],
    });
  }

  
  validate(payload: JwtPayload) {
    return payload;
  }
}