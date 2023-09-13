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
            <div class='col-4' >
                <div class= 'products__img'>
                     <img src="${products.image}" alt="img products">
                </div>
                <h3>${products.name}</h3>
                <p>${products.price}$</p>
                <button class= 'btn btn-warning' onclick= 'clickAdd(${products.id})'>Add</button>
                <button class= 'btn btn-primary' data-toggle="modal" data-target="#exampleModal" onclick = "clickMore(${products.id})">More</button>
            </div > `
    });
    document.getElementById("displayProducts").innerHTML = content;
}

// Hiển thị chi tiết sản phẩm
function clickMore(id) {
    apiSP.apiProducts.then(function (Response) {
        var product = Response.data.content.find(function (sp) {
            return id == sp.id;
        })
        console.log("🚀 ~ file: main.js:45 ~ product ~ product:", product)
        var size = ""
        JSON.parse(product.size).map(function (sz, index) {
            size += `
                <button class='btn btn-info'>${sz}</button>
            `
            console.log("🚀 ~ file: main.js:65 ~ size:", size)
        });

        var content = `
             <div>
                <img src=${product.image} alt='img' style='width: 100%;'>
            </div>
            <div>
                 <p>'${product.description}'</p>
            </div>
            <div>
                ${size}
            </div>
           `
        document.getElementById("chiTietSp").innerHTML = content;
        document.getElementById("hNameShoe").innerHTML = product.name + "<br>" + product.price + "$";
        document.getElementById("btnPopUp").innerHTML = `
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick='clickAdd(${id})'>Add to cart</button>
        `
    });
}

//Khi click add thì thêm sản phẩm vào arrayProducts và lưu xuống localstorage
function clickAdd(id) {
    var checkID = listProducts.arrayProducts.findIndex(function (sp) {
        return id == sp.id;
    })

    //Kiểm tra có sp nào được click mua nhiều lần không nếu có thì không đẩy vào arrayProducts
    var checkUser = document.getElementById("spanUser").textContent;
    apiSP.apiDisplayProds(id).then(function (Response) {
        if (checkUser != "Login") {
            if (checkID == -1) {
                listProducts.pushProducts(Response.data.content);
                setLocalStorage("DSSP", listProducts.arrayProducts);
                // window.open("../view/cart.html")
                quantity++;
                alert("Sản phẩm được thêm thành công")
            } else {
                quantity++;
                alert("Sản phẩm được thêm thành công")
            }
        } else{
            alert("Vui lòng Đăng Nhập")
        }

        setLocalStorage("Quality", quantity)
        document.getElementById("spanMyCart").innerHTML = quantity;

    });
}

//set LoalStorage
function setLocalStorage(name, array) {
    localStorage.setItem(name, JSON.stringify(array));
}

//Hiển thị username
function userName() {
    if (localStorage.getItem("user") != null) {
        var user = JSON.parse(localStorage.getItem("user"))
        document.getElementById("spanUser").innerHTML = user.data.content.email;
    }
}
userName()

//logout
function logout() {
    localStorage.removeItem("user");
    window.location.reload();
}
document.getElementById("btnLogout").onclick = logout;




// cart 


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  


