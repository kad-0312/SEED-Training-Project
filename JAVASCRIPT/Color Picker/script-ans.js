// Get DOM elements
const generateColorBtn = document.getElementById("generateColor");
const colorCodeDisplay = document.getElementById("colorCode");

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to update the color
function updateColor() {
  const randomColor = getRandomColor();
  document.body.style.backgroundColor = randomColor;
  colorCodeDisplay.textContent = randomColor;
}

// Add event listener to the button
generateColorBtn.addEventListener("click", updateColor);
