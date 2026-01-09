import { Router } from "express";
import { registerUser, loginUser } from '../controllers/userController'
import { upload } from "../middleware/upload";

const router = Router();


//router.post('/register', registerUser);

router.post(
    "/register",
    upload.single("image"), // 👈 profile image
    registerUser
);


router.post('/login', loginUser);




export default router; 