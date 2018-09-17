
var __PDF_DOC;
var __CANVAS = $('#pdf-canvas').get(0);
var __CANVAS_CTX = __CANVAS.getContext('2d');
var __CARICATO = false;

function showPDF(pdf_url) {

    PDFJS.getDocument({url: pdf_url}).then(function (pdf_doc) {
        __PDF_DOC = pdf_doc;
        __TOTAL_PAGES = __PDF_DOC.numPages;

        // Show the page
        showPage(1);

    }).catch(function (error) {
        alert(error.message);
    });
}

function showPage(page_no) {

    $("#pdf-canvas").hide();

    __PDF_DOC.getPage(page_no).then(function (page) {
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        var scale_required = __CANVAS.width / page.getViewport(1).width;

        // Get viewport of the page at required scale
        var viewport = page.getViewport(scale_required);

        console.log(viewport)

        // Set canvas height
        __CANVAS.height = viewport.height;

        var renderContext = {
            canvasContext: __CANVAS_CTX,
            viewport: viewport
        };

        // Render the page contents in the canvas
        page.render(renderContext).then(function () {
            //$("#pdf-canvas").show();
            var $img_preview = '<img src="' + __CANVAS.toDataURL() + '" />';
            $('#pdf-preview').html($img_preview);
            __CARICATO = true;
        });

    });
}


$("#file-to-upload").on('change', function () {
    // Validate whether PDF
    if (['application/pdf'].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
        alert('Error : Non è un formato PDF');
        return;
    }

    // Send the object url of the pdf
    showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
});