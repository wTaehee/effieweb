// Get the image containers by class
const images = document.querySelectorAll('.image-container');

// Get the labels by class
const touchLabel = document.querySelector('.vertical-label-touch');
const dontTouchLabel = document.querySelector('.vertical-label-dont-touch');
const objectLabel = document.querySelector('.vertical-label-object');
const subjectLabel = document.querySelector('.vertical-label-subject');
const liveLabel = document.querySelector('.vertical-label-live');
const stagedLabel = document.querySelector('.vertical-label-staged');

// Variable to keep track of the currently active label
let activeLabel = null;

// Function to reset the filters for all images
function resetFilters() {
    images.forEach(image => {
        image.querySelector('img').style.filter = 'none'; // Reset filter for each image
    });
}

// Function to change the color of images with a specific class
function changeImageColorByClass(className, filterStyle) {
    const targetedImages = document.querySelectorAll(`.image-container.${className}`);
    targetedImages.forEach(image => {
        image.querySelector('img').style.filter = filterStyle;
    });
}

// Function to toggle the filters based on the label
function toggleLabel(label, className, filterStyle) {
    // Check if the label is the currently active label
    if (activeLabel === label) {
        // If it's the active label, reset the filters
        resetFilters();
        activeLabel = null; // Deselect the active label
    } else {
        // If it's not the active label, set it as active and change the filter
        resetFilters(); // Reset the filters first
        changeImageColorByClass(className, filterStyle);
        activeLabel = label; // Set the label as active
    }
}

// Add event listeners for the labels
dontTouchLabel.addEventListener('click', function() {
    toggleLabel(dontTouchLabel, 'dont-touch', 'sepia(1) saturate(3) hue-rotate(280deg)'); // Red for images with 'dont-touch' class
});

touchLabel.addEventListener('click', function() {
    toggleLabel(touchLabel, 'touch', 'sepia(1) saturate(3) hue-rotate(190deg)'); // Blue for images with 'touch' class
});

objectLabel.addEventListener('click', function() {
    toggleLabel(objectLabel, 'object', 'sepia(1) saturate(3) hue-rotate(30deg)'); // Yellow for images with 'object' class
});

subjectLabel.addEventListener('click', function() {
    toggleLabel(subjectLabel, 'subject', 'sepia(1) saturate(3) hue-rotate(300deg)'); // Purple for images with 'subject' class
});

liveLabel.addEventListener('click', function() {
    toggleLabel(liveLabel, 'live', 'sepia(1) saturate(3) hue-rotate(360deg)'); // Orange for images with 'live' class
});

stagedLabel.addEventListener('click', function() {
    toggleLabel(stagedLabel, 'staged', 'sepia(1) saturate(3) hue-rotate(240deg)'); // Green for images with 'staged' class
});
