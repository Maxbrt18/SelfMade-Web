 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCOI-MStVfXzArY5SvKtK2Jq9_q_OdD7tw",
    authDomain: "selfmadev2-11399.firebaseapp.com",
    databaseURL: "https://selfmadev2-11399.firebaseio.com",
    projectId: "selfmadev2-11399",
    storageBucket: "selfmadev2-11399.appspot.com",
    messagingSenderId: "157317665021",
    appId: "1:157317665021:web:00eacaf893f1a914752e94",
    measurementId: "G-MJ4NK0M9BL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const avisInput = document.getElementById('avisInput');
const sendButton = document.getElementById('sendButton');
const database = firebase.database();

function firebasePush(input) {
  let message;
  if (input.length > 30) { message = input.substring(0,29) + "..." }
  message = input;
  var avisRef2 = firebase.database().ref('PorteOuverte/Avis/All').push().set(message);
}

async function sendAvis (classe) {
  let infos = {
    "d003": "Salle de Cours",
    "d002": "Salle de Cours",
    "d001": "Permanence des lycéens, DS...",
    "d109":"Salle de Cours",
    "d108": "Salle de Cours",
    "d107": "Médiathèque, Ordinateurs",
    "Vie Scolaire": "Bureau de Ludovic Bonnier",
    "Secretariat": "Bureau de Brigitte",
    "d106": "Salle de Pastorale",
    "d105": "Laboratoire, salle de TP",
    "d104": "Laboratoire, salle de TP",
    "d103": "Salle de Cours",
    "d102": "Salle de Cours",
    "d101": "Salle de Cours",
    "d211": "Salle de Cours",
    "d210": "Salle de Cours",
    "d209": "Salle de Cours",
    "d208": "Salle de Cours",
    "d207": "Salle de Cours",
    "d206": "Salle de Cours",
    "d205": "Laboratoire, salle de TP",
    "d204": "Laboratoire, salle de TP",
    "d203": "Salle de Cours",
    "d202": "Salle de Cours",
    "d201": "Salle de Cours",
  }
  
  console.log(classe + " : " + infos[classe])

    let { value: avis} = await Swal.fire({
        title: classe + " : " + infos[classe],
        input: 'text',
        inputPlaceholder: 'Dites ce que vous pensez... '
    })

  if (avis==""||avis==" ") {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Erreur, avis vide',
      showConfirmButton: true,
      timer: 1500
    })
    
  } else {
    if (avis.length + classe.length > 40) {
      avis = avis.substring(0,37-classe.length) + "..." 
      console.log(avis)
    }
    firebasePush("Salle " + classe + ": "+ avis);
    Swal.fire({
      icon: 'success',
      title: 'Votre avis a été envoyé',
      showConfirmButton: true,
      timer: 1500
      })
  }   
}