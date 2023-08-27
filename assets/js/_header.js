document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menuButton');
    const menuList = document.getElementById('menuList');

    menuButton.addEventListener('click', function () {
        menuList.classList.toggle('show');
    });
});
