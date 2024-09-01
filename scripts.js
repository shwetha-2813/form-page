// Email and Password Validation
const registrationForm = document.getElementById('registrationForm');
const passwordInput = document.getElementById('password');
const repasswordInput = document.getElementById('repassword');
const emailInput = document.getElementById('email');
const passwordRequirements = document.getElementById('passwordRequirements');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const dobInput = document.getElementById('dob');

// Disable the re-enter password field initially
repasswordInput.disabled = true;

// Function to show or hide error messages
function showError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const length = document.getElementById('length');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const number = document.getElementById('number');
    const special = document.getElementById('special');

    length.classList.toggle('valid', password.length >= 8);
    length.classList.toggle('invalid', password.length < 8);

    uppercase.classList.toggle('valid', /[A-Z]/.test(password));
    uppercase.classList.toggle('invalid', !/[A-Z]/.test(password));

    lowercase.classList.toggle('valid', /[a-z]/.test(password));
    lowercase.classList.toggle('invalid', !/[a-z]/.test(password));

    number.classList.toggle('valid', /[0-9]/.test(password));
    number.classList.toggle('invalid', !/[0-9]/.test(password));

    special.classList.toggle('valid', /[@$!%*?&]/.test(password));
    special.classList.toggle('invalid', !/[@$!%*?&]/.test(password));

    // Show password requirements if password field is not empty
    passwordRequirements.classList.toggle('hidden', password === '');

    // Enable or disable the re-enter password field based on password validation
    const allConditionsMet = document.querySelectorAll('.invalid').length === 0;
    repasswordInput.disabled = !allConditionsMet;
}

function validatePasswordsMatch() {
    const password = passwordInput.value;
    const repassword = repasswordInput.value;
    const repasswordError = document.getElementById('repasswordError');

    if (password !== repassword) {
        repasswordError.textContent = 'Passwords do not match. Please enter the correct password.';
        return false;
    } else {
        repasswordError.textContent = '';
        return true;
    }
}

function validateDOB() {
    const dobValue = dobInput.value;
    const dobError = document.getElementById('dobError');

    if (dobValue === '') {
        dobError.textContent = 'Please select your date of birth.';
        return false;
    } else {
        dobError.textContent = '';
        return true;
    }
}

function validateForm(event) {
    let isValid = true;

    // Validate first name and last name
    if (/[^a-zA-Z]/.test(firstNameInput.value)) {
        showError(firstNameInput, 'It must only contain alphabets');
        isValid = false;
    } else {
        showError(firstNameInput, '');
    }

    if (/[^a-zA-Z]/.test(lastNameInput.value)) {
        showError(lastNameInput, 'It must only contain alphabets');
        isValid = false;
    } else {
        showError(lastNameInput, '');
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    } else {
        showError(emailInput, '');
    }

    // Validate password
    validatePassword(passwordInput.value);
    
    // Validate passwords match
    if (!validatePasswordsMatch()) {
        isValid = false;
    }

    // Validate date of birth
    if (!validateDOB()) {
        isValid = false;
    }

    // Prevent form submission if invalid
    if (!isValid) {
        event.preventDefault();
    }
}

registrationForm.addEventListener('submit', validateForm);
passwordInput.addEventListener('input', () => validatePassword(passwordInput.value));
repasswordInput.addEventListener('input', validatePasswordsMatch);

// Populate states and districts
const states = [
    { name: 'California', districts: ['Los Angeles', 'San Francisco', 'San Diego'] },
    { name: 'New York', districts: ['New York City', 'Buffalo', 'Rochester'] },
    // Add more states and districts as needed
];

const stateSelect = document.getElementById('state');
const districtSelect = document.getElementById('district');

function populateStates() {
    for (const state of states) {
        const option = document.createElement('option');
        option.value = state.name;
        option.textContent = state.name;
        stateSelect.appendChild(option);
    }
}

function populateDistricts() {
    const selectedState = stateSelect.value;
    const state = states.find(s => s.name === selectedState);

    districtSelect.innerHTML = '<option value="">Select District</option>'; // Reset districts

    if (state) {
        for (const district of state.districts) {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        }
    }
}

stateSelect.addEventListener('change', populateDistricts);

// Initialize states
populateStates();
