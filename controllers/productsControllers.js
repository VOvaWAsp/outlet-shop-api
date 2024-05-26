import { Types } from "mongoose"
 
import { Product } from "../services/productsServices.js"

export const getAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find(req.body);
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getProductById = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const addProduct = async(req, res, next) => {
    const product = new Product(req.body)
    try {
        await product.save();
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async(req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async(req, res, next) => {
    try {
        const { id } = req.params

        const valid = Types.ObjectId.isValid(id);
        if (!valid) return res.status(404).json('not found');

        if (Object.keys(req.body).length === 0) return res.status(404).json('please enter words');

        const product = await Product.findByIdAndUpdate(id, req.body, {new: true});

       return res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const updateProductInfo = async(req, res, next) => {
    const { color, url } = req.body
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json('dont found');
        product.images.push({color, url});
        await product.save()
       return res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const deleteProductInfo = async(req, res, next) => {
    const { color, url } = req.body
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json('dont found');
        product.images = product.images.filter(image => image.color !== color || image.url !== url);
        await product.save()
       return res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}