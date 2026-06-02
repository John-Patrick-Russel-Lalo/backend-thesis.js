import "dotenv/config";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import {
  findUserByProvider,
  createUser,
  findUserById,
} from "../models/userModel.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await findUserByProvider("github", profile.id);

        if (!user) {
          user = await createUser({
            provider: "github",
            providerId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            avatar: profile.photos?.[0]?.value || null,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("GitHub Auth Error:", error);
        return done(error, null);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await findUserByProvider("google", profile.id);

      if (!user) {
        user = await createUser({
          provider: "google",
          providerId: profile.id,
          email: profile.emails?.[0]?.value || null,
          username: profile.emails?.[0]?.value || null,
          displayName: profile.displayName,
          avatar: profile.photos?.[0]?.value || null,
        });
      }

      return done(null, user);
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

export default passport;
