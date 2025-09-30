document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const closeBtn = lightbox.querySelector('.close-btn');
  const prevBtn = lightbox.querySelector('.prev-btn');
  const nextBtn = lightbox.querySelector('.next-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentIndex = -1;
  let visibleItems = Array.from(galleryItems);

  function openLightbox(index) {
    currentIndex = index;
    const img = visibleItems[currentIndex].querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
  }

  function filterGallery(category) {
    visibleItems = Array.from(galleryItems).filter(item => {
      return category === 'all' || item.dataset.category === category;
    });
    galleryItems.forEach(item => {
      item.style.display = visibleItems.includes(item) ? 'block' : 'none';
    });
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const realIndex = visibleItems.indexOf(item);
      if (realIndex !== -1) {
        openLightbox(realIndex);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterGallery(btn.dataset.filter);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    }
  });
});
