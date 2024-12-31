const SHEET_ID = '1Ae1MR-a96rCaOcCFZ9qg6JLyiYg0gMW5oTqFmZr7UJc';
const API_KEY = 'AIzaSyBL7h1D_1iuDsjHvoNLjxqM4z2E3a5u-DI';
const RANGE = 'Sheet1!A1:J183';

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
        const headers = rows[0];
        const jsonData = rows.slice(1).map(row => {
            const obj = {};
            row.forEach((value, index) => {
                obj[headers[index]] = value;
            });
            return obj;
        });

        console.log('Parsed JSON Data:', jsonData);
        renderData(jsonData);
    })
    .catch(error => console.error('Error fetching data:', error));

function renderData(data) {
    const interactiveContainer = document.querySelector('.interactive-container');

    data.forEach(item => {
        const { name, title, description, image, classes, top, left } = item;

        console.log('Processing item:', item);

        if (!image || !image.trim()) {
            console.warn('Skipping item due to missing or invalid ImageURL:', item);
            return;
        }

        const container = document.createElement('div');
        container.className = classes || 'default-class';
        container.style.top = `${parseFloat(top) || 0}%`;
        container.style.left = `${parseFloat(left) || 0}%`;

        container.setAttribute('data-name', name || 'Unknown');
        container.setAttribute('data-title', title || 'Untitled');
        container.setAttribute('data-description', description || 'No description available.');

        const img = document.createElement('img');
        img.src = image.trim();
        img.alt = title || 'Image';

        img.onerror = () => {
            console.error('Failed to load image:', img.src);
            img.src = 'https://via.placeholder.com/150'; // Fallback placeholder
        };

        container.appendChild(img);
        interactiveContainer.appendChild(container);

        container.addEventListener('mouseenter', () => displayCenterInfo(container));
        container.addEventListener('click', () => toggleCenterInfo(container));
    });
}

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

function toggleCenterInfo(container) {
    const centerDisplay = document.querySelector('.center-display');
    if (centerDisplay.style.display === 'none' || centerDisplay.style.display === '') {
        displayCenterInfo(container);
    } else {
        centerDisplay.style.display = 'none';
    }
}
