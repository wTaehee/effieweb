const imageContainers = document.querySelectorAll('.image-container');
const centerImage = document.getElementById('center-image');
const centerCaption = document.getElementById('center-caption');
const centerDisplay = document.querySelector('.center-display');

imageContainers.forEach(container => {
    const caption = container.getAttribute('data-caption');
    const imageSrc = container.querySelector('img').src;

    container.addEventListener('mouseover', function () {
        centerImage.src = imageSrc;
        centerCaption.textContent = caption;
        centerDisplay.style.display = 'block'; // Make it visible
    });

    container.addEventListener('mouseout', function () {
        centerDisplay.style.display = 'none'; // Hide when not hovering
    });
});

//color change
// Get the image containers
const image1 = document.getElementById('image-1');
const image2 = document.getElementById('image-2');
const image3 = document.getElementById('image-3');
const image4 = document.getElementById('image-4');
const image5 = document.getElementById('image-5');
const image6 = document.getElementById('image-6');

// Get the labels
const touchLabel = document.getElementById('touch-label');
const dontTouchLabel = document.getElementById('dont-touch-label');
const objectLabel = document.getElementById('object-label');
const subjectLabel = document.getElementById('subject-label');
const liveLabel = document.getElementById('live-label');
const stagedLabel = document.getElementById('staged-label');

// Function to reset the filters
function resetFilters() {
    image1.querySelector('img').style.filter = 'none';
    image2.querySelector('img').style.filter = 'none';
    image3.querySelector('img').style.filter = 'none';
    image4.querySelector('img').style.filter = 'none';
    image5.querySelector('img').style.filter = 'none';
    image6.querySelector('img').style.filter = 'none';
}

// Add event listeners for the labels
touchLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    // Apply a sepia filter with saturation to create a blue tint for Image 2 
    image2.querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(190deg)'; // Blue for Image 2
});

dontTouchLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
    // Apply a sepia filter with saturation to create a red tint for Image 1
    image1.querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(360deg)'; // Red for Image 1
});


objectLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
   
    image3.querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(20deg)'; 
});

subjectLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first

    image4.querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(240deg)'; 
});

liveLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first

    image5.querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(360deg)'; 
});

stagedLabel.addEventListener('click', function() {
    resetFilters(); // Reset the filters first
  
    image6.querySelector('img').style.filter = 'sepia(1) saturate(3) hue-rotate(300deg)'; 
});
