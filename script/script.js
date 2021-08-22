var userService = new UserService();
var commonService = new CommonService();
var productService = new ProductService();
var httpService = new HttpService();

function login(){
   let email = document.getElementById('emailId').value;
   let password = document.getElementById('passwordId').value;

   httpService.login(email, password);
}
function register(){
   //colectam datele din inputuri
   let name =  document.getElementById("nameId").value;
   let email = document.getElementById("emailId").value;
   let age = Number(document.getElementById("ageId").value);
   let gender = document.getElementById("genderId").value;
   let password = document.getElementById("passwordId").value;

   let profile = {"email": email, "name": name, "age": age, "gender": gender, "password": password};

   httpService.register(profile);
}

function logOut(){
   //la logout trebuie sa stergem proprietatea care ne authentifica si dupa care ne dam
   //seama daca un utilizator este logat
   window.localStorage.removeItem('token');

   document.location.href = "login.html";
}

//aceasta functie se executa pe evenimentul onload pe pagina de produse
function authorize(){
   //verificam daca proprietatea care se seteaza atunci cand ne logam exista in memoria browser-ului
   //daca exista atunci ne dam seama ca utilizatorul este logat
   let isAuthenticated = window.localStorage.getItem('token');
   if(!isAuthenticated){
      //daca utilizatorul nu este logat il trimitem la pagina de logare
       document.location.href = "login.html";
   }
}

function showProducts(){
   let promise = httpService.getProducts();
   promise
   .then(products => {
      let formatedProducts = productService.getFormatedProducts(products);
      document.getElementById('productsListId').innerHTML = formatedProducts;
  })
  .catch(error => {
      commonService.showInfoMessage(error);
  });
}


function showProfile(){
   httpService.getProfile()
   .then(profile => {
      let response = userService.getFormatedProfileDetail(profile);
   
      document.getElementById("profileNameId").innerHTML = profile.name;
      document.getElementById("profileEmailId").innerHTML = profile.email;
      document.getElementById("profilePasswordId").innerHTML = profile.password;
      document.getElementById("profileGenderId").innerHTML = profile.gender;
      document.getElementById("profileAgeId").innerHTML = profile.age;
   })
   .catch(error => {
         commonService.showInfoMessage(error);
   });
}

function removeProduct(id){

httpService.deleteProductById(id);
showProducts();

}

//functia este apelata cand se da click pe un produs
function openProduct(id){
   window.commonService.setToStorage('productId', id);
   document.location.href = "productDetails.html";
}
//funtia este apelata la onload pe pagina productDetails
function showProduct(){
   let productId = commonService.getFromStorage('productId');
   if(productId){
      let promise = httpService.getProductbyId(productId)
      promise
        .then(product => {
            let formatedProduct = productService.getFormatedProduct(product);
            document.getElementById('productDetailId').innerHTML = formatedProduct;
        })
        .catch(error => {
            commonService.showInfoMessage(error);
        });
   }
}

function updateProductById(id){
   window.localStorage.setItem('updateProductId', id);
   document.location.href = "updateProduct.html";
}

function setProductDetails(){
   let productId = commonService.getFromStorage('updateProductId');

   let promise = httpService.getProductbyId(productId)
      promise
        .then(product => {
         document.getElementById('nameId').value = product.name; 
         document.getElementById('descriptionId').value = product.description; 
         document.getElementById('priceId').value = product.price; 
         document.getElementById('productUrlId').value = product.productUrl;
         document.getElementById('dicountPriceId').value = product.discountPrice;
        })
        .catch(error => {
            commonService.showInfoMessage(error);
        });
}

function updateProduct(){
   let productId = commonService.getFromStorage('updateProductId');

   let name = document.getElementById('nameId').value; 
   let description =  document.getElementById('descriptionId').value; 
   let price =  document.getElementById('priceId').value; 
   let productUrl =  document.getElementById('productUrlId').value; 
   let discountPrice = document.getElementById('dicountPriceId').value;
   let product = {"id": Number(productId),"name": name, "description": description, "price": price, "productUrl": productUrl, "discountPrice": discountPrice};

   httpService.updateProduct(product);
}

