import { Router } from "express";
import { products } from "../ProductManager.js";
const router = Router();


router.get('/home', async(req,res)=> {
    try {
        const prod = await products.getProducts(req.query);
        res.render('home', {prod});

    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});

router.get('/addProd' , (req,res) => {

    res.render('addProd')
});

router.get('/home/:idProd', async (req, res) => {

    const {idProd} = req.params;
    try {
        const product = await products.getProductById(+idProd);
        res.render('productAdded', {product})
    } catch (err) {
        
    }

});

router.get('/realTimeProducts', async (req, res) => {
    
    try {
        const prod = await products.getProducts(req.query);
        res.render("realTimeProducts", {prod});

    } catch (err) {
        res.status(500).json({message:err.message});
    }
    
});


export default router;



