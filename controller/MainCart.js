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
            <td>${sp.id}</td>
            <td><img src="${sp.image}" alt="img products"></td>
            <td>${sp.name}</td>
            <td><btn  class= 'btn btn-primary'>-</btn> <span>1</span> <btn  class= 'btn btn-primary'>+</btn></td>
            <td>${sp.price} $</td>
            <td></td>
            <td><btn class= 'btn btn-primary'>Buy</btn></td>
        </tr>`
    })
    document.getElementById("tableCart").innerHTML = content;

}