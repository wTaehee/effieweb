const imageContainers = document.querySelectorAll('.image-container');
const centerImage = document.getElementById('center-image');
const centerCaption = document.getElementById('center-caption');
const centerDisplay = document.querySelector('.center-display');

imageContainers.forEach(container => {
    const caption = container.getAttribute('data-caption');
    const imageSrc = container.querySelector('img').src;

    container.addEventListener('mouseenter', function () {
        centerImage.src = imageSrc;
        centerCaption.textContent = caption;
        centerDisplay.style.display = 'block'; // Make it visible
    });

    container.addEventListener('mouseleave', function () {
        centerDisplay.style.display = 'none'; // Hide when not hovering
    });
});
