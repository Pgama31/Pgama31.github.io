// public/api.js
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
