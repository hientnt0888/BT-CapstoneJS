function ListProducts() {
    this.arrayProducts = [];
    this.pushProducts = function (product) {
      return  this.arrayProducts.push(product);
    }
}