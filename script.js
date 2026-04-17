const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const previewBox = document.getElementById("previewBox");
const previewImage = document.getElementById("previewImage");
const uploadContent = document.getElementById("uploadContent");
const fileNameText = document.getElementById("fileName");
const message = document.getElementById("message");
const removeButton = document.getElementById("removeButton");

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const maxFileSize = 5 * 1024 * 1024; // 5MB

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function resetUploader() {
  fileInput.value = "";
  previewImage.src = "";
  previewBox.classList.add("hidden");
  uploadContent.classList.remove("hidden");
  fileNameText.classList.add("hidden");
  fileNameText.textContent = "";
  removeButton.classList.add("hidden");
  showMessage("");
}

function displayImage(file) {
  const reader = new FileReader();

  reader.onload = () => {
    previewImage.src = reader.result;
    uploadContent.classList.add("hidden");
    previewBox.classList.remove("hidden");
    fileNameText.textContent = file.name;
    fileNameText.classList.remove("hidden");
    removeButton.classList.remove("hidden");
    showMessage("Image uploaded successfully.", "success");
  };

  reader.readAsDataURL(file);
}

function validateFile(file) {
  if (!file) {
    showMessage("No file selected.", "error");
    return false;
  }

  if (!allowedTypes.includes(file.type)) {
    showMessage("Invalid file type. Please upload JPG, PNG, WEBP, or GIF.", "error");
    return false;
  }

  if (file.size > maxFileSize) {
    showMessage("File is too large. Maximum size is 5MB.", "error");
    return false;
  }

  return true;
}

function handleFile(file) {
  if (!validateFile(file)) return;
  displayImage(file);
}

dropArea.addEventListener("click", () => {
  fileInput.click();
});

dropArea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  handleFile(file);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropArea.classList.add("dragover");
  });
});

["dragleave", "dragend"].forEach((eventName) => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.remove("dragover");
  });
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("dragover");

  const file = event.dataTransfer.files[0];
  handleFile(file);
});

removeButton.addEventListener("click", () => {
  resetUploader();
});

resetUploader();
