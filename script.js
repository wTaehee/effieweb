const imageContainers = document.querySelectorAll('.image-container');
const centerImage = document.getElementById('center-image');
const centerCaption = document.getElementById('center-caption');
const centerDisplay = document.querySelector('.center-display');


// Variable to track if an image has been clicked
let isImageClicked = false;

imageContainers.forEach(container => {
    const caption = container.getAttribute('data-caption');
    const imageSrc = container.querySelector('img').src;

    // Show image and caption on mouseenter
    container.addEventListener('mouseenter', function () {
        if (!isImageClicked) { // Only update if no image is clicked
            centerImage.src = imageSrc;
            centerCaption.textContent = caption;
            centerDisplay.style.display = 'block'; // Make it visible
        }
    });

    // Toggle display on click
    container.addEventListener('click', function () {
        if (isImageClicked) {
            // If already clicked, hide the display
            centerDisplay.style.display = 'none';
            isImageClicked = false;
        } else {
            // If not clicked, display stays visible
            centerImage.src = imageSrc;
            centerCaption.textContent = caption;
            centerDisplay.style.display = 'block'; // Keep it visible after click
            isImageClicked = true; // Set the flag
        }
    });
});

// Click outside images to hide the display
document.addEventListener('click', function (event) {
    // Check if the click happened outside the image containers and the center display
    if (!event.target.closest('.image-container') && !event.target.closest('.center-display')) {
        centerDisplay.style.display = 'none'; // Hide the center display
        isImageClicked = false; // Reset the flag
    }
});