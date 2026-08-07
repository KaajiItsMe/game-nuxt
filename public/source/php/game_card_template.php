<div class="col-md-4 my-4 game-card">
    <div class="card shadow-sm h-100 w-100">
        <img src="<?= $g['image'] ?>" class="card-img-top" alt="Cover Game <?= htmlspecialchars($g['title']) ?>" loading="lazy">
        <div class="card-body d-flex flex-column">
            <div>
                <a href="menu.php?kat=<?= strtolower($g['platform']) ?>" 
                   style="color:#ffb500; text-decoration:none; font-weight:bold;">
                    <?= strtoupper($g['platform']) ?>
                </a>
            </div>
            <div>
                <b>
                    <?php
                        $genres_arr = json_decode($g['genres'], true);
                        $links = [];
                        if (is_array($genres_arr)) {
                            foreach ($genres_arr as $genre) {
                                $links[] = '<a href="menu.php?genre=' . urlencode($genre) . '" 
                                            style="color:white; text-decoration:none;">
                                            ' . $genre . '
                                            </a>';
                            }
                        }
                        echo implode(', ', $links);
                    ?>
                </b>
            </div>
            <h5 class="card-title"><?= $g['title'] ?></h5>
            <div class="mt-auto">
                <a class="btn btn-custom btn-block detail-link"
                    href="game-detail.php?id=<?= $g['id'] ?>">
                    Lihat Detail
                </a>
            </div>
        </div>
    </div>
</div>
