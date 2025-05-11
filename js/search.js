

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('collect-search');
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll('.entry').forEach(entry => {
      const header = entry.querySelector('.entry-header').textContent.toLowerCase();
      const content = entry.querySelector('.entry-content').textContent.toLowerCase();
      entry.style.display = (header + content).includes(filter) ? '' : 'none';
    });
  });
});