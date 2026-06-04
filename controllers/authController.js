import { createUser, loginUser } from "../models/userModel.js";

export async function register(req, res) {
    try {
        const { email, firstName, lastName, password } = req.body;

        const username = `${firstName} ${lastName}`;

        const user = await createUser(email, username, password);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default { register, login };