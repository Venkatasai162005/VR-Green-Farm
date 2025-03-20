// Function to load HTML file content
async function loadHTMLFile(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to search for products
async function searchProduct() {    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const files = ['vegetable.html', 'fruits.html']; // Files to search
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    for (const file of files) {
        const content = await loadHTMLFile(file);
        if (!content) continue; // Skip if file couldn't be loaded

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        // Search for the product in the loaded HTML content
        const products = doc.querySelectorAll('.product-jane-doe');
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                const productClone = product.cloneNode(true); // Clone the product element
                resultsContainer.appendChild(productClone); // Add it to the results
            }
        });
    }

    // If no results found, display a message
    if (resultsContainer.innerHTML === '') {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

// Function to perform search and redirect
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim() !== '') {
        localStorage.setItem('searchTerm', searchTerm); // Store the search term
        window.location.href = 'search.html'; // Redirect to search.html
    } else {
        alert('Please enter a search term.');
    }
}

// Load search results when search.html is opened
window.onload = function () {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
        document.getElementById('searchInput').value = searchTerm;
        searchProduct(); // Perform the search
    }
};