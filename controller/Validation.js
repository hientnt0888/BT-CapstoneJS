
function Validation() {
    this.checkEmpty = function (value, message, spanID) {
        if (value.trim() != "") {
           
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
    
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    this.checkUserName = function (value, message, spanID, mangSV) {
        var isExist = mangAccount.some(function (account) {
            return account.userName == value.trim()
        });

        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none";
        return true;

    } 
    this.checkEmail = function (value, message, spanID) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(pattern)) {
            //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        // không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;

    }
    this.checkPhone = function(value, message, spanID){
        var pattern = /^[0-9]+$/;
        if(value.match(pattern) && value.length >=9 && value.length <=11){
              //hợp lệ 
              document.getElementById(spanID).innerHTML = "";
              document.getElementById(spanID).style.display = "none";
              return true;
        }

          // không hợp lệ
          document.getElementById(spanID).innerHTML = message;
          document.getElementById(spanID).style.display = "block";
          return false;
    }
    this.checkPass = function(value, message, spanID){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(value.match(pattern) && value.length >=9 && value.length <=11){
              //hợp lệ 
              document.getElementById(spanID).innerHTML = "";
              document.getElementById(spanID).style.display = "none";
              return true;
        }

          // không hợp lệ
          document.getElementById(spanID).innerHTML = message;
          document.getElementById(spanID).style.display = "block";
          return false;
    }
  
  

}