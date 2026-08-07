
<script>
    document.body.insertAdjacentHTML("afterbegin", `
    <nav class="navbar-custom">
        <div class="navbar-logo"></div>
        <div class="hamburger" id="hamburger">&#9776;</div>
    </nav>

    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <h4>Menu</h4>
            <span class="close-btn" id="closeBtn">&times;</span>
        </div>
        <ul>
            <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
                <li><a href="admin/dashboard.php">Dashboard Admin</a></li>
            <?php endif; ?>

            <li><a href="menu.php">Menu</a></li>
			<li><a href="menu.php?kat=ps2">PS2</a></li>
			<li><a href="menu.php?kat=ps3">PS3</a></li>
			<li><a href="menu.php?kat=pc">PC</a></li>
            <li><a href="feedback.php">Umpan Balik</a></li>
			<li><a href="tentang.php">Tentang</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>
    </div>
`);

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("closeBtn");

    hamburger.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
        if (e.target === sidebar) {
            sidebar.classList.remove("active");
        }
    });

</script>