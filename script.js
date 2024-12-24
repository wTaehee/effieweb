const imageContainers = document.querySelectorAll('.image-container');
const centerImage = document.getElementById('center-image');
const centerName = document.getElementById('center-name');
const centerTitle = document.getElementById('center-title');
const centerYear = document.getElementById('center-year');
const centerBody = document.getElementById('center-body');
const centerDisplay = document.querySelector('.center-display');

let isImageClicked = false;

imageContainers.forEach(container => {
    const name = container.getAttribute('data-name');
    const title = container.getAttribute('data-title');
    const year = container.getAttribute('data-year');
    const body = container.getAttribute('data-body');
    const imageSrc = container.querySelector('img').src;

    // Show image, title, and body on mouseenter
    container.addEventListener('mouseenter', function () {
        if (!isImageClicked) {
            centerImage.src = imageSrc;
            centerName.textContent = name;
            centerTitle.textContent = title;
            centerYear.textContent = year;
            centerBody.textContent = body;
            centerDisplay.style.display = 'block';
        }
    });

    // Toggle display on click
    container.addEventListener('click', function () {
        if (isImageClicked) {
            centerDisplay.style.display = 'none';
            isImageClicked = false;
        } else {
            centerImage.src = imageSrc;
            centerName.textContent = name;
            centerTitle.textContent = title;
            centerYear.textContent = year;
            centerBody.textContent = body;
            centerDisplay.style.display = 'block';
            isImageClicked = true;
        }
    });
});

// Hide display on clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.image-container') && !event.target.closest('.center-display')) {
        centerDisplay.style.display = 'none';
        isImageClicked = false;
    }
});
