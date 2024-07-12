// Definição das constantes OAuth
const CLIENT_ID = '255597916992-4ra5iqh710g4dparf4m7ob7a30onk6i4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://pgama31.github.io/oauth2callback';
const SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';

// Função de redirecionamento para a URL de autenticação do Google
function redirectToGoogleAuth() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&access_type=offline`;
    window.location.href = authUrl;
}

// Função para lidar com a resposta de autenticação
function handleAuthResponse(authResponse) {
    const authToken = authResponse.access_token;
    // Adicione a lógica para usar o authToken aqui, como criar um evento no calendário
}

// Função para trocar o código de autorização por um token de acesso
function exchangeCodeForToken(code) {
    console.log('Trocando código por token:', code); // Log adicional
    fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta da troca do token:', data); // Log adicional
        if (data.access_token) {
            handleAuthResponse(data);
        } else {
            console.error('Erro: Nenhum token de acesso recebido.');
        }
    })
    .catch(error => {
        console.error('Erro ao trocar o código pelo token:', error);
    });
}

// Função de inicialização
function initializeApp() {
    const loginButton = document.getElementById('login-button');
    loginButton.onclick = redirectToGoogleAuth;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        exchangeCodeForToken(code);
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeApp);

