const cleApi = "097da86a6f86dc966c3e2582d967d31f";
const cleTokenAcces = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTdkYTg2YTZmODZkYzk2NmMzZTI1ODJkOTY3ZDMxZiIsInN1YiI6IjY1YWZiYmRlODQ4ZWI5MDEwYTlhNzI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53fsUD3sN9yzS83SY4kOF96QCtNzRVYTQuKE_HS6Ue8";

window.onload = async () => {
    if (location.search.includes('request_token=')) {
        let token = location.search.split('request_token=')[1]?.split('&')?.[0];
        if(token) {
            try {
                let sessionData = await getNewSession(token);
                sessionStorage.setItem('tmdbSessionId', sessionData.session_id);
                sessionStorage.setItem('tmdbSessionToken', token);
                updateUIBasedOnSession();
            } catch (err) {
                console.error(err);
            }
        }
    } else {
        updateUIBasedOnSession();
    }
}

async function redirectUserToSSO() {
    let tokenData = await getNewTMDBToken();
    if (!tokenData.success) {
        alert('Une erreur est survenue et je ne peux pas vous identifier');
    } else {
        location.href = `https://www.themoviedb.org/authenticate/${tokenData.request_token}?redirect_to=http://127.0.0.1:5500`;
    }
}

async function getNewTMDBToken() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cleTokenAcces}`
        }
    };
    try {
        let tokenRequest = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
        let tokenData = await tokenRequest.json();
        return tokenData;
    } catch (err) {
        console.error('error:', err);
        return null;
    }
}

async function getNewSession(token) {
    const options = {
        method: 'POST', 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${cleTokenAcces}`
        },
        body: JSON.stringify({request_token: token})
    };
    try {
        let sessionRequest = await fetch('https://api.themoviedb.org/3/authentication/session/new', options);
        let sessionData = await sessionRequest.json();
        return sessionData;
    } catch (err) {
        console.error('error:', err);
        return null;
    }
}

function updateUIBasedOnSession() {
    if (sessionStorage.getItem('tmdbSessionId')) {
        // Utilisateur connecté
        document.getElementById('logoutbutton').style.display = 'block';
        document.getElementById('monCompteText').style.display = 'inline';
        document.getElementById('redirectssobutton').style.display = 'none';
    } else {
        // Utilisateur non connecté
        document.getElementById('logoutbutton').style.display = 'none';
        document.getElementById('monCompteText').style.display = 'none';
        document.getElementById('redirectssobutton').style.display = 'block';
    }
}

function logoutUser() {
    sessionStorage.removeItem('tmdbSessionId');
    sessionStorage.removeItem('tmdbSessionToken');
    updateUIBasedOnSession();
}

let logoutButton = document.getElementById('logoutbutton');
if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
}

let redirButton = document.getElementById('redirectssobutton');
if (redirButton) {
    redirButton.addEventListener('click', redirectUserToSSO);
}