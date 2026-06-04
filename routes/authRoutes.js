import "dotenv/config";
import express from "express";
import passport from "passport";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { register } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";


const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"]
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5500/index.html"
  }),
  (req, res) => {
    console.log("GitHub callback successful, user:", req.user);

    res.redirect("http://localhost:5500");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5500/index.html",
  }),
  (req, res) => {
    console.log("Google callback successful, user:", req.user);
    res.redirect("http://localhost:5500");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5500/index.html",
  }),
  (req, res) => {
    res.redirect("http://localhost:5500");
  }
);


router.post("/register", register);

router.post("/login", login);

router.get("/logout", (req, res, next) => {

  req.logout((err) => {

    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {

      if (err) {
        return next(err);
      }

      res.clearCookie("sessionId");

      return res.redirect("http://localhost:5500");
    });

  });
});


router.get("/me", requireAuth, (req, res) => {

  if (!req.user) {
    return res.status(401).json({
      authenticated: false
    });
  }

  console.log(req.user);

  res.json(req.user);
});

export default router;