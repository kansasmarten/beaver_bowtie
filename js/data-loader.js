document.addEventListener('DOMContentLoaded', () => {
  const contentEl = document.getElementById('content');
  const page = window.location.pathname.split('/').pop();
  let dataUrl = 'data/daily.json';
  if (page === 'chaplain.html') dataUrl = 'data/chaplain.json';
  if (page === 'collects.html') dataUrl = 'data/collects.json';

  fetch(dataUrl)
    .then(res => res.json())
    .then(data => {
      if (page === 'collects.html') {
        data.forEach(collect => {
          const entryDiv = document.createElement('div');
          entryDiv.classList.add('entry');

          const entryHeader = document.createElement('h3');
          entryHeader.textContent = collect.Title;
          entryHeader.classList.add('entry-header');
          entryDiv.appendChild(entryHeader);

          const entryContent = document.createElement('div');
          entryContent.classList.add('entry-content');
          entryContent.style.display = 'none';
          entryContent.innerHTML = `<p>${collect.Collect}</p>`;
          entryDiv.appendChild(entryContent);

          entryHeader.addEventListener('click', () => {
            entryContent.style.display =
              entryContent.style.display === 'none' ? 'block' : 'none';
          });

          contentEl.appendChild(entryDiv);
        });
      } else {
        // existing logic for daily.json and chaplain.json
        data.forEach(category => {
          const catDiv = document.createElement('div');
          catDiv.classList.add('category');

          const catHeader = document.createElement('h2');
          catHeader.textContent = category.category;
          catHeader.classList.add('category-header');
          catDiv.appendChild(catHeader);

          const catContent = document.createElement('div');
          catContent.classList.add('category-content');
          catContent.style.display = 'none';

          category.entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');

            const entryHeader = document.createElement('h3');
            entryHeader.textContent = entry.title;
            entryHeader.classList.add('entry-header');
            entryDiv.appendChild(entryHeader);

            const entryContent = document.createElement('div');
            entryContent.classList.add('entry-content');
            entryContent.style.display = 'none';
            entryContent.innerHTML = `
              <p><strong>Prayer:</strong> ${entry.prayer}</p>
              <p><strong>Devotional Question:</strong> ${entry.devotionalQuestion}</p>
              <p><strong>Scripture (${entry.scriptureRef}, ESV):</strong> ${entry.verse}</p>
            `;
            entryDiv.appendChild(entryContent);

            entryHeader.addEventListener('click', () => {
              entryContent.style.display =
                entryContent.style.display === 'none' ? 'block' : 'none';
            });

            catContent.appendChild(entryDiv);
          });

          catDiv.appendChild(catContent);

          catHeader.addEventListener('click', () => {
            catContent.style.display =
              catContent.style.display === 'none' ? 'block' : 'none';
          });

          contentEl.appendChild(catDiv);
        });
      }
    })
    .catch(err => {
      console.error(err);
      contentEl.textContent = 'Could not load content.';
    });
});