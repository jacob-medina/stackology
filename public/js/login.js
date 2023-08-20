function init() {
    $('#login-form .error-message').hide();

    $('#login-form').on('submit', handleLogin);
}

async function handleLogin(event) {
    event.preventDefault();

    const username = $('#login-username-input').val();
    const password = $('#login-password-input').val();

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            password: password
        }),
        
    })
    if (response.ok) {
        location.assign('/');
        return;
    }

    const { message } = await response.json();
    $('#login-form .error-message').text(message).show();
}

$(init());