import express from "express"
import { addProduct, deleteProduct, deleteProductInfo, getAllProducts, getProductById, updateProduct, updateProductInfo } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post('/', addProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.put("/:id", updateProduct)
productsRouter.put('/:id/productinfo', updateProductInfo);
productsRouter.delete('/:id/productinfo', deleteProductInfo);

export default productsRouter;