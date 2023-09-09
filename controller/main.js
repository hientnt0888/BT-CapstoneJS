// xử lý modal 
$("#signUp_next").on("click", function () {
    $('#signIn').modal('hide');
});
$("#signUp_next").on("click", function () {
    $('#signUp').modal('show');
});

var apiSP = new ApiProduct();
var listProducts = new ListProducts();

// lấy danh sách sản phẩm từ backend
function layDanhSachSP() {
    apiSP.apiProducts.then(function (Response) {
        hienThiSP(Response.data.content);
        console.log("🚀 ~ file: main.js:15 ~ Response.data.content:", Response.data.content)
    });
}
layDanhSachSP()

//Hiển thị danh sách sản phẩm
function hienThiSP(mang) {
    var content = "";
    mang.map(function (products, index) {
        content += `
            <div class='col-4'>
                <div class= 'products__img'>
                     <img src="${products.image}" alt="img products">
                </div>
                <h3>${products.name}</h3>
                <p>${products.price}$</p>
                <button class= 'btn btn-info' onclick= 'clickMore(${products.id})'>More</button>
                <button class= 'btn btn-primary'>Buy</button>
            </div>`
    });
    document.getElementById("displayProducts").innerHTML = content;
}

//Khi click more thì sẽ sang trang cart và set local storage
function clickMore(id) {
    apiSP.apiDisplayProds(id).then(function (Response) {
      
        listProducts.pushProducts(Response.data.content);
        window.open("../view/cart.html");
        setLocalStorage();
        getLocalStorage()
    });
}

//Hiển thị sản phẩm trong giỏ hàng


//set Loal Storage
function setLocalStorage() {
    localStorage.setItem("DSSP", JSON.stringify(listProducts.arrayProducts));
}

//get local storage
function getLocalStorage() {
    if (localStorage.getItem("DSSP") != null) {
        listProducts.arrayProducts = JSON.parse(localStorage.getItem("DSSP"));
        myCart(listProducts.arrayProducts);
        console.log("🚀 ~ file: main.js:63 ~ getLocalStorage ~ listProducts.arrayProducts:", listProducts.arrayProducts)
    }
}
getLocalStorage()
function myCart(array) {
    console.log("🚀 ~ file: main.js:68 ~ myCart ~ array:", array)
    var info = `
       <tr>
           <td>${array.id}</td>
       </tr>`
       document.getElementById("tableCart").innerHTML = info;
}