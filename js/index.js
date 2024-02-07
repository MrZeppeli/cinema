document.addEventListener('DOMContentLoaded', () => {
    const trendingMoviesContainer = document.getElementById('trendingMovies');
    const loadMoreButton = document.getElementById('loadMore');
    let page = 1;

    const fetchTrendingMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=097da86a6f86dc966c3e2582d967d31f`);
        const data = await response.json();
        return data.results;
    };

    const displayMovies = (movies) => {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
            <div class="film">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <p>${movie.title}</p>
                <p>Date de sortie: ${movie.release_date}</p>
                <a href="movie.html?id=${movie.id}">En savoir plus</a>
            </div>
            `;
            trendingMoviesContainer.appendChild(movieElement);
        });
    };

    const loadMoreMovies = async () => {
        page++;
        const movies = await fetchTrendingMovies();
        displayMovies(movies);
    };

    loadMoreButton.addEventListener('click', loadMoreMovies);

    // Initial load
    fetchTrendingMovies().then(movies => {
        displayMovies(movies);
    });
});