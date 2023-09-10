

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


    if (isValid) {
        var account = new Account(userName, email, phone,pass);
        
        dsa.themAccount(account);
      
        setLocalStorage();

    }

 queryELE("#logIn").checked();  
}
queryELE("#btnSignUp").onclick = themAccount;

