// Definição das constantes OAuth
const CLIENT_ID = '255597916992-4ra5iqh710g4dparf4m7ob7a30onk6i4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://pgama31.github.io/oauth2callback';
const SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';

// Função para criar um evento no Google Calendar
function createCalendarEvent(authToken, eventDetails) {
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=${authToken}`;
    const event = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
            dateTime: eventDetails.startDateTime,
            timeZone: 'Europe/Lisbon',
        },
        end: {
            dateTime: eventDetails.endDateTime,
            timeZone: 'Europe/Lisbon',
        },
    };

    fetch(calendarUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Event created:', data);
    })
    .catch(error => {
        console.error('Error creating event:', error);
    });
}

// Exemplo de detalhes do evento
const eventDetails = {
    summary: 'Sessão de Laboratório',
    location: 'Sala de Laboratório 1',
    description: 'Sessão prática de laboratório',
    startDateTime: '2024-07-10T10:00:00',
    endDateTime: '2024-07-10T12:00:00',
};

// Função de callback para processar o token de acesso e criar o evento
function handleAuthResponse(authResponse) {
    const authToken = authResponse.access_token;
    createCalendarEvent(authToken, eventDetails);
}

// Certifique-se de que o botão de login tenha o ID correto
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    loginButton.onclick = () => {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&access_type=offline`;
        window.location.href = authUrl;
    };

    // Verifique se o usuário foi redirecionado de volta com um código de autorização
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        // Trocar o código de autorização por um token de acesso
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
            handleAuthResponse(data);
        })
        .catch(error => {
            console.error('Error exchanging code for token:', error);
        });
    }
});

// Adiciona o botão de login dinamicamente caso não exista
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('login-button')) {
        const loginButton = document.createElement('button');
        loginButton.id = 'login-button';
        loginButton.innerText = 'Login com Google';
        document.body.appendChild(loginButton);

        // Adicione event listener ao botão de login
        loginButton.onclick = () => {
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&access_type=offline`;
            window.location.href = authUrl;
        };
    }
});

// Função para iniciar o login com Google (caso não esteja dentro do DOMContentLoaded)
const loginButton = document.getElementById('login-button');
if (loginButton) {
    loginButton.onclick = () => {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&access_type=offline`;
        window.location.href = authUrl;
    };
}
