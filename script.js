const API_URL = 'https://figuregrid-data.onrender.com/api/figure-grids?populate=image';


// Fetch data and populate the DOM
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const items = data.data; // Array of items
        const interactiveContainer = document.querySelector('.interactive-container'); // Container for dynamic elements

        // Loop through items and create DOM elements
        items.forEach(item => {
            const attributes = item.attributes;

            // Create container
            const container = document.createElement('div');
            container.className = attributes.Classes;
            container.style.top = `${attributes.Top}%`;
            container.style.left = `${attributes.Left}%`;

            // Set data attributes
            container.setAttribute('data-name', attributes.Name || 'Unknown');
            container.setAttribute('data-title', attributes.Title || 'Untitled');
            container.setAttribute('data-year', attributes.Year || 'Unknown Year');
            container.setAttribute('data-description', attributes.Description || 'No description available.');

            // Fetch image URL from Strapi Media Library
            const imageField = attributes.image; // Replace 'image' with the actual field name in your content type
            const imageUrl = imageField?.data?.attributes?.url
                ? `https://your-strapi-url${imageField.data.attributes.url}`
                : 'default-image.png'; // Default image if no image is provided

            // Add image
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = attributes.Title || 'Image';
            container.appendChild(img);

            // Append container to the interactive container
            interactiveContainer.appendChild(container);

            // Add hover and click events
            container.addEventListener('mouseenter', function () {
                displayCenterInfo(container);
            });

            container.addEventListener('click', function () {
                toggleCenterInfo(container);
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display center info on hover
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