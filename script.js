const imageContainers = document.querySelectorAll('.image-container');
const centerImage = document.getElementById('center-image');
const centerTitle = document.getElementById('center-title');
const centerBody = document.getElementById('center-body');
const centerDisplay = document.querySelector('.center-display');

let isImageClicked = false;

imageContainers.forEach(container => {
    const title = container.getAttribute('data-title');
    const body = container.getAttribute('data-body');
    const imageSrc = container.querySelector('img').src;

    // Show image, title, and body on mouseenter
    container.addEventListener('mouseenter', function () {
        if (!isImageClicked) {
            centerImage.src = imageSrc;
            centerTitle.textContent = title;
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
            centerTitle.textContent = title;
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
