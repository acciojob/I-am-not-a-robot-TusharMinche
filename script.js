//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let images = [];
let selectedImages = [];

// DOM Elements
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const para = document.getElementById("para");

// Generate random set of images with one duplicate
function generateImages() {
  const duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  const tempImages = [...imageClasses];

  // Add duplicate
  tempImages.push(duplicateClass);

  // Shuffle array
  images = tempImages.sort(() => Math.random() - 0.5);
}

// Render images to DOM
function renderImages() {
  container.innerHTML = "";
  images.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.class = cls;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    container.appendChild(img);
  });
}

// Handle image click
function handleImageClick(img) {
  if (selectedImages.length < 2 && !img.classList.contains("selected")) {
    img.classList.add("selected");
    selectedImages.push(img);
  }

  if (selectedImages.length > 0) {
    resetBtn.style.display = "inline-block";
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset function
function resetState() {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
}

// Verify function
function verifySelection() {
  if (selectedImages.length === 2) {
    const [img1, img2] = selectedImages;
    if (img1.dataset.class === img2.dataset.class) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.style.display = "none";
}

// Event listeners
resetBtn.addEventListener("click", resetState);
verifyBtn.addEventListener("click", verifySelection);

// Init
generateImages();
renderImages();
