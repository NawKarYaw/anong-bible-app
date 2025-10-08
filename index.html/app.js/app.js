async function loadBible() {
  const response = await fetch('anong_bible.json');
  const bible = await response.json();

  const bookSelect = document.getElementById('bookSelect');
  const chapterSelect = document.getElementById('chapterSelect');
  const versesDiv = document.getElementById('verses');

  // Populate books
  Object.keys(bible).forEach(book => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
  });

  // Load chapters when a book is selected
  bookSelect.addEventListener('change', () => {
    chapterSelect.innerHTML = '';
    const chapters = Object.keys(bible[bookSelect.value]);
    chapters.forEach(chapter => {
      const option = document.createElement('option');
      option.value = chapter;
      option.textContent = 'Chapter ' + chapter;
      chapterSelect.appendChild(option);
    });
    displayVerses();
  });

  // Display verses when a chapter is selected
  chapterSelect.addEventListener('change', displayVerses);

  function displayVerses() {
    versesDiv.innerHTML = '';
    const selectedBook = bookSelect.value;
    const selectedChapter = chapterSelect.value;
    if (selectedBook && selectedChapter) {
      const verses = bible[selectedBook][selectedChapter];
      for (const [num, text] of Object.entries(verses)) {
        const p = document.createElement('p');
        p.textContent = `${num}. ${text}`;
        versesDiv.appendChild(p);
      }
    }
  }
}

loadBible();
