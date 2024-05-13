let addForm
let firstNameInput
let lastNameInput
let titleInput
let composerInput
let ensembleInput
let challengeInput
let voicingInput
let languageInput
let descInput
let addPieceButton

if (window.location.pathname === '/add') {
    addForm = $('#form')
    firstNameInput = $('#first_name')
    lastNameInput = $('#last_name')
    titleInput = $('#piece_name')
    composerInput = $('#composer')
    ensembleInput = $('#ensemble')
    challengeInput = $('#challenge')
    voicingInput = $('voicing')
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
    const newPiece = {
            'user': {
                'first_name': firstNameInput.val(),
                'last_name': lastNameInput.val()
            },
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

        titleInput.val('');
        composerInput.val('');
        ensembleInput.val('');
        challengeInput.val('');
        voicingInput.val('');
        languageInput.val('');
        descInput.val('');
    })
}

if (window.location.pathname === '/add') {
    addForm.on('submit', handleSavingPiece);
}