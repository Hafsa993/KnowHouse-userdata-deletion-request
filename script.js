const form = document.getElementById('deletionForm');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');
const recipientEmail = 'feuerflocken123@gmail.com';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const familyId = document.getElementById('familyId').value.trim();

    // Validation
    if (!username) {
        showMessage('Please enter your username', 'error');
        return;
    }

    if (!familyId) {
        showMessage('Please enter your Family ID', 'error');
        return;
    }

    // Validate Family ID
    const familyIdRegex = /^[A-Z]{6}$/;
    if (!familyIdRegex.test(familyId)) {
        showMessage('Family ID must be exactly 6 uppercase letters (e.g., ABCDEF)', 'error');
        return;
    }

    // Create mailto link with pre-filled content
    const subject = encodeURIComponent('Data Deletion Request - KnowHouse');
    const body = encodeURIComponent(
        `Hello,\n\nI would like to request the deletion of my KnowHouse account and all associated personal data.\n\n` +
        `Username: ${username}\n` +
        `Family ID: ${familyId}\n` +
        `Request Date: ${new Date().toLocaleString()}\n\n` +
        `Please process this deletion request as soon as possible in accordance with privacy regulations.\n\n` +
        `Thank you`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Open the user's default email client
    window.location.href = mailtoLink;

    // Show success message
    showMessage(
        '✓ Your email client is opening with the deletion request template. Please review and send the email to complete your request.',
        'success'
    );
    form.reset();
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}
