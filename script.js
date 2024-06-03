// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCwWCd7ulKlkckNzJdQIr3YRsortVUvFlw",
    authDomain: "l3com-e2684.firebaseapp.com",
    projectId: "l3com-e2684",
    storageBucket: "l3com-e2684.appspot.com",
    messagingSenderId: "200707078326",
    appId: "1:200707078326:web:885a937d0c474bed4a4e17",
    measurementId: "G-GZ9PLLJQ65"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la base de données Firebase
const dbRef = firebase.database().ref('users');

document.getElementById('l3comForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const voiceOption = document.getElementById('voiceOption').value;
    const phone = document.getElementById('phone').value.trim();

    if (name === '' || phone === '') {
        alert('Tous les champs sont requis.');
        return;
    }

    if (!/^\d+$/.test(phone)) {
        alert('Le numéro de téléphone doit être composé uniquement de chiffres.');
        return;
    }

    dbRef.orderByChild('name').equalTo(name).once('value', snapshot => {
        if (snapshot.exists()) {
            alert('Un utilisateur avec ce nom existe déjà.');
        } else {
            dbRef.push({
                name: name,
                voiceOption: voiceOption,
                phone: phone
            });

            document.getElementById('l3comForm').reset();
            window.location.href = 'users.html';
        }
    });
});