// sign 
var dsa = new DanhSachAccount();
var validation = new Validation();
function queryELE(query) {
    return document.querySelector(query);
}
function setLocalStorage() {
    localStorage.setItem("DSA", JSON.stringify(dsa.mangAccount));
}
function getLocalStorage() {
    if (localStorage.getItem("DSA") != null) {
        dsa.mangAccount = JSON.parse(localStorage.getItem("DSA"));
    }

}

getLocalStorage();

function themAccount() {
    var userName = queryELE("#userName").value;
    var email = queryELE("#email").value;
    var phone = queryELE("#phone").value;
    var pass = queryELE("#password").value;
   

    var isValid = true;


    // userName
    isValid &= validation.checkEmpty(userName, "Username không được để trống", "tbNameUp") && validation.checkUserName(userName, "Username không được trùng", "tbNameUp",dsa.mangAccount); 

    // email 
    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmailUp") && validation.checkEmail(email,"Email không hợp lệ","tbEmailUp"); 
    // phone 
    isValid &= validation.checkEmpty(phone, "Phone không được để trống", "tbPhoneUp") && validation.checkPhone(phone,"Phone không hợp lệ","tbPhoneUp"); 
    // pass
    isValid &= validation.checkEmpty(pass, "Password không được để trống", "tbPasswordUp") && validation.checkPass(pass,"Password không hợp lệ","tbPasswordUp");

    console.log(isValid)

    if (isValid) {
        var account = new Account(userName, email, phone,pass);
        
        dsa.themAccount(account);
      
        setLocalStorage();
        queryELE("#logIn").click();

    }

   
}
queryELE("#btnSignUp").onclick = themAccount;

function dangNhap() {
    var userName1 = queryELE("#userName1").value;
    var pass1 = queryELE("#password1").value;

    var isValid = true;
    isValid &= validation.checkEmpty(userName1, "Username không được để trống", "tbNameIn")&& validation.checkUserName1(userName1, "Tài khoản chưa được đăng ký", "tbNameIn",dsa.mangAccount);

    isValid &= validation.checkEmpty(pass1, "Password không được để trống", "tbPasswordIn")&& validation.checkPass1(pass1, "Password không đúng", "btnSignIn",dsa.mangAccount);




}
queryELE("#btnSignIn").onclick = dangNhap;