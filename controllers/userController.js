import { deleteUserById } from "../models/userModel.js";

export function deleteUser(req, res) {

  const userId = req.params.id;

  deleteUserById(userId);

  res.json({
    success: true,
    message: "User deleted successfully"
  });
}

export default deleteUser;