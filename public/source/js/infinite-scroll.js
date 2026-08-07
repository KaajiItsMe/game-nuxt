let currentPage = 1;
let isLoading = false;
let hasMore = true;

const gameContainer = document.getElementById('gameContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const noMoreGames = document.getElementById('noMoreGames');

// Function to load more games
async function loadMoreGames() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    loadingIndicator.style.display = 'block';
    currentPage++;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', currentPage);
    urlParams.set('ajax', '1');
    
    // Add search term if exists in input
    const searchInput = document.getElementById('searchGame');
    if (searchInput && searchInput.value) {
        urlParams.set('search', searchInput.value);
    }

    try {
        const response = await fetch(`menu.php?${urlParams.toString()}`);
        const data = await response.text();

        if (data.trim() === 'no_more' || data.trim() === '') {
            hasMore = false;
            noMoreGames.style.display = 'block';
        } else {
            // Append new cards
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            
            // Append each child node to the container
            while (tempDiv.firstChild) {
                gameContainer.appendChild(tempDiv.firstChild);
            }
        }
    } catch (error) {
        console.error('Error loading more games:', error);
    } finally {
        isLoading = false;
        loadingIndicator.style.display = 'none';
    }
}

// Reset infinite scroll (useful for searching)
function resetInfiniteScroll() {
    currentPage = 1;
    hasMore = true;
    noMoreGames.style.display = 'none';
    loadingIndicator.style.display = 'none';
}

// Intersection Observer to trigger loading
const observerOptions = {
    root: null,
    rootMargin: '100px', // Load before user reaches the absolute bottom
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMoreGames();
        }
    });
}, observerOptions);

// Attach observer to the loading indicator (it's at the bottom)
if (loadingIndicator) {
    observer.observe(loadingIndicator);
    // Initially show loading indicator so it's in view if we need to load more immediately
    loadingIndicator.style.display = 'block';
    // But hide it if we are already loading or have no more
}

// Force check on initial load if container is not full
window.addEventListener('load', () => {
    // If the window is taller than the content, trigger load
    if (window.innerHeight >= document.documentElement.scrollHeight) {
        loadMoreGames();
    }
});
