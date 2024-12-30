// Variables for interaction
const images = document.querySelectorAll('.image-container');
const labels = {
    touch: document.querySelector('.vertical-label-touch'),
    dontTouch: document.querySelector('.vertical-label-dont-touch'),
    object: document.querySelector('.vertical-label-object'),
    subject: document.querySelector('.vertical-label-subject'),
    live: document.querySelector('.vertical-label-live'),
    staged: document.querySelector('.vertical-label-staged'),
};
let activeLabel = null;

// Function to display center info
function displayCenterInfo(container) {
    const centerImage = document.getElementById('center-image');
    const centerName = document.getElementById('center-name');
    const centerTitle = document.getElementById('center-title');
    const centerYear = document.getElementById('center-year');
    const centerBody = document.getElementById('center-body');
    const centerDisplay = document.querySelector('.center-display');

    centerImage.src = container.querySelector('img').src;
    centerName.textContent = container.getAttribute('data-name');
    centerTitle.textContent = container.getAttribute('data-title');
    centerYear.textContent = container.getAttribute('data-year');
    centerBody.textContent = container.getAttribute('data-description');
    centerDisplay.style.display = 'block';
}

// Function to toggle center info on click
function toggleCenterInfo(container) {
    const centerDisplay = document.querySelector('.center-display');
    if (centerDisplay.style.display === 'none' || centerDisplay.style.display === '') {
        displayCenterInfo(container);
    } else {
        centerDisplay.style.display = 'none';
    }
}

// Function to reset filters
function resetFilters() {
    images.forEach(img => {
        img.style.filter = 'none';
    });
    Object.values(labels).forEach(label => label.classList.remove('active'));
    activeLabel = null;
}

// Function to change image color by class
function changeImageColorByClass(className, filterStyle) {
    const targetedImages = document.querySelectorAll(`.image-container.${className}`);
    targetedImages.forEach(img => {
        img.querySelector('img').style.filter = filterStyle;
    });
}

// Add event listeners for labels
Object.entries(labels).forEach(([className, label]) => {
    label.addEventListener('click', function () {
        if (activeLabel === label) {
            resetFilters();
        } else {
            resetFilters();
            changeImageColorByClass(className, 'sepia(3) saturate(1)');
            label.classList.add('active');
            activeLabel = label;
        }
    });
});

// Add event listeners for hover and click (after elements are created)
document.addEventListener('DOMContentLoaded', () => {
    const dynamicImages = document.querySelectorAll('.image-container');
    dynamicImages.forEach(container => {
        container.addEventListener('mouseenter', function () {
            displayCenterInfo(container);
        });

        container.addEventListener('click', function () {
            toggleCenterInfo(container);
        });
    });
});
