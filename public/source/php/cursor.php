<style>
    /* Senjata Pamungkas: Ganti kursor dengan gambar transparan 1x1 pixel */
    html, body, * {
        cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='), none !important;
    }
    input, textarea, select {
        caret-color: transparent !important;
    }
    /* Sembunyikan elemen kursor kustom dari layar agar tidak ada di pojok */
    .cursor-dot, .cursor-outline {
        display: none;
        position: fixed;
        top: -100px; /* Lempar jauh ke luar layar */
        left: -100px;
    }
</style>

<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-outline" id="cursorOutline"></div>

<script>
    // Custom Cursor Logic
    const dot = document.getElementById("cursorDot");
    const outline = document.getElementById("cursorOutline");
    let posX = 0, posY = 0;
    let mouseMoved = false;

    window.addEventListener("mousemove", (e) => {
        if (!mouseMoved) {
            dot.style.display = "block";
            outline.style.display = "block";
            mouseMoved = true;
        }
        posX = e.clientX;
        posY = e.clientY;

        dot.style.top = "0"; // Reset dari -100px
        dot.style.left = "0";
        outline.style.top = "0";
        outline.style.left = "0";

        dot.style.transform = `translate(${posX - 6}px, ${posY - 6}px)`; // Sesuaikan titik tengah
        
        // Lingkaran mengikuti dengan sedikit delay
        setTimeout(() => {
            outline.style.transform = `translate(${posX - 22}px, ${posY - 22}px)`;
        }, 30);
    });

    // Efek saat hover elemen interaktif
    document.addEventListener("mouseover", (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('hamburger') || target.closest('a') || target.closest('button')) {
            outline.style.width = "70px";
            outline.style.height = "70px";
            outline.style.margin = "-12px 0 0 -12px";
            outline.style.borderColor = "white";
            outline.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
        }
    });

    document.addEventListener("mouseout", (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('hamburger') || target.closest('a') || target.closest('button')) {
            outline.style.width = "45px";
            outline.style.height = "45px";
            outline.style.margin = "0";
            outline.style.borderColor = "#ffb500";
            outline.style.backgroundColor = "transparent";
        }
    });
</script>
