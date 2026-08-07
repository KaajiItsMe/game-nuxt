document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchGame');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const gameContainer = document.getElementById('gameContainer');
    let debounceTimer;

    searchInput.addEventListener('input', function (event) {
        clearTimeout(debounceTimer);
        const searchTerm = event.target.value.trim();

        debounceTimer = setTimeout(() => {
            performSearch(searchTerm);
        }, 500); // Wait 500ms after user stops typing
    });

    async function performSearch(searchTerm) {
        // Reset state
        gameContainer.innerHTML = '';
        noResultsMessage.style.display = 'none';
        
        if (typeof resetInfiniteScroll === 'function') {
            resetInfiniteScroll();
        }

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('search', searchTerm);
        urlParams.set('page', '1');
        urlParams.set('ajax', '1');

        try {
            const response = await fetch(`menu.php?${urlParams.toString()}`);
            const data = await response.text();

            if (data.trim() === 'no_results' || data.trim() === '') {
                noResultsMessage.style.display = 'block';
            } else if (data.trim() === 'no_more') {
                // Should not happen on page 1 with results, but just in case
                noResultsMessage.style.display = 'block';
            } else {
                gameContainer.innerHTML = data;
                
                // If the results are too few to fill the page, check if we need more
                if (window.innerHeight >= document.documentElement.scrollHeight) {
                    if (typeof loadMoreGames === 'function') {
                        loadMoreGames();
                    }
                }
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    }
});
