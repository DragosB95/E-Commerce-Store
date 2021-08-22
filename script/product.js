class Product{
    constructor(name, description, price ){
        this.name = name;
        this.description = description;
        this.price = price;
        this.discountPercent = 0;
        this.id = 0;
        this.imgUrl = '';
    }
   
    changePrice(price){
        if(price <= 0){
            return 'Price must be a positive number'; 
        }
        this.price = price;
        return `Price was updated, price is ${price}`;
    }
    changeDescription(description){
        if(description){
            this.description = description;
            return 'Description has changed';
        }
        return 'New Description must not be empty';
    }
    changeName(name){
        if(name){
            this.name = name;
            return 'Name has changed';
        }
        return 'New name must not be empty';
    }
    setStock(isInStock){//true/false
        this.isInStock = isInStock;
    }
    addDiscount(percent){
        this.discountPercent = percent;
    }
    changeCategory(category){
        if(category){
            this.category = category;
            return 'Category has changed';
        }
        return 'New category must not be empty';
    }
    addUrl(url){
        if(url){
            this.url = url;
            return 'url has changed';
        }
        return 'New url must not be empty';
    }
}
