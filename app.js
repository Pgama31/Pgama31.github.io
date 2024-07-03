const CLIENT_ID = '255597916992-ghod19eihjd7s980tot66656ssqqd9q1.apps.googleusercontent.com.';  // Substitua pelo seu Client ID
const REDIRECT_URI = 'https://pgama31.github.io/oauth2callback';
const SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets';

document.getElementById('login-button').onclick = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&access_type=offline`;
    window.location.href = authUrl;
};
