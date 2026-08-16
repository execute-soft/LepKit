import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    super({
      clientID: clientID || 'disabled',
      clientSecret: clientSecret || 'disabled',
      callbackURL: clientID
        ? configService.get('GOOGLE_CALLBACK_URL', 'http://localhost:3000/api/v1/auth/google/callback')
        : '/',
      scope: ['email', 'profile'],
      state: true,
    });
    if (!clientID || !clientSecret) {
      Logger.warn('Google OAuth not configured — /auth/google endpoints will fail', 'GoogleStrategy');
    }
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = {
      googleId: profile.id,
      email: profile.emails?.[0]?.value ?? '',
      firstName: profile.name?.givenName ?? '',
      lastName: profile.name?.familyName ?? '',
      avatar: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
