if (window.location.pathname === '/library') {
    const tableBody = $('#table-body')
    const folders = $('#folders')
    const activeLibraryTitle = $('#active-library-title')
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user)
    userId = user.user.id;

    const handleFillingTable = (data) => {
        tableBody.empty();
        data.forEach(piece => {
            const newTr = $('<tr>')
            const newPieceName = $('<td class="piece-name">').text(piece.title)
            const newComposer = $('<td>').text(piece.composer)
            const newCreatedAt = $('<td>').text(piece.createdAt)
            newTr.append(newPieceName)
            newTr.append(newComposer)
            newTr.append(newCreatedAt)
            tableBody.append(newTr)
        });
    }

    const handleFetchingMusicByLibrary = async (data) => {
        console.log(data)
        let activeLibrary = JSON.parse(sessionStorage.getItem('activeLibrary'))
        try {
            const response = await fetch(`/api/music/${activeLibrary}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Music GET response:', data);
                handleFillingTable(data)
            } else {
                console.error('GET failed');
            }
        } catch (err) {
            console.error('error:', err)
        }
    };

    const handleChangingToActiveLibrary = (event) => {
        const libraryId = $(event.currentTarget).attr('data-library-id')
        sessionStorage.setItem('activeLibrary', libraryId)

        $('.folder i').text('folder');
        $('.folder').each(function () {
            if ($(this).attr('data-library-id') === libraryId) {
                $(this).find('i').text('folder_open');
                activeLibraryTitle.text($(this).find('h3').text());
            }
        });

        handleFetchingMusicByLibrary(libraryId);
    }

    const handlePopulatingLibraries = (data) => {
        let activeLibrary = JSON.parse(sessionStorage.getItem('activeLibrary'))
        for (let index = 0; index < data.length; index++) {
            const library = data[index];
            const newFolder = $('<div class="folder">')
            newFolder.attr('data-library-id', library.id);

            const newFolderTitle = $('<h3>').text(library.title)
            const newFolderIcon = $('<i class="material-icons folder-icons">')

            if (library.id === activeLibrary) {
                newFolderIcon.text('folder_open')
                activeLibraryTitle.text(library.title)
            } else {
                newFolderIcon.text('folder')
            }
            newFolder.append(newFolderTitle);
            newFolder.append(newFolderIcon);
            newFolder.on('click', handleChangingToActiveLibrary)
            folders.append(newFolder);
        }
    }

    const handleFetchingLibrariesByUser = async () => {
        try {
            const response = await fetch(`/api/libraries/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Library GET response', data);
                if (!sessionStorage.getItem('activeLibrary')) {
                    // Set the first library as the default active library
                    const firstLibraryId = data.length > 0 ? data[0].id : null;
                    sessionStorage.setItem('activeLibrary', firstLibraryId);
                }
                return data;
            }
        } catch (err) {
            console.error('error:', err)
        }
    }

    addForm = $('#form')
    titleInput = $('#piece_name')
    composerInput = $('#composer')
    ensembleInput = $('#ensemble')
    challengeInput = $('#challenge')
    voicingInput = $('#voicing')
    languageInput = $('#language')
    descInput = $('#description')
    addPieceButton = $('#add-piece')
    logoutButton = $('#logout-button')

    const getMusic = () =>
        fetch('/api/music', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const savePiece = (newPiece) =>
        fetch('/api/music', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPiece)
        })

    const deletePiece = (id) =>
        fetch(`/api/music/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const handleSavingPiece = (event) => {
        event.preventDefault();
        activeLibrary = JSON.parse(sessionStorage.getItem('activeLibrary'));
        const newPiece = {
            'title': titleInput.val(),
            'composer': composerInput.val() || '',
            'ensemble': ensembleInput.val() || '',
            'challenge': challengeInput.val() || '',
            'voicing': voicingInput.val() || '',
            'language': languageInput.val() || '',
            'desc': descInput.val() || '',
            'library_id': activeLibrary,
        };
        console.log(newPiece)
        savePiece(newPiece).then(() => {
            console.info('song successfully added')
            event.currentTarget.reset();
            handleFetchingLibrariesByUser()
                .then(data => {
                    handleFetchingMusicByLibrary(data);
                })
                .catch(err => {
                    console.error('error:', err);
                });

        });
    };

    const handleLoggingOut = () => {
        sessionStorage.setItem('user', '')
        sessionStorage.setItem('activeLibrary', '')
        window.location.replace('/');
    }

    addForm.on('submit', handleSavingPiece);
    logoutButton.on('click', handleLoggingOut);

    handleFetchingLibrariesByUser()
        .then(data => {
            handlePopulatingLibraries(data);
            handleFetchingMusicByLibrary(data);
        })
        .catch(err => {
            console.error('error:', err);
        });
}