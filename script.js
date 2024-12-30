const API_URL = 'https://figuregrid-data.onrender.com/api/figure-grids?populate[image][fields]=url';
const BASE_URL = 'https://figuregrid-data.onrender.com'; // Base URL of your Strapi instance

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data); // Debug the full API response

        const items = data.data || [];
        const interactiveContainer = document.querySelector('.interactive-container');

        items.forEach(item => {
            console.log('Processing item:', item); // Debug the item structure

            // Directly access the fields without assuming `attributes` nesting
            const classes = item.Classes || 'default-class';
            const top = item.Top || 0;
            const left = item.Left || 0;
            const name = item.Name || 'Unknown';
            const title = item.Title || 'Untitled';
            const year = item.Year || 'Unknown Year';
            const description = item.Description || 'No description available.';
            const imageField = item.image?.url;

            // Validate critical fields
            if (!imageField) {
                console.warn('Skipping item due to missing image data:', item);
                return; // Skip this item
            }

            // Construct the full image URL
            const imageUrl = `${BASE_URL}${imageField}`;
            console.log('Image URL:', imageUrl); // Debug the image URL

            // Create container element
            const container = document.createElement('div');
            container.className = classes;
            container.style.top = `${top}%`;
            container.style.left = `${left}%`;

            // Set data attributes for additional info
            container.setAttribute('data-name', name);
            container.setAttribute('data-title', title);
            container.setAttribute('data-year', year);
            container.setAttribute('data-description', description);

            // Create and append image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = title;
            container.appendChild(img);

            // Append container to interactive container
            interactiveContainer.appendChild(container);

            // Add hover and click events for interactivity
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
