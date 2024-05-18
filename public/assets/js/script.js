let addForm
let loginForm
let userInput
let passwordInput
let titleInput
let composerInput
let ensembleInput
let challengeInput
let voicingInput
let languageInput
let descInput
let addPieceButton
let user

if (window.location.pathname === '/login') {
    userInput = $('#username')
    passwordInput = $('#password')
    loginForm = $('#login-form')
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
}

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
    user = localStorage.getItem('user');
    const newPiece = {
            'user_id': user,
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
    })
}

const handleLogin = (event) => {
    event.preventDefault();
    newUser = userInput.val();
    localStorage.setItem('user', newUser);
    console.log(newUser)
    window.location.pathname = '/add'
}

if (window.location.pathname === '/add') {
    addForm.on('submit', handleSavingPiece);
}
if (window.location.pathname === '/login') {
    loginForm.on('submit', handleLogin);
}