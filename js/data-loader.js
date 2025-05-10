document.addEventListener('DOMContentLoaded', () => {
  const contentEl = document.getElementById('content');
  const page = window.location.pathname.split('/').pop();
  let dataUrl = 'data/daily.json';
  if (page === 'chaplain.html') dataUrl = 'data/chaplain.json';
  if (page === 'collects.html') dataUrl = 'data/collects.json';

  fetch(dataUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(category => {
        // Category container
        const catDiv = document.createElement('div');
        catDiv.classList.add('category');

        // Category header
        const catHeader = document.createElement('h2');
        catHeader.textContent = category.category;
        catHeader.classList.add('category-header');
        catDiv.appendChild(catHeader);

        // Category content (entries)
        const catContent = document.createElement('div');
        catContent.classList.add('category-content');
        catContent.style.display = 'none';

        category.entries.forEach(entry => {
          // Entry container
          const entryDiv = document.createElement('div');
          entryDiv.classList.add('entry');

          // Entry header
          const entryHeader = document.createElement('h3');
          entryHeader.textContent = entry.title;
          entryHeader.classList.add('entry-header');
          entryDiv.appendChild(entryHeader);

          // Entry content
          const entryContent = document.createElement('div');
          entryContent.classList.add('entry-content');
          entryContent.style.display = 'none';
          entryContent.innerHTML = `
            <p><strong>Prayer:</strong> ${entry.prayer}</p>
            <p><strong>Devotional Question:</strong> ${entry.devotionalQuestion}</p>
            <p><strong>Scripture (${entry.scriptureRef}, ESV):</strong> ${entry.verse}</p>
          `;
          entryDiv.appendChild(entryContent);

          // Toggle entry content on header click
          entryHeader.addEventListener('click', () => {
            entryContent.style.display =
              entryContent.style.display === 'none' ? 'block' : 'none';
          });

          catContent.appendChild(entryDiv);
        });

        catDiv.appendChild(catContent);

        // Toggle category content on header click
        catHeader.addEventListener('click', () => {
          catContent.style.display =
            catContent.style.display === 'none' ? 'block' : 'none';
        });

        contentEl.appendChild(catDiv);
      });
    })
    .catch(err => {
      console.error(err);
      contentEl.textContent = 'Could not load content.';
    });
});