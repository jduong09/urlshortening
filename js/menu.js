document.addEventListener('DOMContentLoaded', () => {
  const iconOpenMenu = document.getElementById('icon-open-menu');
  const navMenu = document.querySelector('nav');

  iconOpenMenu.addEventListener('click', () => {
    if (navMenu.classList.contains('hide')) {
      navMenu.classList.remove('hide');
    } else {
      navMenu.classList.add('hide');
    }
  });

  if (innerWidth >= 767) {
    iconOpenMenu.classList.add('hide');
    navMenu.classList.remove('hide');
  } else {
    iconOpenMenu.classList.remove('hide');
    navMenu.classList.add('hide');
  }

  window.addEventListener('resize', () => {
    if (innerWidth >= 767) {
      iconOpenMenu.classList.add('hide');
      navMenu.classList.remove('hide')
    } else {
      iconOpenMenu.classList.remove('hide');
      navMenu.classList.add('hide');
    }
  })
});