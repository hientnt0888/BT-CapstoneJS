// // sign in
var validation = new Validation();
function themAccount() {
    var name = document.querySelector("#userName").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;
    var password = document.querySelector("#password").value;
    var gioiTinh = document.querySelector("#gioiTinh").value;

    var gender = kiemTraGioiTinh(gioiTinh);
    var isValid = true;
    isValid &= validation.checkEmpty(email, "Tài Khoản không được để trống", "tbEmailUp") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmailUp")
    isValid &= validation.checkEmpty(password, "Mật khẩu không được để trống", "tbPasswordUp") && validation.checkMatKhau(password, "Mật khẩu từ 6-10 ký tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa", "tbPasswordUp");
    isValid &= validation.checkEmpty(name, "Họ tên không được để trống", "tbNameUp") && validation.checkHoTen(name, "Họ tên không hợp lệ", "tbNameUp");
    isValid &= validation.checkEmpty(phone, "Số điện thoại không được để trống", "tbPhoneUp") && validation.checkSDT(phone, "Số điện thoại không hợp lệ ", "tbPhoneUp");
    if (isValid) {
        var user = new User(email, password, name, gender, phone);
        console.log(user)
        var promiseObj = axios({
            method: 'post',
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            data: user
        });
        promiseObj.then(function (result) {
            console.log(result);
            alert(result.data.message)
            // if (result) { window.location.href = "../view/dangnhap.html"; }

        }).catch(function (error) {
            console.log(error);
            alert(error.response.data.message)
        });

    }


}
document.querySelector("#btnSignUp").onclick = themAccount;

function kiemTraGioiTinh(gioiTinh) {
    var check = null
    if (gioiTinh == "Nam" || gioiTinh == "Nữ") {
        check = true ;
    } else if (gioiTinh == "") {
        // alert("Chọn giới tính")
    }
    else {
        check = false ;

    }
    return check
}

//Login
function setlocal(message, content) {
    localStorage.setItem(message, JSON.stringify(content))
}
function loginIn() {
    var email = document.getElementById("userName1").value;
    var password = document.getElementById("password1").value;
    var isValid = true;
    isValid &= validation.checkEmpty(email, "Tài Khoản không được để trống", "tbNameIn");
    isValid &= validation.checkEmpty(password, "Mật khẩu không được để trống", "tbPasswordIn") && validation.checkMatKhau(password, "Mật khẩu từ 6-10 ký tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa", "tbPasswordIn");
    if (isValid) {
        var userLog = new User(email, password);
        var promiseObj = axios({
            method: 'post',
            url: 'https://shop.cyberlearn.vn/api/Users/signin',
            data: userLog
        });
        promiseObj.then(function (result) {
            console.log(result);
            if (result) {
                window.location.href = "../index.html",
                    setlocal("user", result)
            }
        }).catch(function (error) {
            console.log(error);
            alert(error.response.data.message)
        });
    }
}
document.getElementById("btnSignIn").onclick = loginIn;