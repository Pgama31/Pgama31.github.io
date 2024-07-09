// Definição das constantes OAuth
const CLIENT_ID = '255597916992-4ra5iqh710g4dparf4m7ob7a30onk6i4.apps.googleusercontent.com';
const CLIENT_SECRET = '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'; // Novo Client Secret
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
    endDateTime: '202



