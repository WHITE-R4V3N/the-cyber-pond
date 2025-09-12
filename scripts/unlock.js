// Password Unlock
//const inputs = document.querySelectorAll('.pass-digits input');
const inputs = document.querySelectorAll('.pass-digits input');
const unlockBtn = document.getElementById('enter-pass-btn');
const overlay = document.getElementById('lock-screen');

const correct_password = 'turtle';

function check_password() {
    let enteredPassword = "";
    inputs.forEach(input => {
        enteredPassword += input.value;
    });

    if (enteredPassword == correct_password) {
        overlay.classList.add('fade-out');

        overlay.addEventListener('transitionend', function handler() {
            overlay.style.display = 'none';
            overlay.removeEventListener('transitionend', handler);
        });
        //overlay2.style.display = 'none';
    } else {
        alert("Incorrect password. Try again!");
        inputs.forEach(input => input.value = ""); // clear inputs
        inputs[0].focus();
    }
}

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        } else if (index >= inputs.length-1) {
            check_password();
        }
    });

    // Allow backspace to go to previous field
    input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && index > 0) {
            inputs[index].value = "";
            inputs[index - 1].focus();
        }
    });
});

unlockBtn.addEventListener('click', () => {
    let enteredPassword = "";
    inputs.forEach(input => {
        enteredPassword += input.value;
    });

    if (enteredPassword == correct_password) {
        overlay.style.display = "none";
        //overlay2.style.display = 'none';
    } else {
        alert("Incorrect password. Try again!");
        inputs.forEach(input => input.value = ""); // clear inputs
        inputs[0].focus();
    }
});
