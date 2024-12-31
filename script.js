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
        const headers = rows[0].map(header => header.trim()); // Trim headers for consistency
        const jsonData = rows.slice(1).map(row => {
            const obj = {};
            row.forEach((value, index) => {
                obj[headers[index]] = value ? value.trim() : ''; // Trim values to avoid extra spaces
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
        // Adjust to match the actual property names in your dataset
        const { name, title, description, image, classes, top, left } = item;

        console.log('Processing item:', item);

        // Validate the image URL
        if (!image || !image.trim().startsWith('https://drive.google.com/uc?export=view&id=')) {
            console.warn('Skipping item due to missing or invalid ImageURL:', item);
            return;
        }

        console.log('Valid ImageURL:', image);

        // Create container element
        const container = document.createElement('div');
        container.className = classes || 'default-class';
        container.style.top = `${top || 0}%`;
        container.style.left = `${left || 0}%`;

        // Set additional data attributes
        container.setAttribute('data-name', name || 'Unknown');
        container.setAttribute('data-title', title || 'Untitled');
        container.setAttribute('data-description', description || 'No description available.');

        // Create and append image element
        const img = document.createElement('img');
        img.src = image.trim(); // Trim to ensure no extra spaces
        img.alt = title || 'Image';

        console.log('Appending image:', img.src);

        container.appendChild(img);
        interactiveContainer.appendChild(container);

        // Add interactivity
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
