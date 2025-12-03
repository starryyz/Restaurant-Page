const attachedHeader = document.querySelector('.attachedHeader-section');
const scrollTrigger = 280; 

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollTrigger) {
    attachedHeader.style.display = 'block';
  } else {
    attachedHeader.style.display = 'none';
  }
});

if (window.scrollY > scrollTrigger) {
  attachedHeader.style.display = 'block';
}