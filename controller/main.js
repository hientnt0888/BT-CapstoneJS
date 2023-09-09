// xử lý modal 
$("#signUp_next").on("click", function () {
    $('#signIn').modal('hide');
});
$("#signUp_next").on("click", function () {
    $('#signUp').modal('show');
});

var products = new apiProduct();
// lấy danh sách sản phẩm
function layDanhSachSP() {
    products.pro.then(function (Response) {
        hienThiSP(Response.data.content);
        console.log("🚀 ~ file: main.js:15 ~ Response.data.content:", Response.data.content)

    });
}
layDanhSachSP()

function hienThiSP(mang) {
    var imgShoe = document.querySelectorAll(".toppick");
    var nameShoe = document.querySelectorAll(".nameshoe");
    var priceShoe = document.querySelectorAll(".priceshoe")
    for (var i = 0; i < imgShoe.length; i++) {
        imgShoe[i].innerHTML = `<img src="${mang[i].image}" alt="img products">`;
        nameShoe[i].innerHTML = `${mang[i].name}`;
        priceShoe[i].innerHTML = `${mang[i].price}$`;
    };

}
