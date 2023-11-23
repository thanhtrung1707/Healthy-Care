import express from 'express';
import passport from 'passport';
import dotenv from "dotenv";

const googleRouter = express.Router();

googleRouter.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

googleRouter.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

googleRouter.get("/google", passport.authenticate("google", ["profile", "email"]));

googleRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/login/failed",
	})
);

googleRouter.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

export default googleRouter;
