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

    // Reset all button colors by removing the active class
    const allLabels = [touchLabel, dontTouchLabel, objectLabel, subjectLabel, liveLabel, stagedLabel];
    allLabels.forEach(label => label.classList.remove('active'));
}

// Function to change the color of images with a specific class
function changeImageColorByClass(className, filterStyle) {
    const targetedImages = document.querySelectorAll(`.image-container.${className}`);
    targetedImages.forEach(image => {
        image.querySelector('img').style.filter = filterStyle;
    });
}

// Function to toggle the filters and button styles based on the label
function toggleLabel(label, className, filterStyle) {
    // Check if the label is the currently active label
    if (activeLabel === label) {
        resetFilters(); // Reset everything
        activeLabel = null;
    } else {
        resetFilters(); // Reset first
        changeImageColorByClass(className, filterStyle);
        label.classList.add('active'); // Highlight the active label
        activeLabel = label;
    }
}

// Add event listeners for the labels
dontTouchLabel.addEventListener('click', function() {
    toggleLabel(dontTouchLabel, 'dont-touch', 'sepia(3) saturate(1) hue-rotate(280deg)'); // Red
});

touchLabel.addEventListener('click', function() {
    toggleLabel(touchLabel, 'touch', 'sepia(3) saturate(1) hue-rotate(190deg)'); // Blue
});

objectLabel.addEventListener('click', function() {
    toggleLabel(objectLabel, 'object', 'sepia(3) saturate(1) hue-rotate(30deg)'); // Yellow
});

subjectLabel.addEventListener('click', function() {
    toggleLabel(subjectLabel, 'subject', 'sepia(3) saturate(1) hue-rotate(300deg)'); // Purple
});

liveLabel.addEventListener('click', function() {
    toggleLabel(liveLabel, 'live', 'sepia(3) saturate(1) hue-rotate(360deg)'); // Orange
});

stagedLabel.addEventListener('click', function() {
    toggleLabel(stagedLabel, 'staged', 'sepia(3) saturate(1) hue-rotate(240deg)'); // Green
});
