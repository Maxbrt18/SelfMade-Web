$(document).ready(function() {
    /* For the sticky navigation */
    $('.js--section-features').waypoint(function(direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
      offset: '60px;'
    });
    
    /*Animations on scroll*/
    
    $('.js--wp-0').waypoint(function(direction) {
        $('.js--wp-0').addClass('animated pulse');
    }, {
        offset: '50%'
    });

    $('.js--wp-1').waypoint(function(direction) {
        $('.js--wp-1').addClass('animated fadeIn');
    }, {
        offset: '50%'
    });
    
    $('.js--wp-2').waypoint(function(direction) {
        $('.js--wp-2').addClass('animated fadeInUp');
    }, {
        offset: '50%'
    });
    
    $('.js--wp-3').waypoint(function(direction) {
        $('.js--wp-3').addClass('animated fadeIn');
    }, {
        offset: '50%'
    });
    
    $('.js--wp-4').waypoint(function(direction) {
        $('.js--wp-4').addClass('animated pulse');
    }, {
        offset: '50%'
    });
    
    
    /*Mobile navigation*/
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        
        nav.slideToggle(200);
        
        
        if ($('#ion-icon-menu').attr('name') == 'menu-outline') {
            $("#ion-icon-menu").attr('name', 'close-outline');
        } else {
            $("#ion-icon-menu").attr('name', 'menu-outline');
        }        
    });
});

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

const form = document.querySelector('.contact-form');
const name = document.querySelector('#name');
const message = document.querySelector('#message');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function firebasePush(input, sender) {
    var avisRef = firebase.database().ref('Etablissements/Champagnat/Avis/').push(String(sender.value + ": " + input.value))
}

if (form) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        firebasePush(message, name);
        return alert('Votre message a bien été envoyé');
    });
}




    