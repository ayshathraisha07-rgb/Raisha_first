// ===== Contact Form Handler =====
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    const btnText = form.querySelector('.btn-text');
    const btnLoader = form.querySelector('.btn-loader');

    // Get values
    const name = document.getElementById('formName').value.trim();
    const age = document.getElementById('formAge').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !age || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Show loading state
    btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-flex';

    try {
        // REPLACE THE URL BELOW with your actual Render Backend URL after you deploy it
        const backendURL = 'https://raisha-first.onrender.com/api/portfolio';

        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, email, message }),
        });

        if (response.ok) {
            form.style.display = 'none';
            successMsg.style.display = 'flex';
            successMsg.style.flexDirection = 'column';
            successMsg.style.alignItems = 'center';
            console.log('Form submitted successfully');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');

        // Reset button state
        btnText.style.display = 'inline-block';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}