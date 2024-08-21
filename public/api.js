function fetchProtectedResource() {
    const token = getStoredAccessToken();
    if (token) {
        fetch('https://example.com/protected/resource', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados protegidos:', data);
        })
        .catch(error => console.error('Erro na solicitação de recurso protegido:', error));
    } else {
        console.error('Não é possível fazer a solicitação sem um token de acesso.');
    }
}

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
