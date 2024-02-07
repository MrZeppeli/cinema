document.addEventListener('DOMContentLoaded', () => {
    const movieTitleElement = document.getElementById('movieTitle');
    const moviePosterElement = document.getElementById('moviePoster');
    const movieSummaryElement = document.getElementById('movieSummary');
    const commentsContainer = document.getElementById('comments');

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    const fetchMovieDetails = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=097da86a6f86dc966c3e2582d967d31f`);
        const data = await response.json();
        return data;
    };

    const fetchMovieComments = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=097da86a6f86dc966c3e2582d967d31f`);
        const data = await response.json();
        return data.results;
    };

    const displayMovieDetails = (movie) => {
        movieTitleElement.textContent = movie.title;
        moviePosterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieSummaryElement.textContent = movie.overview;
    };

    const displayMovieComments = (comments) => {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `
                <p>Nom d'utilisateur: ${comment.author}</p>
                ${comment.avatar_path ? `<img src="https://image.tmdb.org/t/p/w500${comment.avatar_path}" alt="User Profile Image">` : ''}
                <p>Date de publication: ${comment.created_at}</p>
                <p>${comment.content}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    };

    fetchMovieDetails().then(movie => {
        displayMovieDetails(movie);
    });

    fetchMovieComments().then(comments => {
        displayMovieComments(comments);
    });
});