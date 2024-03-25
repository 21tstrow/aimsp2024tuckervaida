// JavaScript for Drag and Drop
const dropArea = document.querySelector(".drag-area"),
      dragText = dropArea.querySelector("header"),
      button = dropArea.querySelector("button"),
      input = dropArea.querySelector("input");
let file;

button.onclick = () => {
    input.click();
}

input.addEventListener("change", function() {
    file = this.files[0];
    dropArea.classList.add("active");
    showFile();
});

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
});

function showFile() {
    let fileType = file.type;
    let validExtensions = ["application/pdf"]; // Array of acceptable file types
    if(validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            // Additional actions can be performed here after the file is read
        };
        fileReader.readAsDataURL(file);

        fileReader.onloadend = function() {
            // Create a link to the uploaded file
            const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.src = fileReader.result;
        pdfViewer.style.display = 'block';
        dropArea.style.display = 'none';
            
        };
    } else {
        alert("This is not a PDF File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}
