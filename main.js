// const apiKey = 'dc6zaTOxFJmzC';
const apiKey = 'CtUaWYYcA2vzqoaZzx0bGxPRVWb2w2MT';
const imagesContainer = document.querySelector('.images-container');
const searchTerm = document.querySelector('#search-term');
const searchNumber = document.querySelector('#search-number');
const searchButton = document.querySelector('#search-button');

function getImages() {
	const random = (Math.floor(Math.random() * 100));

	const searchURL = "https://api.giphy.com/v1/gifs/search?q=" + 
					searchTerm.value + 
					"&limit=" + 
					searchNumber.value + 
					"&offset=" +
					random +
					"&api_key=" + 
					apiKey;
	sendRequest(searchURL);
}

function sendRequest(searchURL) {
	const searchRequest = new XMLHttpRequest();
	searchRequest.open('GET', searchURL, true);
	searchRequest.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
        	var jsonResponse = JSON.parse(searchRequest.responseText);
			const id = jsonResponse.data;
			setImages(id);
		}
	};
	searchRequest.send();

}

function setImages(images) {
	imagesContainer.innerHTML = null;
	images.forEach( function(element) {
			pictureURL = '<img class="images" src="https://media.giphy.com/media/' + element.id  + '/giphy.gif' + '">';
			imagesContainer.innerHTML += pictureURL;
	});
	if (images.length > 1) {
		document.querySelector(".results-container").classList.add("active");
	} else {
		document.querySelector(".results-container").classList.remove("active");
	};
}

// Scroll Buttons

const rightButton = document.getElementById('button-right');
const leftButton = document.getElementById('button-left');
let currentLeft = 0;
let offsetLeft = null;

rightButton.onclick = function () {
	currentLeft++;
	let images = document.querySelectorAll(".images");
	if (images.length == currentLeft) {
		currentLeft = 0;
		console.log('hit if')
	}
	let currentImage = images[currentLeft];
	offsetLeft = currentImage.offsetLeft - ((window.innerWidth - currentImage.scrollWidth ) / 2);
	imagesContainer.scrollLeft = offsetLeft;
}

leftButton.onclick = function () {
	currentLeft--;
	let images = document.querySelectorAll(".images");
	if (0 >= currentLeft) {
		currentLeft = images.length - 1;
		console.log('hit if')
	}
	let currentImage = images[currentLeft];
	offsetLeft = currentImage.offsetLeft - ((window.innerWidth - currentImage.scrollWidth ) / 2);
	imagesContainer.scrollLeft = offsetLeft;
}

// Set Title Bar to the top on mobile

window.addEventListener("load", function() {
        window.scrollTo(0, 0);
});
