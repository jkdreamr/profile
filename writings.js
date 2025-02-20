document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const uploadContainer = document.getElementById('uploadContainer');
    const writingsGrid = document.getElementById('writingsGrid');

    fileInput.addEventListener('change', handleFileUpload);
    uploadContainer.addEventListener('dragover', handleDragOver);
    uploadContainer.addEventListener('dragleave', handleDragLeave);
    uploadContainer.addEventListener('drop', handleDrop);

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            uploadFile(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        uploadContainer.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        uploadContainer.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        uploadContainer.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) {
            uploadFile(file);
        }
    }

    function uploadFile(file) {
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }

        // Here you would typically send the file to a server
        // For this example, we'll just display it client-side
        displayUploadedFile(file);
    }

    function displayUploadedFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'writing-card';
            div.innerHTML = `
                <h3>${file.name}</h3>
                <p>Uploaded on: ${new Date().toLocaleString()}</p>
                <a href="${e.target.result}" target="_blank">View PDF</a>
            `;
            writingsGrid.appendChild(div);
        }
        reader.readAsDataURL(file);
    }
});
