
if (window.location.pathname === '/concerts') {
    profileName = $('#profile-name')
    const user = JSON.parse(sessionStorage.getItem('user'));
    userId = user.user.id;
    concertForm = $('#add-concert-form')
    concertInput = $('#add-concert-input')

    const saveConcert = (newConcert) =>
        fetch('/api/concerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConcert)
        })

    const handleSavingConcert = (event) => {
        event.preventDefault();
        const newConcert = {
            title: concertInput.val(),
            user_id: userId
        }
        console.log(newConcert)
        saveConcert(newConcert).then((data) => {
            console.info('concert added successfully')
            event.target.reset()
            console.log(data)
            concertInput.blur();
        })
    }

    concertForm.on('submit', handleSavingConcert)

    const onload = () => {
        profileName.text(user.user.username);
    }

    onload()
}