var count = 1;
function getLocalStorage() {
    if (localStorage.getItem("DSSP") != null) {
        var array = JSON.parse(localStorage.getItem("DSSP"));
        var quatity = array.length;
        document.getElementById("spanMyCart").innerHTML = quatity;
        myCart(array);
    }
}
// tăng số lượng
function quantityRise(id) {
    count++
    document.getElementById(`span${id}`).innerHTML = count;
}
// Giảm số lượng
function quantityLower(id) {
    if (count > 1) {
        count--
        document.getElementById(`span${id}`).innerHTML = count;
    }

}
getLocalStorage()
//Hiển thị sản phẩm trong giỏ hàng
function myCart(array) {
    var content = "";
    array.map(function (sp, index) {
        content += `
        <tr>
            <td  >${sp.id}</td>
            <td style="text-align: center"><img src="${sp.image}" alt="img products" style="width: 30%" ></td>
            <td >${sp.name}</td>
            <td ><btn  class= 'btn btn-primary' onclick="quantityLower(${sp.id})">-</btn> <span id='span${sp.id}'>${count}</span> <btn  class= 'btn btn-primary' onclick="quantityRise(${sp.id})">+</btn></td>
            <td >${sp.price} $</td>
            <td ></td>
            <td ><btn  class= 'btn btn-primary' onclick="deleteProduct(${sp.id})">Delete</btn></td>
        </tr>`
    })
    document.getElementById("tableCart").innerHTML = content;
}

// Chức năng xóa sản phẩm
function deleteProduct(id) {
    var DSSP = localStorage.getItem("DSSP")
    if (DSSP) {
        DSSP = JSON.parse(DSSP);
        var indexXoa = DSSP.findIndex(function (sp) {
            return id == sp.id;
        });
        if (indexXoa != -1) {
            DSSP.splice(indexXoa, 1);
            localStorage.setItem("DSSP", JSON.stringify(DSSP));
        }
    }
    getLocalStorage()
}

