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

const PASSWORD = "Shellino#2183";  // Changez ceci pour une meilleure gestion

// Fonction pour afficher les utilisateurs et les compteurs de voix
function displayUsers(snapshot) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    let voice1Count = 0;
    let voice2Count = 0;
    let voice3Count = 0;

    snapshot.forEach(childSnapshot => {
        const user = childSnapshot.val();

        if (user.voiceOption === '1') {
            voice1Count++;
        } else if (user.voiceOption === '2') {
            voice2Count++;
        } else if (user.voiceOption === '3') {
            voice3Count++;
        }

        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p>Option de voix: ${user.voiceOption}</p>
            <p>Numéro de téléphone: ${user.phone}</p>
            <button onclick="showPasswordInput('${childSnapshot.key}')">Supprimer</button>
            <div id="password-section-${childSnapshot.key}" class="password-section" style="display: none;">
                <input type="password" id="password-${childSnapshot.key}" placeholder="Entrez le mot de passe" />
                <button onclick="deleteUser('${childSnapshot.key}')">Confirmer la suppression</button>
            </div>
        `;
        userList.appendChild(userCard);
    });

    document.getElementById('voice1Count').innerText = voice1Count;
    document.getElementById('voice2Count').innerText = voice2Count;
    document.getElementById('voice3Count').innerText = voice3Count;
}

// Fonction pour afficher le champ de saisie du mot de passe
function showPasswordInput(userId) {
    document.getElementById(`password-section-${userId}`).style.display = 'block';
}

// Fonction pour supprimer un utilisateur après vérification du mot de passe
function deleteUser(userId) {
    const passwordInput = document.getElementById(`password-${userId}`).value;

    if (passwordInput === PASSWORD) {
        firebase.database().ref('users').child(userId).remove()
            .then(() => {
                alert('Utilisateur supprimé avec succès.');
                window.location.reload();
            })
            .catch(error => {
                alert('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
            });
    } else {
        alert('Mot de passe incorrect.');
    }
}

// Initialisation des utilisateurs inscrits
dbRef.on('value', (snapshot) => {
    displayUsers(snapshot);
});