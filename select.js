// Get the image containers by class
const images = document.querySelectorAll('.image-container');

// Get the labels by class
const touchLabel = document.querySelector('.vertical-label-touch');
const dontTouchLabel = document.querySelector('.vertical-label-dont-touch');
const objectLabel = document.querySelector('.vertical-label-object');
const subjectLabel = document.querySelector('.vertical-label-subject');
const liveLabel = document.querySelector('.vertical-label-live');
const stagedLabel = document.querySelector('.vertical-label-staged');

// Function to reset the filters for all images
function resetFilters() {
    images.forEach(image => {
        image.querySelector('img').style.filter = 'none'; // Reset filter for each image
    });
}

// Add event listeners for the labels

dontTouchLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    // Apply a sepia filter with saturation to create a red tint for the first image
    images[0].querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(280deg)'; // Red for first image
});

touchLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    // Apply a sepia filter with saturation to create a blue tint for the second image 
    images[1].querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(190deg)'; // Blue for second image
});

objectLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    images[2].querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(30deg)'; // Yellow for third image
});

subjectLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    images[3].querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(300deg)'; // Purple for fourth image
});

liveLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    images[4].querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(360deg)'; // Orange for fifth image
});

stagedLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    images[5].querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(240deg)'; // Green for sixth image
});
