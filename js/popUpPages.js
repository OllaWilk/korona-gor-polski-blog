'useStrict';
const allNavBtn = document.querySelectorAll('.navigation-top p');

allNavBtn.forEach((navBtn) => {
  navBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const sectionValue = document.getElementById(navBtn.innerHTML);
    sectionValue.classList.toggle('active');
  });
});
