

document.addEventListener('DOMContentLoaded', function() {
  const contentEl = document.getElementById('content');
  let dataUrl;
  const page = window.location.pathname.split('/').pop();

  // Determine which JSON data to load based on current page
  if (page === '' || page === 'index.html') {
    dataUrl = 'data/daily.json';
  } else if (page === 'chaplain.html') {
    dataUrl = 'data/chaplain.json';
  } else if (page === 'collects.html') {
    dataUrl = 'data/collects.json';
  } else {
    console.error('Unknown page:', page);
    contentEl.innerHTML = '<p>Sorry, cannot determine content to load.</p>';
    return;
  }

  // Fetch and render the JSON data
  fetch(dataUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      data.forEach(category => {
        // Create section for each category
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        heading.textContent = category.category;
        section.appendChild(heading);

        const list = document.createElement('ul');

        category.entries.forEach(entry => {
          const item = document.createElement('li');
          const title = document.createElement('strong');
          title.textContent = entry.title;
          item.appendChild(title);

          // Line break
          item.appendChild(document.createElement('br'));

          // Scripture reference and verse
          if (entry.scriptureRef && entry.verse) {
            const scripture = document.createElement('em');
            scripture.textContent = `${entry.scriptureRef}: `;
            item.appendChild(scripture);
            item.appendChild(document.createTextNode(entry.verse));
            item.appendChild(document.createElement('br'));
          }

          // Prayer text
          if (entry.prayer) {
            const prayerPara = document.createElement('p');
            prayerPara.textContent = entry.prayer;
            item.appendChild(prayerPara);
          }

          list.appendChild(item);
        });

        section.appendChild(list);
        contentEl.appendChild(section);
      });
    })
    .catch(err => {
      console.error('Error loading data:', err);
      contentEl.innerHTML = '<p>Sorry, unable to load content at this time.</p>';
    });
});