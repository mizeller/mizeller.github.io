document.addEventListener('DOMContentLoaded', function () {
    // Load Adobe PDF Embed API
    const script = document.createElement('script');
    script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
    script.onload = function () {
        // Wait for Adobe DC View to be ready
        if (window.AdobeDC) {
            initAdobePDF();
        } else {
            document.addEventListener('adobe_dc_view_sdk.ready', initAdobePDF);
        }
    };
    script.onerror = function () {
        // If loading fails, show the fallback
        showFallback();
    };
    document.head.appendChild(script);

    function initAdobePDF() {
        try {
            const clientId = "9f0a6c0ce16e474c9c7c41eb3f5e5b61";

            const adobeDCView = new AdobeDC.View({
                clientId: clientId,
                divId: "adobe-dc-view"
            });

            const pdfURL = window.location.origin + "/assets/cv_mizeller.pdf";

            adobeDCView.previewFile(
                {
                    content: { location: { url: pdfURL } },
                    metaData: { fileName: "cv_mizeller.pdf" }
                },
                {
                    embedMode: "SIZED_CONTAINER",
                    showDownloadPDF: true,
                    showPrintPDF: true,
                    showFullScreen: true,
                    showPageControls: true,
                    dockPageControls: true,
                    defaultViewMode: "FIT_WIDTH"
                }
            );
        } catch (error) {
            console.error("Error initializing Adobe PDF Embed API:", error);
            showFallback();
        }
    }

    function showFallback() {
        document.getElementById('adobe-dc-view').style.display = 'none';
        document.getElementById('pdf-fallback').style.display = 'flex';
    }
});
