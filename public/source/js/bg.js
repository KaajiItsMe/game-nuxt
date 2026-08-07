const backgrounds = ["bg-wallpaper", "bg-wallpaper2", "bg-wallpaper3", "bg-wallpaper4", "bg-wallpaper5", "bg-wallpaper6", "bg-wallpaper7", "bg-wallpaper8", "bg-wallpaper9", "bg-wallpaper10"];
const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

document.getElementById("body").classList.add(randomBg);