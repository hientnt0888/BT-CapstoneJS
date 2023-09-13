// xử lý modal 
// $("#signUp_next").on("click", function () {
//     $('#signIn').modal('hide');
// });
// $("#signUp_next").on("click", function () {
//     $('#signUp').modal('show');
// });

var listProducts = new ListProducts();
var apiSP = new ApiProduct();

// lấy danh sách sản phẩm từ backend
function layDanhSachSP() {
    apiSP.apiProducts.then(function (Response) {
        hienThiSP(Response.data.content);
    });
    // setLocalStorage("DSSP", listProducts.arrayProducts);
    // setLocalStorage("Quality", quantity)
    // getLocalStorage()
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
             <div style = "text-align: center">
                <img src=${product.image} alt='img' style='width: 70%;'>
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
// function clickAdd(id) {
//     var checkID = listProducts.arrayProducts.findIndex(function (sp) {
//         return id == sp.id;
//     })

//     //Kiểm tra có sp nào được click mua nhiều lần không nếu có thì không đẩy vào arrayProducts
//     var checkUser = document.getElementById("spanUser").textContent;
//     apiSP.apiDisplayProds(id).then(function (Response) {
//         console.log("🚀 ~ file: main.js:83 ~ Response:", Response)
//         if (checkUser != "Login") {
//             if (checkID == -1) {
//                 listProducts.pushProducts(Response.data.content);
               
//                 // window.open("../view/cart.html")
//                 quantity++;
//                 alert("Sản phẩm được thêm thành công")
//             } else {
//                 // quantity++;
//                 alert("Sản phẩm được thêm thành công")
//             }
//         } else{
//             alert("Vui lòng Đăng Nhập")
//         }
//         setLocalStorage("DSSP", listProducts.arrayProducts);
//         setLocalStorage("Quality", quantity)
    
//         document.getElementById("spanMyCart").innerHTML = quantity;

//     });
// }
function clickAdd(id) {
    var existingData = localStorage.getItem("DSSP");
    console.log("🚀 ~ file: main.js:109 ~ clickAdd ~ existingData:", existingData)
    var existingArray = existingData ? JSON.parse(existingData) : [];
    var quantity = existingArray.length;
    console.log("🚀 ~ file: main.js:112 ~ clickAdd ~ quantity:", quantity)
    // Tìm sản phẩm trong danh sách hiện có (nếu có)
    var existingProduct = existingArray.find(function (sp) {
        return id == sp.id;
    });

    var checkUser = document.getElementById("spanUser").textContent;
    apiSP.apiDisplayProds(id).then(function (Response) {
        console.log("🚀 ~ file: main.js:83 ~ Response:", Response);
        if (checkUser != "Login") {
            if (!existingProduct) {
                // Thêm sản phẩm vào danh sách nếu không tồn tại
                existingArray.push(Response.data.content);
            }
            // Tăng số lượng sản phẩm
            // quantity++;
            alert("Sản phẩm được thêm thành công");
        } else {
            alert("Vui lòng Đăng Nhập");
        }

        // Lưu danh sách và số lượng sản phẩm vào localStorage
        localStorage.setItem("DSSP", JSON.stringify(existingArray));
        localStorage.setItem("Quality", quantity);

        document.getElementById("spanMyCart").innerHTML = quality;

    });
}

// Load danh sách từ localStorage khi trang được tải lại
var existingData = localStorage.getItem("DSSP");
if (existingData) {
    var existingArray = JSON.parse(existingData);
    // Sử dụng danh sách này để hiển thị số lượng sản phẩm trong giỏ hàng khi trang được tải lại
    document.getElementById("spanMyCart").innerHTML = existingArray.length;
}


//set LoalStorage
function setLocalStorage(name, array) {
   return localStorage.setItem(name, JSON.stringify(array));
}
// get LocalStorage
// function getLocalStorage() {
//     if (localStorage.getItem("DSSP") != null) {
//         var array = JSON.parse(localStorage.getItem("DSSP"));
//         var quality = JSON.parse(localStorage.getItem("Quality"))
//         document.getElementById("spanMyCart").innerHTML = quality;
//     }
// }
// getLocalStorage();  

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








  


