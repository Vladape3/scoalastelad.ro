// Show welcome modal on page load
document.addEventListener('DOMContentLoaded', function() {
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();

    // Initialize testimonials
    initializeTestimonials();
    
    // Initialize map
    initializeMap();
    
    // Initialize form validation
    initializeFormValidation();
});

// Testimonials data
const testimonials = [
    {
        text: "O echipă extraordinară ☺️ recomand cei mai bunii☺️",
        author: "Cursant Mulțumit"
    },
    {
        text: "Am avut o experiență fantastică la Scoala Stelad! Instructorii sunt profesioniști, răbdători și foarte bine pregătiți. Datorită lor, am reușit să obțin permisul de conducere din prima încercare. Recomand cu căldură această școală oricui își dorește să învețe să conducă!",
        author: "Cursant Mulțumit"
    },
    {
        text: "Recomand cu toată inima Scoala Stelad! Am învățat foarte multe și am dobândit abilități esențiale pentru a conduce în siguranță. Lecțiile au fost plăcute și interesante, iar instructorul meu a făcut totul mai ușor. Foarte mulțumit!",
        author: "Cursant Mulțumit"
    },
    {
        text: "Experiența mea la Scoala Stelad a fost una pozitivă din toate punctele de vedere. Instructorii sunt bine pregătiți și se dedică să te învețe nu doar să conduci, ci și să devii un șofer responsabil. Vă mulțumesc pentru tot!",
        author: "Cursant Mulțumit"
    },
    {
        text: "Scoala Stelad m-a ajutat să îmi depășesc frica de a conduce. Lecțiile au fost bine structurate, iar instructorul meu a fost foarte înțelegător și încurajator. M-am simțit în siguranță pe parcursul întregului proces. Mulțumesc pentru tot!",
        author: "Cursant Mulțumit"
    }
];

// Initialize testimonials
function initializeTestimonials() {
    const container = document.querySelector('.testimonials-slider');
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'col-md-4';
        testimonialCard.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-text">${testimonial.text}</p>
                <p class="testimonial-author">- ${testimonial.author}</p>
            </div>
        `;
        container.appendChild(testimonialCard);
    });
}

// Initialize Google Map
function initializeMap() {
    const location = { lat: 45.7119, lng: 25.6873 }; // Harman, Romania coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Școala de Șoferi Stelad'
    });
}

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('inscriereForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                // Handle form submission
                submitForm(form);
            }
            form.classList.add('was-validated');
        });
    }
}

// Handle form submission
function submitForm(form) {
    const formData = new FormData(form);
    // Add your form submission logic here
    alert('Formularul a fost trimis cu succes! Vă vom contacta în curând.');
    form.reset();
    form.classList.remove('was-validated');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
