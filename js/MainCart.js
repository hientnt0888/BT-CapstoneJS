function getLocalStorage() {
    if (localStorage.getItem("DSSP") != null) {
        var array = JSON.parse(localStorage.getItem("DSSP"));
        console.log("🚀 ~ file: MainCart.js:6 ~ getLocalStorage ~ array:", array)
        var quality = JSON.parse(localStorage.getItem("Quality"))
        document.getElementById("spanMyCart").innerHTML = quality;
        myCart(array);
    }
}
getLocalStorage()
//Hiển thị sản phẩm trong giỏ hàng
function myCart(array) {
    var content = "";
    array.map(function (sp, index) {
        content += `
        <tr>
            <td class="id">${sp.id}</td>
            <td class="img"><img src="${sp.image}" alt="img products"></td>
            <td class="name">${sp.name}</td>
            <td class="quty"><btn  class= 'btn btn-primary soLuong' >-</btn> <span>1</span> <btn  class= 'btn btn-primary soLuong' >+</btn></td>
            <td class="price">${sp.price} $</td>
            <td class="total"></td>
            <td class="action"><btn class= 'btn btn-primary soLuong' >Buy</btn></td>
        </tr>`
    })
    document.getElementById("tableCart").innerHTML = content;

}