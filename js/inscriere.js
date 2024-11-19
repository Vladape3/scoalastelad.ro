document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscriereForm');

    // Form validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Collect form data
        const formData = {
            nume: document.getElementById('nume').value,
            prenume: document.getElementById('prenume').value,
            dataNasterii: document.getElementById('dataNasterii').value,
            cnp: document.getElementById('cnp').value,
            email: document.getElementById('email').value,
            telefon: document.getElementById('telefon').value,
            adresa: document.getElementById('adresa').value,
            categorie: document.getElementById('categorie').value,
            programPreferat: document.getElementById('programPreferat').value
        };

        // Here you would typically send the data to your server
        console.log('Datele formularului:', formData);
        
        // Show success message
        alert('Înscrierea a fost trimisă cu succes! Vă vom contacta în curând.');
        form.reset();
        form.classList.remove('was-validated');
    });

    // CNP validation
    const cnpInput = document.getElementById('cnp');
    cnpInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 13) value = value.slice(0, 13);
        e.target.value = value;
    });

    // Phone number validation
    const phoneInput = document.getElementById('telefon');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        e.target.value = value;
    });

    // Age validation based on selected category
    const dateInput = document.getElementById('dataNasterii');
    const categorySelect = document.getElementById('categorie');

    function validateAge() {
        const birthDate = new Date(dateInput.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        const category = categorySelect.value;
        const ageMonths = age * 12 + monthDiff;

        if (category === 'B' && age < 18) {
            alert('Pentru categoria B trebuie să aveți minimum 18 ani!');
            categorySelect.value = '';
        } else if (category === 'B1' && ageMonths < 189) { // 15 ani și 9 luni = 189 luni
            alert('Pentru categoria B1 trebuie să aveți minimum 15 ani și 9 luni!');
            categorySelect.value = '';
        }
    }

    dateInput.addEventListener('change', validateAge);
    categorySelect.addEventListener('change', validateAge);
});
