let addForm, loginForm, userInput, passwordInput, titleInput, composerInput, ensembleInput, challengeInput, voicingInput, languageInput, descInput, addPieceButton, user;

if (window.location.pathname === '/login') {
    userInput = $('#username')
    passwordInput = $('#password')
    loginForm = $('#login-form')

    const sendLogin = async (loginAttempt) => {
        try {
            const response = await fetch('/api/users/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginAttempt)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login response:', data);
                if (data.message === 'Login successful') {
                    console.log('Login successful');
                    window.location.replace('/add'); 
                } else {
                    console.error('Login failed:', data.message);
                }
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            console.error('error during login', err);
        }
    }

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        let loginAttempt = {
            'username': userInput.val(),
            'password': passwordInput.val()
        }
        if (loginAttempt.username && loginAttempt.password) {
            await sendLogin(loginAttempt);
        } else {
            console.error('Username and password are required.')
        }
    };

    loginForm.on('submit', handleLoginFormSubmit)
}

if (window.location.pathname === '/add') {
    addForm = $('#form')
    titleInput = $('#piece_name')
    composerInput = $('#composer')
    ensembleInput = $('#ensemble')
    challengeInput = $('#challenge')
    voicingInput = $('#voicing')
    languageInput = $('#language')
    descInput = $('#description')
    addPieceButton = $('#add-piece')

    const getMusic = () =>
        fetch('/api/add', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const savePiece = (newPiece) =>
        fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPiece)
        })

    const deletePiece = (id) =>
        fetch(`/api/add/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const handleSavingPiece = (event) => {
        event.preventDefault();
        const newPiece = {
            'title': titleInput.val(),
            'composer': composerInput.val() || '',
            'ensemble': ensembleInput.val() || '',
            'challenge': challengeInput.val() || '',
            'voicing': voicingInput.val() || '',
            'language': languageInput.val() || '',
            'desc': descInput.val() || '',
        };
        console.log(newPiece)
        savePiece(newPiece).then(() => {
            console.info('song successfully added')
            event.currentTarget.reset();
        });
    };

    addForm.on('submit', handleSavingPiece);
}