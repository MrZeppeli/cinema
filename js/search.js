const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');
const loadMoreButton = document.getElementById('loadMore');
let page = 1;

const fetchSearchResults = async (query) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=097da86a6f86dc966c3e2582d967d31f`);
    const data = await response.json();
    return data.results;
};

const displaySearchResults = (results) => {
    searchResultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
            <div class="recherche">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}">
                <p>${result.title}</p>
                <p>Date de sortie: ${result.release_date}</p>
                <a href="movie.html?id=${result.id}">En savoir plus</a>
            </div>
        `;
        searchResultsContainer.appendChild(resultElement);
    });
};

const searchMovies = async () => {
    const query = searchInput.value;
    page = 1;
    const results = await fetchSearchResults(query);
    displaySearchResults(results);
    toggleLoadMoreButton(results.length > 0); // Appel pour afficher ou masquer le bouton "Charger plus de résultats"
};

const loadMoreResults = async () => {
    page++;
    const query = searchInput.value;
    const results = await fetchSearchResults(query);
    displaySearchResults(results);
};

const toggleLoadMoreButton = (visible) => {
    loadMoreButton.style.display = visible ? 'block' : 'none';
};

searchInput.addEventListener('input', searchMovies);
loadMoreButton.addEventListener('click', loadMoreResults);
