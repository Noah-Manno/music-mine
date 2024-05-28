
if (window.location.pathname === '/concerts') {
    const concerts = $('#concerts')
    let activeConcertTitle = $('#active-concert-title')
    profileName = $('#profile-name')
    const user = JSON.parse(sessionStorage.getItem('user'));
    userId = user.user.id;
    concertForm = $('#add-concert-form')
    concertInput = $('#add-concert-input')
    concertTypeInput = $('#concert-type')

    const handlePopulatingConcerts = (data) => {
        let activeConcert = JSON.parse(sessionStorage.getItem('activeConcert'))
        concerts.empty()
        for (let index = 0; index < data.length; index++) {
            const concert = data[index];
            const newFolder = $('<div class="folder">')
            newFolder.attr('data-concert-id', concert.id);

            const newFolderTitle = $('<h3>').text(concert.title)
            const newFolderIcon = $('<i class="material-icons folder-icons">')

            switch (concert.concert_type) {
                case 'Winter':
                    newFolder.css('background-image', 'url("")');
                    break;
                case 'Holiday':
                    newFolder.css('background-image', 'url("")');
                    break;
                case 'Spring':
                    newFolder.css('background-image', 'url("")');
                    break;
                case 'Summer':
                    newFolder.css('background-image', 'url("")');
                    break;
                case 'Fall':
                    newFolder.css('background-image', 'url("")');
                    break;
                default:
                    newFolder.css('background-image', 'none');
                    break;
            }

            if (concert.concert_id === activeConcert) {
                newFolderIcon.text('library_music')
                activeConcertTitle.text(concert.title)
            } else {
                newFolderIcon.text('music_note')
            }
            newFolder.append(newFolderTitle);
            newFolder.append(newFolderIcon);
            concerts.append(newFolder);
        }
    }

    const handleFetchingConcertsByUser = async () => {
        try {
            const response = await fetch(`/api/concerts/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('activeConcert', JSON.stringify(data[0].concert_id))
                console.log('Concert GET response', data);
                return data;
            }
        } catch (err) {
            console.error('error:', err)
        }
    }

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
            concert_type: concertTypeInput.val(),
            user_id: userId
        }
        console.log(newConcert)
        saveConcert(newConcert).then((data) => {
            console.info('concert added successfully')
            event.target.reset()
            console.log(data)
            concertInput.blur();
            handleFetchingConcertsByUser()
                .then(data => {
                    handlePopulatingConcerts(data)
                })
                .catch(err => {
                    console.error('error:', err);
                })
        })
    }

    handleFetchingConcertsByUser()
        .then(data => {
            handlePopulatingConcerts(data);
        })
        .catch(err => {
            console.error('error:', err);
        });

    concertForm.on('submit', handleSavingConcert)

    const onload = () => {
        profileName.text(user.user.username);
    }

    onload()
}