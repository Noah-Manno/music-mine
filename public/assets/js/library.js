let tableBody

if (window.location.pathname === '/library') {
    let tableBody = $('#table-body')
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user)
    userId = user.user.id;
    const handleFetchingMusicByUser = async () => {
        try {
            const response = await fetch(`/api/library/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Music GET response:', data);
            } else {
                console.error('GET failed');
            }
        } catch (err) {
            console.error('server error', err)
        }
    };
    handleFetchingMusicByUser()
}