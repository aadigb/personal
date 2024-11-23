// Path to the PDF file in the public folder
const url = '/Untitled-document.pdf';

// Container where the PDF will be rendered
const container = document.getElementById('pdf-viewer');

// Fetch the PDF using PDF.js
pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages;
    let currentPage = 1;

    // Render the first page
    renderPage(pdf, currentPage);

    // Function to render a page
    function renderPage(pdf, pageNum) {
        pdf.getPage(pageNum).then(page => {
            const scale = 1.5; // You can adjust the scale
            const viewport = page.getViewport({ scale: scale });

            // Create a canvas element for the page rendering
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Clear the container and add the canvas
            container.innerHTML = ''; // Clear the container before adding the new page
            container.appendChild(canvas);

            // Render the page on the canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    // Optional: Add page navigation controls (next/previous)
    // If you need to add page navigation, you can create buttons to navigate through pages
});
