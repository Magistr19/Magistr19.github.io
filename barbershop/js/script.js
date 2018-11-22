var loginLink = document.querySelector(".login");
var popUpLogin = document.querySelector(".modal-login");
var loginForm = popUpLogin.querySelector("form");
var closeLogin = document.querySelector(".modal-login .close-button");
var mapLink = document.querySelector(".how-to-find-button");
var mapInFotter = document.querySelector(".how-to-find");
var popUpMap = document.querySelector(".modal-map");
var closeMap = document.querySelector(".modal-map .close-button");
var overLay = document.querySelector(".overlay");
var inputLogin =  popUpLogin.querySelector("[name=login-field]");
var inputPassword =  popUpLogin.querySelector("[name=password-field]");
var loginCheckBox = popUpLogin.querySelector("[type=checkbox]");
var loginStorage;
var rememberStorage;
var isStorageSupport = true;

try {
	loginStorage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}

if (isStorageSupport) {
	rememberStorage = localStorage.getItem("rememberMe");
}



loginLink.addEventListener("click", function (evt) {
	evt.preventDefault();
	popUpLogin.classList.add("modal-show","modal-login-show");
	overLay.classList.add("modal-show");
	if (!loginStorage || rememberStorage == '0') {
		inputLogin.focus();
		inputLogin.value = '';
	} else {
		inputLogin.value = loginStorage;
		inputPassword.focus();
	}
	if (rememberStorage == 1) {
		loginCheckBox.checked = true;
	}
});

loginForm.addEventListener("submit", function (evt) {
	if(!inputLogin.value || !inputPassword.value) {
		evt.preventDefault();
		popUpLogin.classList.remove("modal-login-show");
		popUpLogin.classList.toggle("login-invalid");
	}
	if (isStorageSupport && loginCheckBox.checked) {
		localStorage.setItem ("login", inputLogin.value);
		localStorage.setItem ("rememberMe", 1);
	}
	else if (isStorageSupport && !loginCheckBox.checked) {
		localStorage.setItem ("rememberMe", 0);
		localStorage.removeItem("login");
	}
});

closeLogin.addEventListener("click", function (evt) {
	evt.preventDefault();
	popUpLogin.classList.remove("modal-show");
	overLay.classList.remove("modal-show");
});

mapInFotter.addEventListener("click", function (evt) {
	evt.preventDefault();
	popUpMap.classList.add("modal-show");
	overLay.classList.add("modal-show");
});

mapLink.addEventListener("click", function (evt) {
	evt.preventDefault();
	popUpMap.classList.add("modal-show");
	closeMap.focus();
	overLay.classList.add("modal-show");
});

closeMap.addEventListener("click", function (evt) {
	evt.preventDefault();
	popUpMap.classList.remove("modal-show");
	overLay.classList.remove("modal-show");
});


overLay.addEventListener("click", function (evt) {
	evt.preventDefault();
	popUpLogin.classList.remove("modal-show");
	overLay.classList.remove("modal-show");
	popUpMap.classList.remove("modal-show");
});

window.addEventListener("keydown", function(evt) {
	if (evt.keyCode === 27 && (popUpLogin.classList.contains("modal-show") || popUpMap.classList.contains("modal-show"))) {
		evt.preventDefault();
		popUpLogin.classList.remove("modal-show");
		popUpMap.classList.remove("modal-show");
		overLay.classList.remove("modal-show");
	}
});