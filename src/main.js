import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/main.css';
import '../styles/util.css';

// get elements
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
const generatedPassword = document.getElementById('generated-password');
const iconCopy = document.getElementById('icon-copy');
const checkmarkIcons = document.querySelectorAll('.checkmark-icon');
const generateButton = document.querySelector('.generate-button');
const generateMainBox = document.querySelector('.generate-button-box');

const strengthTextWeak = document.getElementById('strength-text-updated-one');
const strengthTextWeak2 = document.getElementById('strength-text-updated-two');
const strengthTextMedium = document.getElementById(
  'strength-text-updated-three'
);
const strengthTextStrong = document.getElementById(
  'strength-text-updated-four'
);

const boxOne = document.getElementById('box-one');
const boxTwo = document.getElementById('box-two');
const boxThree = document.getElementById('box-three');
const boxFour = document.getElementById('box-four');

// create elements
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

let activeTypes = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

// functions
function updateStrengthText(length) {
  [boxOne, boxTwo, boxThree, boxFour].forEach((box) => {
    box.style.backgroundColor = 'transparent';
  });

  strengthTextWeak.hidden = true;
  strengthTextWeak2.hidden = true;
  strengthTextMedium.hidden = true;
  strengthTextStrong.hidden = true;

  if (length <= 5) {
    strengthTextWeak.hidden = false;
    boxOne.style.backgroundColor = 'red';
  } else if (length > 5 && length <= 10) {
    strengthTextWeak2.hidden = false;
    boxOne.style.backgroundColor = 'orange';
    boxTwo.style.backgroundColor = 'orange';
  } else if (length > 10 && length <= 15) {
    strengthTextMedium.hidden = false;
    boxOne.style.backgroundColor = 'yellow';
    boxTwo.style.backgroundColor = 'yellow';
    boxThree.style.backgroundColor = 'yellow';
  } else if (length > 15) {
    strengthTextStrong.hidden = false;
    boxOne.style.backgroundColor = 'green';
    boxTwo.style.backgroundColor = 'green';
    boxThree.style.backgroundColor = 'green';
    boxFour.style.backgroundColor = 'green';
  }
}

function randomPassword() {
  const length = parseInt(slider.value);

  let characters = '';
  if (activeTypes.uppercase) characters += uppercaseChars;
  if (activeTypes.lowercase) characters += lowercaseChars;
  if (activeTypes.numbers) characters += numberChars;
  if (activeTypes.symbols) characters += symbolChars;

  if (characters === '') {
    alert('please select at least one character type');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  generatedPassword.innerText = password;

  updateStrengthText(length);
}

function checkboxValidation(e) {
  const targetElement = e.target;

  const id = targetElement.id || targetElement.querySelector('img').id;

  if (activeTypes[id] !== undefined) {
    activeTypes[id] = !activeTypes[id];
    targetElement.classList.toggle('clicked');
  }
}

async function copyClipboard() {
  try {
    const password = generatedPassword.innerText;

    await navigator.clipboard.writeText(password);

    console.log('password copied successfully');
  } catch (error) {
    console.log('Failed to copy password');
  }
}

function updateSliderValue() {
  console.log(slider.value);
  sliderValue.textContent = slider.value;
}

window.onload = function () {
  slider.addEventListener('input', updateSliderValue);
};

// event listeners
checkmarkIcons.forEach((icon) => {
  icon.addEventListener('click', checkboxValidation);
});

generateButton.addEventListener('click', randomPassword);
generateMainBox.addEventListener('click', randomPassword);
iconCopy.addEventListener('click', copyClipboard);
