/*===== VARIABLES =====*/ 
var name = ""
var option = ""
var isComplete = false

/*===== INIT FIREBASE =====*/ 

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

$(document).ready(function(){


	/* Toggle Video Modal
  -----------------------------------------*/
	function toggle_video_modal() {
	    
	    $(".js-trigger-video-modal").on("click", function(e){
          
	        e.preventDefault();
        
            var id = $(this).attr('data-youtube-id');
            var autoplay = '?autoplay=1';
            var related_no = '&rel=0';
            var src = '//www.youtube.com/embed/'+id+autoplay+related_no;
            $("#youtube").attr('src', src);
            $("body").addClass("show-video-modal noscroll");
      });

	    // Close and Reset the Video Modal
        function close_video_modal() {
            event.preventDefault();
            $("body").removeClass("show-video-modal noscroll");
            $("#youtube").attr('src', '');
        }

	    $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {
            close_video_modal();
        });

        $('body').keyup(function(e) {
            if (e.keyCode == 27) { 
                close_video_modal();
            } 
        });
	}
	toggle_video_modal();
});


/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
/*===== CHAT =====*/

let chat = document.getElementById('chat');

function onChatClicked(auto) {
    if (!isComplete) {
        let child = `
            <div class="head-text">Discutez avec nos étudiants</div>
                <div class="chat-box">
                    <div class="desc-text">Remplissez le formulaire ci-dessous pour commencer à parler à nos élèves.</div>
                    <form action="#" onsubmit="return false">
                        <div class="field">
                            <input type="text" placeholder="Nom" id="name" required>
                        </div>
                        <div class="field">
                            <input type="email" placeholder="Addresse e-mail" required>
                        </div>
                        <div class="field select-container ">
                            <select class="dropdown" id="option">
                                <option value="" disabled selected>Selectionnez une spécialité</option>
                                <option value="maths">Mathématiques</option>
                                <option value="physique">Physique-chimie</option>
                                <option value="nsi">NSI</option>
                                <option value="svt">SVT</option>
                                <option value="ses">SES</option>
                                <option value="geopo">Histoire-géo, géopolitique et sciences politiques</option>
                                <option value="llce">Langues, littératures et cultures étrangères</option>
                                <option value="philo">Humanité littérature philosophie</option>
                                <option value="autres">Autre</option>
                            </select>
                        </div>
                        <div class="field">
                            <button onclick="registeredTapped()" type="submit">Commencer un chat</button>
                        </div>
                    </form>
                </div>
        `;

        chat.innerHTML = child

        if (!auto) {
            if (chat.style.opacity == 0) {
                chat.style.opacity = 1;
            } else {
                chat.style.opacity = 0;
            }
        }
        
    } else {
        let child = `
        <div class="message-box">
                <div class="header">
                    <span class="name" id="liveheader">Live Chat ●</span>
                    <span class="options">
                        <i class="fas fa-ellipsis-h"></i>
                    </span>
                </div>
                <div class="chat-room" id="chatroom">
                    <div class="message message-left">
                        <div class="bubble bubble-light">Bienvenue ${name}! Voici les portes ouvertes virtuelles du lycée Champagnat</div>
                    </div>
                    
                </div>
                <div class="type-area">
                    <div class="input-wrapper">
                        <input type="text" id="inputText" placeholder="Tapez votre message ici...">
                    </div>
                    <button class="button-send" onclick="sendTapped()">Send</button>
                </div>
            </div>
        `;

        chat.innerHTML = child

        if (!auto) {
            if (chat.style.opacity == 0) {
                chat.style.opacity = 1;
            } else {
                chat.style.opacity = 0;
            }
        }
    }
}

function sendTapped() {
    let chatroom = document.getElementById('chatroom');
    let message = document.getElementById('inputText');

    if (message.value != "") {
        sendMessage(name, message.value)
        let child = `
        <div class="message message-right">
            <div class="bubble bubble-dark">${message.value}</div>
        </div>
        `
        message.value = ""
        chatroom.innerHTML += child
    }
}

function registeredTapped() {
    isComplete = true
    let nameInput = document.getElementById('name')
    let optionInput = document.getElementById('option')
    name = nameInput.value
    option = optionInput.value
    onChatClicked(true);
    firebase.database().ref("PorteOuverte/Messages/" + option).on("child_added", function(snapshot) {
        console.log(snapshot.val().message)
        if (isComplete) {
            if (snapshot.val().sender != name) {
                createBubble(false, snapshot.val().message)
            }
        }
    });
    $('body').keyup(function(e) {
        if (e.keyCode == 13) { 
          sendTapped();
        }
    });
}

function sendMessage(sender, message) {
    firebase.database().ref("PorteOuverte/Messages/" + option).push().set({
       "sender": sender,
       "message": message 
    });
}

function createBubble(dark, message) {
    let chatroom = document.getElementById('chatroom');
    if (dark) {
        let child = `
        <div class="message message-right">
            <div class="bubble bubble-dark">${message}</div>
        </div>
    `
        chatroom.innerHTML += child
    } else {
        let child = `
        <div class="message message-left">
            <div class="bubble bubble-light">${message}</div>
        </div>
    `
        chatroom.innerHTML += child
    }
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

// OVERLAY
gsap.to(".first", 1.5, {delay: .2, top: "-100%", ease: Expo.easeInOut});
gsap.to(".second", 1.5, {delay: .4, top: "-100%", ease: Expo.easeInOut});
gsap.to(".third", 1.5, {delay: .6, top: "-100%", ease: Expo.easeInOut});

/*SCROLL HOME*/

sr.reveal('.home__title', {delay: 300})
sr.reveal('.home__subtitle', {delay: 400})
sr.reveal('.home__scroll', {delay: 500})
sr.reveal('.home__img', {origin:'right', delay: 600})

/*SCROLL ABOUT*/
sr.reveal('.about__img', {delay: 300})
sr.reveal('.about__subtitle', {delay: 100})
sr.reveal('.about__profession', {delay: 200})
sr.reveal('.about__text', {delay: 300})
sr.reveal('.about__social-icon', {delay: 400, interval: 200})

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {})
sr.reveal('.skills__name', {distance: '20px', delay: 50, interval: 50})
sr.reveal('.skills__img', {delay: 200})

/*SCROLL PORTFOLIO*/
sr.reveal('.portfolio__img', {interval: 200})

/*SCROLL CONTACT*/
sr.reveal('.contact__subtitle', {})
sr.reveal('.contact__text', {interval: 100})
sr.reveal('.contact__input', {delay: 200})
sr.reveal('.contact__button', {delay: 300})




