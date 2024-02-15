
document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector('.navigation');
    var navBar = document.querySelector('.navBar');
    var headerHeight = header.offsetHeight;
    var sticky = header.offsetTop + headerHeight;
    var newsBackground = document.getElementById('news-background');

    function handleScroll() {
        if (window.pageYOffset > sticky) {
            const isMobileNav = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobileNav) {
                header.classList.add('sticky');
                header.style.transition = 'top 1s ease';
                newsBackground.style.opacity = 0.5;
                newsBackground.style.visibility = 'visible';
                newsBackground.style.opacity = 0.2;
            }

            else {
                navBar.classList.add('sticky');
                header.style.transition = 'top 1s ease';
            }


        } else {
            if (isMobileNav) {
                header.classList.remove('sticky');
                header.style.transition = 'top 1s ease';
                newsBackground.style.opacity = 0.2;
                newsBackground.style.opacity = 0;
            }

            else {
                navBar.classList.remove('sticky');
                header.style.transition = 'top 1s ease';
            }
        }
    }

    window.addEventListener('scroll', function () {
        handleScroll();
        toggleHeadingVisibility();
    });
});
