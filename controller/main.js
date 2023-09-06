// xử lý modal 

// $("#register").on( "click", function() {
//     $('#signIn').modal('hide');  
// });
// $("#register").on( "click", function() {
//     $('#signUp').modal('show');  
// });


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
