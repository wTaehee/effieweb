const API_URL = 'https://figuregrid-data.onrender.com/api/figure-grids';

// Fetch data and populate the DOM
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const items = data.data;
        const interactiveContainer = document.querySelector('.interactive-container');

        // Create image containers dynamically
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

            // Add image
            const img = document.createElement('img');
            img.src = attributes.location ? attributes.location.url : 'default-image.png';
            img.alt = attributes.Title || 'Image';

            container.appendChild(img);
            interactiveContainer.appendChild(container);
        });
    })
    .catch(error => console.error('Error fetching data:', error));