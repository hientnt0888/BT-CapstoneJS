// xử lý modal 
// $("#signUp_next").on("click", function () {
//     $('#signIn').modal('hide');
// });
// $("#signUp_next").on("click", function () {
//     $('#signUp').modal('show');
// });

var listProducts = new ListProducts();
var apiSP = new ApiProduct();
var quantity = 0;
// lấy danh sách sản phẩm từ backend
function layDanhSachSP() {
    apiSP.apiProducts.then(function (Response) {
        hienThiSP(Response.data.content);
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
                <button class= 'btn btn-warning'><a href="../view/cart.html" target="_blank" onclick= 'clickMore(${products.id})'>Add</a></button>
                <button class= 'btn btn-primary'>More</button>
            </div>`
    });
    document.getElementById("displayProducts").innerHTML = content;
}

//Khi click more thì thêm sản phẩm vào arrayProducts và lưu xuống localstorage
function clickMore(id) {
    var checkID = listProducts.arrayProducts.findIndex(function (sp) {
        return id == sp.id;
    })
    console.log("🚀 ~ file: main.js:43 ~ checkID ~ checkID:", checkID)
    //Kiểm tra có sp nào được click mua nhiều lần không nếu có thì không đẩy vào arrayProducts

    apiSP.apiDisplayProds(id).then(function (Response) {
        if (checkID == -1) {
            quantity++;
            listProducts.pushProducts(Response.data.content);
            setLocalStorage("DSSP", listProducts.arrayProducts);
            // window.open("../view/cart.html");
        } else {
            quantity++;
        }
        setLocalStorage("Quality", quantity)
        document.getElementById("spanMyCart").innerHTML = quantity;
        console.log("🚀 ~ file: main.js:57 ~ quantity:", quantity)

    });
}




//set Loal Storage
function setLocalStorage(name, array) {
    localStorage.setItem(name, JSON.stringify(array));
}



