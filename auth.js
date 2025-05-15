document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const authTabBtns = document.querySelectorAll('.auth-tab-btn');
    const authContents = document.querySelectorAll('.auth-content');
    
    authTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            authTabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            authContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('signup-password');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password length
            if (password.length >= 8) strength++;
            
            // Check for lowercase letters
            if (/[a-z]/.test(password)) strength++;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength++;
            
            // Check for numbers
            if (/[0-9]/.test(password)) strength++;
            
            // Check for special characters
            if (/[^a-zA-Z0-9]/.test(password)) strength++;
            
            // Update strength bars
            strengthBars.forEach((bar, index) => {
                bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#e9ecef';
            });
            
            // Update strength text
            const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
            strengthText.textContent = strengthLabels[Math.min(strength, 4) - 1];
            strengthText.style.color = getStrengthColor(strength);
        });
    }
    
    function getStrengthColor(strength) {
        const colors = ['#dc3545', '#ffc107', '#17a2b8', '#28a745', '#218838'];
        return colors[Math.min(strength, 4) - 1];
    }
    
    // Form submission
    const loginForm = document.querySelector('#login .auth-form');
    const signupForm = document.querySelector('#signup .auth-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would validate and send to server
            alert('Login form submitted! (This is a demo)');
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate password match
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            
            if (password !== confirm) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real app, this would validate and send to server
            alert('Signup form submitted! (This is a demo)');
        });
    }
});