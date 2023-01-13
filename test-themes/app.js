var toggleTheme = document.querySelector('.theme input');
var toggleColor = document.querySelector('.color input');
var body = document.querySelector('.body');

toggleTheme.onclick = function() {
	body.classList.toggle('dark');
}

toggleColor.onclick = function() {
	body.classList.toggle('purple');
}