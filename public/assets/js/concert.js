
if (window.location.pathname === '/concerts') {
    const concerts = $('#concerts')
    let activeConcertTitle = $('#active-concert-title')
    profileName = $('#profile-name')
    const user = JSON.parse(sessionStorage.getItem('user'));
    userId = user.user.id;
    concertForm = $('#add-concert-form')
    concertInput = $('#add-concert-input')
    concertTypeInput = $('#concert-type')
    logoutButton = $('#logout-button')
    addSongToConcertInput = $('#autocomplete-input')
    addSongToConcertForm = $('#add-song-to-concert')


    const handleConnectingSongtoConcert = async (data) => {
        let pieceId = data.piece_id
        let activeConcert = JSON.parse(sessionStorage.getItem('activeConcert'));
        try {
            const response = await fetch(`/api/concerts/${activeConcert}/music/${pieceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Piece Connected To Active Concert:', data);
            } else {
                console.error('POST failed');
            }
        } catch (err) {
            console.error('error:', err)
        }
    }

    const handleFetchingSongId = async (newSong) => {
        try {
            const response = await fetch(`/api/music/title/${newSong}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Music GET response:', data);
                handleConnectingSongtoConcert(data)
            } else {
                console.error('GET failed');
            }
        } catch (err) {
            console.error('error:', err)
        }
    }

    const handleAddingSongToConcert = async (event) => {
        event.preventDefault()
        newSong = addSongToConcertInput.val()
        handleFetchingSongId(newSong)
    }

    const handleFillingAutoComplete = (music) => {
        console.log(music)

        const data = {};

        music.forEach(piece => {
            data[piece.title] = null;
        });

        
        $('input.autocomplete').autocomplete({
            data: data
        });
    }

    const handleFetchingMusicForAutoComplete = async (data) => {
        console.log(data)
        try {
            const response = await fetch(`/api/music`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Music GET response:', data);
                handleFillingAutoComplete(data)
            } else {
                console.error('GET failed');
            }
        } catch (err) {
            console.error('error:', err)
        }
    }

    const handleChangingToActiveConcert = (event) => {
        const concertId = $(event.currentTarget).attr('data-concert-id')
        sessionStorage.setItem('activeConcert', concertId)

        $('.folder i').text('music_note');
        $('.folder').each(function () {
            if ($(this).attr('data-concert-id') === concertId) {
                $(this).find('i').text('library_music');
                activeConcertTitle.text($(this).find('h3').text());
            }
        });
    }

    const handlePopulatingConcerts = (data) => {
        let activeConcert = JSON.parse(sessionStorage.getItem('activeConcert'))
        concerts.empty()
        for (let index = 0; index < data.length; index++) {
            const concert = data[index];
            const newFolder = $('<div class="folder">')
            newFolder.attr('data-concert-id', concert.concert_id);

            const newFolderTitle = $('<h3>').text(concert.title)
            const newFolderIcon = $('<i class="material-icons folder-icons">')

            switch (concert.concert_type) {
                case 'Winter':
                    newFolder.css('background-image', 'url("./assets/images/musicminetypes/winter.png")');
                    break;
                case 'Holiday':
                    newFolder.css('background-image', 'url("./assets/images/musicminetypes/Holidays.png")');
                    break;
                case 'Spring':
                    newFolder.css('background-image', 'url("./assets/images/musicminetypes/Spring.png")');
                    break;
                case 'Summer':
                    newFolder.css('background-image', 'url("./assets/images/musicminetypes/summer.png")');
                    break;
                case 'Fall':
                    newFolder.css('background-image', 'url("./assets/images/musicminetypes/Fall.png")');
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
            newFolder.on('click', handleChangingToActiveConcert)
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

    const handleLoggingOut = () => {
        sessionStorage.setItem('user', '')
        sessionStorage.setItem('activeConcert', '')
        window.location.replace('/');
    }

    handleFetchingConcertsByUser()
        .then(data => {
            handlePopulatingConcerts(data);
        })
        .catch(err => {
            console.error('error:', err);
        });

    handleFetchingMusicForAutoComplete()

    concertForm.on('submit', handleSavingConcert)
    logoutButton.on('click', handleLoggingOut);
    addSongToConcertForm.on('submit', handleAddingSongToConcert)

    const onload = () => {
        profileName.text(user.user.username);
    }

    onload()
}