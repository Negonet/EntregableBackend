import fs from 'fs'

const path = 'productos.json'

class ProductManager {

    async getProducts(queryObj){
        const {limit} = queryObj;
        try {
            if (fs.existsSync(path)) {
                const productFile = await fs.promises.readFile(path, 'utf-8')
                const productData = JSON.parse(productFile)
                return limit ? productData.slice(0, +limit) : productData
                
            } else {
                return []
            }
        } catch (err) {
            return err
        }    
    }
        
    async addNew(product){
        try {
            const products = await this.getProducts({})
            let id
            if (!products.length){
                id=1
            } else {
                id=products[products.length-1].id+1
            }
            const addProduct = {...product,status:true,id}
            const found = products.find((item) => 
                 item.code === product.code) 
                if (!found) {
                    products.push(addProduct)
                    await fs.promises.writeFile(path, JSON.stringify(products))
                    return addProduct
                } else {
                    
                    console.log('producto ya ingresado')
                    console.log(addProduct)
                }
        } catch (err) {
            return err 
        }}
    async getProductById(id){
        try {
            const product = await this.getProducts()
            const find = product.find(product => product.id === id)
        
            if (find) {
                return find   
            } else {
            console.log('Not Found')
            }

        } catch (err){
            return err
        }}

    async deleteProduct(id){
        try{
            const products = await this.getProducts()
            const newProducts = products.filter(prod => prod.id!==id)
            await fs.promises.writeFile(path,JSON.stringify(newProducts))
            return newProducts

        } catch(err) {
            return err
        }
    }
}



async function productinf () {
    const product = new ProductManager()
    //await product.addNew('Taza','blanca',40,'tazablanca',3,3,'basar')
    //await product.addNew('Plato','gris',50,'platogris',5,5,'basar')
    //await product.addNew('Tenedor','inox',30,'tenedorinox',4,3,'basar')
    //await product.deleteProduct(3)
    //await product.getProductById(1)
    //await product.getProducts()
    
}

productinf()

export const products = new ProductManager();