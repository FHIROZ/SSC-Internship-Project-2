<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<link href="https://unpkg.com/aos@next/dist/aos.css" rel="stylesheet" />
<script>AOS.init();</script>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  AOS.init();
  function filterMentors(field) {
    const cards = document.querySelectorAll('.mentor-card');
    cards.forEach(card => {
      const category = card.getAttribute('data-field');
      card.style.display = (field === 'all' || category === field) ? 'block' : 'none';
    });
  }

</script>
