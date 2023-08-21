function init() {
    $('.logout-btn').on('click', handleLogout);
}

async function handleLogout() {
    const response = await fetch('/api/user/logout', {
        method: 'POST'      
    });
    
    if (response.ok) {
        location.assign('/');
        return;
    }

    const { message } = await response.json();
    console.error(message);
}

$(init());