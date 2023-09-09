function ApiProduct() {
  this.apiProducts = axios({
    method: 'get',
    url: 'https://shop.cyberlearn.vn/api/Product',
  });
  this.apiDisplayProds = function (id) {
   return axios({
      method: 'get',
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`
    });
  }
}
