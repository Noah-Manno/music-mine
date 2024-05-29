let addForm, loginForm, userInput, passwordInput, signupForm, newEmailInput, newUsernameInput, newPasswordInput, titleInput, composerInput, ensembleInput, challengeInput, voicingInput, languageInput, descInput, addPieceButton, logoutButton, tableBody, folders, activeLibraryTitle, addLibraryForm, addLibraryInput, profileName, concertForm, concertInput, concertTypeInput, addSongToConcertInput, addSongToConcertForm;
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
                    sessionStorage.setItem('user', JSON.stringify(data));
                    window.location.replace('/library');
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

if (window.location.pathname === '/signup') {
    signupForm = $('#signup-form')
    newEmailInput = $('#newEmail')
    newUsernameInput = $('#newUsername')
    newPasswordInput = $('#newPassword')

    const createDefaultLibraries = async (data) => {
        const defaultLibrary = {
            'title': `${data.user.username}'s Library`,
            'user_id': data.user.id
        }
        const response = await fetch('/api/libraries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultLibrary)
        })
    }

    const signUp = async (newSignUp) => {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSignUp)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login response:', data);
                if (data.message === 'Created new user') {
                    createDefaultLibraries(data)
                    console.log('Sign up successful');
                    window.location.replace('/login');
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

    const handleSignUpFormSubmit = async (event) => {
        event.preventDefault();
        let newSignUp = {
            'username': newUsernameInput.val(),
            'password': newPasswordInput.val(),
            'email': newEmailInput.val()
        }
        if (newSignUp.username && newSignUp.password && newSignUp.email) {
            await signUp(newSignUp);
        } else {
            console.error('Unique username and password and email are required.')
        }
    }
    signupForm.on('submit', handleSignUpFormSubmit)
}