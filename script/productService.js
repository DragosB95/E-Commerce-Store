class ProductService{ // var productService = new ProductService();
    constructor(){
        this.productNotFoundMsg = 'Product not found';
        this.cartList = this.getCartProductsFromStorage();
        this.favoriteList = this.getFavoritesProductsFromStorage();
    }
    
    getFormatedProducts(products){
        var concatenatedProducts ='';

        products.forEach(product => {

            concatenatedProducts += 
            `
            <div class="productCard">
                <img onclick="openProduct(${product.id})" class="productImage" src="${product.productUrl}"/>
                <h2 class="productTitle">${product.name}</h2>
                <p class="productDescription">${product.description}</p>
                <div class="prices">
                    <p>Old Price:  <del>${product.price}</del></p>
                    <p id="newPrice">New Price:  ${product.discountPrice}</p>
                </div>
                <div class="productButtons">
                  <i class="bi bi-arrows-fullscreen" onclick="openProduct(${product.id})"></i>
                  <i class="bi bi-brush" onclick="updateProductById(${product.id})"></i>
                  <i class="bi bi-cart" onclick="addToCart(${product.id})"></i>
                  <i class="bi bi-heart" onclick="addToFavorites(${product.id})"></i>
                  <i class="bi bi-trash" onclick="removeProduct(${product.id})"></i>
              </div>
            </div>`
         });
         return concatenatedProducts;
    }

    getFormatedSearchProduct(products, filter){
        var concatenatedProducts ='';

        products
        .filter(filter)
        .forEach(product => {
            
            //pentru fiecare produs construieste urmatorul html
            concatenatedProducts += 
            `
            <div class="productCard">
                <img onclick="openProduct(${product.id})" class="productImage" src="${product.productUrl}"/>
                <h2 class="productTitle">${product.name}</h2>
                <p class="productDescription">${product.description}</p>
                <div class="prices">
                    <p>Old Price:  <del>${product.price}</del></p>
                    <p id="newPrice">New Price:  ${product.discountPrice}</p>
                </div>
                <div class="productButtons">
                  <i class="bi bi-arrows-fullscreen" onclick="openProduct(${product.id})"></i>
                  <i class="bi bi-brush" onclick="updateProductById(${product.id})"></i>
                  <i class="bi bi-cart" onclick="addToCart(${product.id})"></i>
                  <i class="bi bi-heart" onclick="addToFavorites(${product.id})"></i>
                  <i class="bi bi-trash" onclick="removeProduct(${product.id})"></i>
              </div>
            </div>`
         });

         return concatenatedProducts;
    }
    
    getFormatedProduct(product){
        if(product){
            return  `
            <div class="productPhoto col-9">
            <img class="productImage" src="${product.productUrl}"/>
            </div>
            <div class="productInfo col-6 mx-auto">
            <h3 class="col-6 mx-auto">${product.name}</h3>
            <br>
            <p class="col-6 mx-auto">${product.description}</p>
            <p class="col-2 mx-auto"><del>${product.price}</del></p>
            <p class="col-2 mx-auto">${product.discountPrice}</p>
            <div class="productRating col-3 mx-auto">${this.getNumberOfStars(product)}</div>
            </div>
            `;
            
        }
    }
    getNumberOfStars(product){
        let rating = product.rating.avgRating;
        let concatenatedStars ='';
        if(rating){
            for (let index = 1; index <= 5; index++) {
                if(index <= rating){
                    concatenatedStars += ` <span class="fa fa-star checked" onclick="addRating(${product.id}, ${index})"></span>`
                }else{
                    concatenatedStars += ` <span class="fa fa-star" onclick="addRating(${product.id}, ${index})"></span>`
                }
            }
            return concatenatedStars;
        }else{
            return `
            <span class="fa fa-star" onclick="addRating(${product.id}, 1)"></span>
            <span class="fa fa-star" onclick="addRating(${product.id}, 2)"></span>
            <span class="fa fa-star" onclick="addRating(${product.id}, 3)"></span>
            <span class="fa fa-star" onclick="addRating(${product.id}, 4)"></span>
            <span class="fa fa-star" onclick="addRating(${product.id}, 5)"></span> `;
           
        }
    }

    addRating(id, rating){
        let product = this.findProduct(id);
        if(product){
            product.ratings.push(parseInt(rating));
            this.updateStorage();
            return 'Rating added';
        }else{
            return 'Product not found';
        }
    }
    findProduct(id){
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
               return this.products[i];
            }
        }
        return null;
    }
    
    updateProductById(updatedProduct, id){
        let product = this.findProduct(id);
        if(product){
            product.name = updatedProduct.name;
            product.description = updatedProduct.description;
            product.price = updatedProduct.price;
            product.category = updatedProduct.category;
            product.dateAdded = new Date();
            this.updateStorage();
            return true;
           
        }else{
            return false;
        }
    }
    updateProductById(updatedProduct, id){
        httpService.updateProductById(updatedProduct, id);
    }
    
    updateCartStorage(){
        localStorage.setItem('cartProducts', JSON.stringify(this.cartList));
    }
    updateFavoritesStorage(){
        localStorage.setItem('favorites', JSON.stringify(this.favoriteList));
    }

    getCartProductsFromStorage(){
        let cartProducts =  JSON.parse(localStorage.getItem('cartProducts'));
        if(cartProducts){
            return cartProducts
        }else{
            return [];
        }
    }
    addProductToCart(product){
        this.cartList.push(product);
        this.updateCartStorage();
        return 'Product was added to cart'
    }
    addProductToFavorites(product){
        this.favoriteList.push(product);
        this.updateFavoritesStorage();
        return 'Product was added to favorites'
    }
    getProductCount(){
        return {
            cartCount: this.cartList.length,
            favoritesCount: this.favoriteList.length
        };
    }
    getFavoritesProductsFromStorage(){
        let products = JSON.parse(localStorage.getItem('favorites'));
        return products ? products : [];
    }
    getFavoritesFormated(){
        let concatenatedProducts = '';

        this.favoriteList.forEach(product => {
            concatenatedProducts += 
            `<div class="col border m-2">
                <p>${product.name} - ${product.price}
                    <button type="button" onclick="removeProductFromFavorite(${product.id})" class="btn-close" aria-label="Close"></button>
                </p>
            </div>
            `
        });
        return concatenatedProducts;
    }
    getCartFormated(){
        let concatenatedProducts = '';

        this.cartList.forEach(product => {
            concatenatedProducts += 
            `<div class="col border m-2">
                <p>${product.name} - ${product.price}
                    <button type="button" onclick="removeProductFromCart(${product.id})" class="btn-close" aria-label="Close"></button>
                </p>
            </div>
            `
        });
        return concatenatedProducts;
    }
    removeFromCart(id){
        for (let index = 0; index < this.cartList.length; index++) {
            const product = this.cartList[index];
            if(product.id == id){
                this.cartList.splice(index, 1);
                this.updateCartStorage();
                return `Product with id ${id} was removed`;
            }
        }
        return `Product with id ${id} doesn't exist`;

    }
    removeFromFavorite(id){
        for (let index = 0; index < this.favoriteList.length; index++) {
            const product = this.favoriteList[index];
            if(product.id == id){
                this.favoriteList.splice(index, 1);
                this.updateFavoritesStorage();
                return `Product with id ${id} was removed`;
            }
        }
        return `Product with id ${id} doesn't exist`;
    }

    removeAllProductsFromFavorites(){
        this.favoriteList.splice(0);
        this.updateFavoritesStorage();
        return 'All products have been removed from favorites'
    }
    removeAllProductsFromCart(){
        this.cartList.splice(0);
        this.updateCartStorage();
        return 'All products have been removed from the shopping cart'
    }
}