function addToFavorites(id){
   let promise = httpService.getProductbyId(id);
 
   promise
   .then(product => {
      let response = productService.addProductToFavorites(product);
      commonService.showInfoMessage(response)
      updateProductsCount();  
   })
   .catch (error => {
      commonService.showInfoMessage(error)
   })
}

function addToCart(id){
   let promise = httpService.getProductbyId(id)
 
   promise
   .then(product => {
      let response = productService.addProductToCart(product)
      commonService.showInfoMessage(response)
      updateProductsCount();  
   })
   .catch (error => {
      commonService.showInfoMessage(error)
   })
}

function updateProductsCount(){
   let response = productService.getProductCount();
   document.getElementById('cartItemsId').innerHTML = response.cartCount;
   document.getElementById('favoritesItemsId').innerHTML = response.favoritesCount;
   document.getElementById('productCountId').innerHTML = `Summer Sale is ON! Up to 30% off on all PC's!`;
}

function openCartItems(){
   let formatedCart = productService.getCartFormated();
   commonService.showModal('Cart', formatedCart, 'Pay');
}

function openFavoriteItems(){
   let formatedFavorites = productService.getFavoritesFormated();
   commonService.showModal('Favorite',formatedFavorites, 'Remove all');
}

function removeProductFromFavorite(id){
   let response = productService.removeFromFavorite(id);
   openFavoriteItems();
   commonService.showInfoMessage(response);
   updateProductsCount();
}

function removeProductFromCart(id){
   let response = productService.removeFromCart(id);
   openCartItems();
   commonService.showInfoMessage(response);
   updateProductsCount();
}

function searchProducts(){
   let query = document.getElementById('search-bar-id').value;
   httpService.getProducts()
   .then(products => {
      let productsHtml = productService.getFormatedSearchProduct(products, 
         product => product.name.toLowerCase().includes(query.toLowerCase()) || product.price == query);

      document.getElementById('productsListId').innerHTML = productsHtml;
   })
  .catch(error => {
      commonService.showInfoMessage(error);
  });
}

function searchProductsByPrice(){
   let min = document.getElementById('search-bar-pricemin-id').value;
   let max = document.getElementById('search-bar-pricemax-id').value;
   
   httpService.getProducts()
   .then(products => {
      let productsHtml = productService.getFormatedSearchProduct(products, 
         product => 
         product.price >= Number(min ? min: 0) && 
         product.price <= Number(max ? max: 99999));
         
      document.getElementById('productsListId').innerHTML = productsHtml;
   })
  .catch(error => {
      commonService.showInfoMessage(error);
  });
}

function addRating(id, rating){
   httpService.addRating(id, rating)
   showProduct();
}

function addReview(){
   let productId = commonService.getFromStorage('productId');

   let title = document.getElementById("titleId").value;
   let description = document.getElementById("descriptionId").value;

   httpService.addReview(title, description, productId);
}

function addProduct(){
   let name = document.getElementById('nameId').value; 
   let description =  document.getElementById('descriptionId').value; 
   let price =  document.getElementById('priceId').value;
   let discountPrice =  document.getElementById('discountPriceId').value;
   let productUrl =  document.getElementById('productUrlId').value;

   httpService.addProduct(name, description, price, discountPrice, productUrl);
}

function removeAllFromFavorites(){
   let response = productService.removeAllProductsFromFavorites();
   commonService.showInfoMessage(response);
   updateProductsCount();
}

function removeAllFromCart(){
   let response = productService.removeAllProductsFromCart();
   commonService.showInfoMessage(response);
   updateProductsCount();
}

function getProductByID(id){
   httpService.getProductById(id);
}