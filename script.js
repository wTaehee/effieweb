const SHEET_ID = '1Ae1MR-a96rCaOcCFZ9qg6JLyiYg0gMW5oTqFmZr7UJc'; // Replace with your actual Sheet ID
const API_KEY = 'AIzaSyBL7h1D_1iuDsjHvoNLjxqM4z2E3a5u-DI'; // Replace with your actual API Key
const RANGE = 'Sheet1!A1:J183'; // Replace with the range of your data

const SHEET_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

fetch(SHEET_API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const rows = data.values;
        const headers = rows[0]; // First row is the header
        const jsonData = rows.slice(1).map(row => {
            const obj = {};
            row.forEach((value, index) => {
                obj[headers[index]] = value;
            });
            return obj;
        });

        console.log('Parsed JSON Data:', jsonData); // Debug parsed JSON data
        renderData(jsonData);
    })
    .catch(error => console.error('Error fetching data:', error));

/**
 * Render the parsed data into the interactive container.
 * @param {Array} data - The JSON data parsed from the API.
 */
function renderData(data) {
    const interactiveContainer = document.querySelector('.interactive-container');

    data.forEach(item => {
        const { name, title, description, image, classes, top, left } = item;

        console.log('Processing item:', item);

        // Validate the image URL (ensure it's an Imgur link or valid URL)
        if (!image || !image.trim().startsWith('https://i.imgur.com/')) {
            console.warn('Skipping item due to missing or invalid ImageURL:', item);
            return;
        }

        // Create a container element for the item
        const container = document.createElement('div');
        container.className = classes || 'default-class';
        container.style.top = `${top || 0}%`;
        container.style.left = `${left || 0}%`;

        // Set additional data attributes for interactivity
        container.setAttribute('data-name', name || 'Unknown');
        container.setAttribute('data-title', title || 'Untitled');
        container.setAttribute('data-description', description || 'No description available.');

        // Create and append the image element
        const img = document.createElement('img');
        img.src = image.trim();
        img.alt = title || 'Image';

        // Log the URL to debug
        console.log('Image URL:', img.src);

        // Handle image loading errors
        img.onerror = () => {
            console.error('Failed to load image:', img.src);
            img.src = 'https://via.placeholder.com/150'; // Fallback placeholder
        };

        container.appendChild(img);
        interactiveContainer.appendChild(container);

        // Add hover and click events for interactivity
        container.addEventListener('mouseenter', () => displayCenterInfo(container));
        container.addEventListener('click', () => toggleCenterInfo(container));
    });
}

/**
 * Display the center info when hovering over an item.
 * @param {HTMLElement} container - The container element of the hovered item.
 */
function displayCenterInfo(container) {
    const centerImage = document.getElementById('center-image');
    const centerName = document.getElementById('center-name');
    const centerTitle = document.getElementById('center-title');
    const centerBody = document.getElementById('center-body');
    const centerDisplay = document.querySelector('.center-display');

    centerImage.src = container.querySelector('img').src;
    centerName.textContent = container.getAttribute('data-name');
    centerTitle.textContent = container.getAttribute('data-title');
    centerBody.textContent = container.getAttribute('data-description');
    centerDisplay.style.display = 'block';
}

/**
 * Toggle the center info display on click.
 * @param {HTMLElement} container - The container element of the clicked item.
 */
function toggleCenterInfo(container) {
    const centerDisplay = document.querySelector('.center-display');
    if (centerDisplay.style.display === 'none' || centerDisplay.style.display === '') {
        displayCenterInfo(container);
    } else {
        centerDisplay.style.display = 'none';
    }
}
