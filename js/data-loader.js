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
        const catDetails = document.createElement('details');
        const catSummary = document.createElement('summary');
        catSummary.textContent = category.category;
        catDetails.appendChild(catSummary);

        category.entries.forEach(entry => {
          const entryDetails = document.createElement('details');
          entryDetails.style.marginLeft = '1rem';

          const entrySummary = document.createElement('summary');
          entrySummary.textContent = entry.title;
          entryDetails.appendChild(entrySummary);

          const prayerP = document.createElement('p');
          prayerP.innerHTML = `<strong>Prayer:</strong> ${entry.prayer}`;
          entryDetails.appendChild(prayerP);

          const devotionP = document.createElement('p');
          devotionP.innerHTML = `<strong>Devotional Question:</strong> ${entry.devotionalQuestion}`;
          entryDetails.appendChild(devotionP);

          const scriptureP = document.createElement('p');
          scriptureP.innerHTML = `<strong>Scripture (${entry.scriptureRef}, ESV):</strong> ${entry.verse}`;
          entryDetails.appendChild(scriptureP);

          catDetails.appendChild(entryDetails);
        });

        contentEl.appendChild(catDetails);
      });
    })
    .catch(err => {
      console.error(err);
      contentEl.textContent = 'Could not load content.';
    });
});