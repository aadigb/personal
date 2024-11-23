// Google Drive PDF link formatted for PDF.js
const url = 'https://drive.google.com/uc?export=download&id=1ZGrCftS7n9CNm2XtIqCa6boG-Hz5JApL'; // Your Google Drive PDF link

// Get the container where the PDF will be rendered
const container = document.getElementById('pdf-viewer');

// Use PDF.js to load and render the PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages;
    let currentPage = 1;

    // Render the first page
    renderPage(pdf, currentPage);

    // Function to render the page
    function renderPage(pdf, pageNum) {
        pdf.getPage(pageNum).then(page => {
            const scale = 1.5; // Adjust scale if needed
            const viewport = page.getViewport({ scale: scale });

            // Create a canvas element to render the PDF page
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Clear the container before adding the new page
            container.innerHTML = ''; // Clear any previous content
            container.appendChild(canvas); // Add the new canvas

            // Render the PDF page on the canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    // Optional: Implement navigation buttons (Next/Previous)
    // You can expand this code by adding buttons to navigate between pages if needed
});
