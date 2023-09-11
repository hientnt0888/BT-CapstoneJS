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
                <button class= 'btn btn-warning' onclick= 'clickMore(${products.id})'>Add</button>
                <button class= 'btn btn-primary' onclick= 'hienThiThongTinSP(${products})'>More</button>
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
    var checkUser = document.getElementById("spanUser").textContent;
    apiSP.apiDisplayProds(id).then(function (Response) {
        if (checkID == -1 && checkUser != "Login") {
            console.log("🚀 ~ file: main.js:48 ~ checkUser:", checkUser)
            quantity++;
            listProducts.pushProducts(Response.data.content);
            setLocalStorage("DSSP", listProducts.arrayProducts);
            window.open("../view/cart.html")
            // window.open("../view/cart.html");
        } else {
            quantity++;
            alert("Vui lòng Đăng Nhập")
        }
        setLocalStorage("Quality", quantity)
        document.getElementById("spanMyCart").innerHTML = quantity;
        console.log("🚀 ~ file: main.js:57 ~ quantity:", quantity)

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

// Hiển thị chi tiết sản phẩm
function hienThiThongTinSP(product) {
    var content = `
        <div class="container">
                        <div class="form__popupsp">
                            <div class="img__sp">
                                <img src="${pro.image}" alt="">
                            </div>
                            <div class="thongtin__sp">
                                <h2>${product.name}</h2>
                                <p>${product.description}</p>
                                <h4>SIZE</h4>
                                <div>
                                    <button class="bt--size">37</button>
                                    <button class="bt--size">38</button>
                                    <button class="bt--size">39</button>
                                    <button class="bt--size">40</button>
                                    <button class="bt--size">41</button>
                                    <button class="bt--size">42</button>
                                </div>
                                <h3  class="price-red">$ ${product.price}</h3>
                                <span class=verd13>
                                    <button class="chitetsp__bt__updown" onclick="HmFunction()"><b>-</b></button>
                                </span>
                                <input type="number" id="HNumber" class="verd15" value="0" min="1">
                                <span class=verd13>
                                    <button class="chitetsp__bt__updown" onclick="HaFunction()"><b>+</b></button>
                                </span>
                                <button class="chitetsp__bt" onclick="addGioHang(${product.id - 1})">add to cart</button>
                                </span><br>
                                <button class="chitetsp__bt" onclick="addGioHang(${product.id - 1})">add to cart</button>
                            </div>
                        </div>

                    </div>
        `;

    document.querySelector("#popup-ctsp").innerHTML = content;
}



