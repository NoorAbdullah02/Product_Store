import { Router } from "express";

import * as productController from '../controllers/productController';
import { checkValiditi } from "../middleware/checkValidUser";
import { upload } from "../middleware/upload"


const router = Router();


router.get('/', productController.getAllProducts);

router.get('/:my', checkValiditi, productController.getMyProducts);



// router.post('/create', checkValiditi, productController.createProduct);


router.post(
    "/create",
    checkValiditi,
    upload.single("image"), // <-- image field name
    productController.createProduct
);



router.get('/:id', productController.SingleProduct);

router.put('/:id', checkValiditi, productController.updateproduct);

router.delete('/:id', checkValiditi, productController.deleteProduct);


export default router; 