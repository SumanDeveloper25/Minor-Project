const slider = document.getElementById("rangeSlider");
const output = document.getElementById("sliderValue");
const passwordOutput = document.getElementById("passwordOutput");
const copyButton = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

// Update the slider or the track value in real-time
slider.addEventListener("input", () => {
  output.textContent = slider.value;
});

// Handle form submission
document.forms["passwordGenForm"].addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the slider value
  const sliderValue = document.getElementById("rangeSlider").value;

  if (sliderValue < 8) {
    alert("Password length must be at least 8 characters.");
    return;
  }
  if (sliderValue > 50) {
    alert("Password length must be at most 49 characters.");
    return;
  }
  // Get checkbox states
  const includeUppercase = document.getElementById("uppercaseCheck").checked;
  const includeLowercase = document.getElementById("lowercaseCheck").checked;
  const includeNumbers = document.getElementById("numbersCheck").checked;
  const includeSymbols = document.getElementById("symbolsCheck").checked;

  const password = generatePassword(
    sliderValue,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  passwordOutput.textContent = password;
  passwordOutput.style.display = "block";
  // add text-white class to passwordOutput
  passwordOutput.classList.add("txt-white");
});

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  let passwordChars = "";

  if (uppercase) passwordChars = uppercaseChars;
  if (lowercase) passwordChars += lowercaseChars;
  if (numbers) passwordChars += numberChars;
  if (symbols) passwordChars += symbolChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length);
    password += passwordChars[randomIndex];
  }

  return password;
}

copyButton.addEventListener("click", () => {
  let password = passwordOutput.textContent;
  if (password === "Password will be displayed here") {
    password = "";
  }

  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      // Show the copy message
      setTimeout(() => {
        copyMessage.textContent = "Password copied to clipboard!";
        copyMessage.style.display = "block";
        copyMessage.style.opacity = 1;
        setTimeout(() => {
          copyMessage.style.opacity = 0;
        }, 1000);
      }, 500);
    });
  } else {
    return;
  }
});


