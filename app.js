document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('access_token');
    const loginButton = document.getElementById('login-button');
    const createEventButton = document.getElementById('create-event-button');
    const logoutButton = document.getElementById('logout-button');

    if (token) {
        console.log('Token de acesso encontrado:', token);
        createEventButton.style.display = 'block';
        logoutButton.style.display = 'block';
        loginButton.style.display = 'none'; // Esconde o botão de login se o token existir
    } else {
        console.log('Token de acesso não encontrado.');
        loginButton.style.display = 'block';
    }

    // Adiciona um evento ao botão de login para iniciar o fluxo OAuth
    loginButton.addEventListener('click', () => {
        const clientId = '255597916992-4ra5iqh710g4dparf4m7ob7a30onk6i4.apps.googleusercontent.com';
        const redirectUri = 'https://pgama31.github.io/oauth2callback.html';
        const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = authUrl;
    });

    // Adiciona um evento ao botão para criar um evento no calendário
    createEventButton.addEventListener('click', () => {
        createCalendarEvent(token);
    });

    // Função de logout
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('access_token');
        window.location.reload(); // Recarrega a página para atualizar o estado dos botões
    });

    // Outras funcionalidades do seu app.js
    // ...
    // Certifique-se de manter o restante do seu código existente aqui
});

// Definição das constantes OAuth
const CLIENT_ID = '255597916992-4ra5iqh710g4dparf4m7ob7a30onk6i4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://pgama31.github.io/oauth2callback.html'; // Certifique-se de incluir .html
const SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';

// Função de redirecionamento para a URL de autenticação do Google
function redirectToGoogleAuth() {
    const encodedClientId = encodeURIComponent(CLIENT_ID);
    const encodedRedirectUri = encodeURIComponent(REDIRECT_URI);
    const encodedScope = encodeURIComponent(SCOPE);

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${encodedClientId}&redirect_uri=${encodedRedirectUri}&scope=${encodedScope}&response_type=code&access_type=offline&approval_prompt=force`;

    window.location.href = authUrl;
}

// Função para lidar com a resposta de autenticação
function handleAuthResponse(authResponse) {
    const authToken = authResponse.access_token;
    console.log('Token de acesso:', authToken);

    // Habilita o botão "Criar Evento" e configura o evento de clique
    const createEventButton = document.getElementById('create-event-button');
    if (createEventButton) {
        createEventButton.disabled = false; // Habilita o botão
        createEventButton.onclick = function() { createCalendarEvent(authToken); };
    }
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

// Função para criar um evento no calendário
function createCalendarEvent(authToken) {
    const event = {
        summary: 'Sessão de Laboratório',
        location: 'Sala de aula',
        description: 'Sessão prática para alunos',
        start: {
            dateTime: '2024-07-21T10:00:00+01:00',
            timeZone: 'Europe/Lisbon'
        },
        end: {
            dateTime: '2024-07-21T12:00:00+01:00',
            timeZone: 'Europe/Lisbon'
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        attendees: [{email: 'lpage@example.com'}, {email: 'sbrin@example.com'}],
        reminders: {
            useDefault: false,
            overrides: [
                {method: 'email', minutes: 24 * 60},
                {method: 'popup', minutes: 10}
            ]
        }
    };

    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Evento criado:', data);
    })
    .catch(error => {
        console.error('Erro ao criar o evento:', error);
    });
}

// Função de inicialização
function initializeApp() {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.onclick = redirectToGoogleAuth;
    }

    // Desabilita o botão "Criar Evento" inicialmente
    const createEventButton = document.getElementById('create-event-button');
    if (createEventButton) {
        createEventButton.disabled = true; // Desabilita o botão
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        exchangeCodeForToken(code);
    } else {
        console.error('Token de acesso não encontrado.');
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
