// public/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', () => {
        const clientId = 'SEU_CLIENT_ID';
        const redirectUri = 'https://SEU_DOMINIO/oauth2callback.html';
        const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;
        window.location.href = authUrl;
    });
});

function getAccessToken() {
    fetch('https://example.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            console.log('Token de acesso obtido:', data.access_token);
        } else {
            console.error('Erro ao obter token de acesso:', data);
        }
    })
    .catch(error => console.error('Erro na solicitação de token de acesso:', error));
}

function storeAccessToken(token) {
    localStorage.setItem('access_token', token);
    console.log('Token de acesso armazenado:', token);
}

function getStoredAccessToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
        console.log('Token de acesso recuperado:', token);
        return token;
    } else {
        console.error('Token de acesso não encontrado.');
        return null;
    }
}
