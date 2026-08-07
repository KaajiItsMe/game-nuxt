<style>
    /* MATIKAN KURSOR SEJAK DETIK PERTAMA */
    html, body, * {
        cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='), none !important;
    }
    input, textarea, select {
        caret-color: transparent !important;
    }
    .cursor-dot, .cursor-outline {
        pointer-events: none;
        position: fixed;
        z-index: 999999; /* Sangat tinggi agar di atas Iframe */
        display: none;
    }
</style>
