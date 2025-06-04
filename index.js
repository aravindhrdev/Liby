const SUPABASE_URL = 'https://tobnbzrdqoburyjzjrlp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYm5ienJkcW9idXJ5anpqcmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMTA0MzgsImV4cCI6MjA2NDU4NjQzOH0.efsqjWnBLCZ7exnGE5rLzNXpYgLBuSw1D7haW8I8mk0';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`
};

const searchBox = document.getElementById('searchBox');
const suggestionList = document.getElementById('suggestions');
const results = document.getElementById('results');

searchBox.addEventListener('input', async () => {
  const query = searchBox.value.trim();

  if (query.length < 1) {
    suggestionList.innerHTML = '';
    results.innerHTML = '';
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/books?select=title&title=ilike.${query}*`, {
    headers
  });
  const titles = await res.json();

  if (titles.length > 0) {
    suggestionList.innerHTML = titles.map(book =>
      `<li onclick="selectSuggestion('${book.title.replace(/'/g, "\\'")}')">${book.title}</li>`
    ).join('');
  } else {
    suggestionList.innerHTML = `<li>No matches found</li>`;
  }
});

window.selectSuggestion = async (title) => {
  searchBox.value = title;
  suggestionList.innerHTML = '';

  const res = await fetch(`${SUPABASE_URL}/rest/v1/books?title=eq.${encodeURIComponent(title)}`, {
    headers
  });

  const books = await res.json();
  if (books.length > 0) {
    results.innerHTML = books.map(book => `
      <div class="book">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author_name}</p>
        <p><strong>Publisher:</strong> ${book.publisher}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>Type:</strong> ${book.type === 'P' ? 'Print Book' : 'E-book'}</p>
        <p><strong>Access:</strong> ${book.access_type === 'S' ? 'Subscribed' : 'Open'}</p>
        <p><strong>Published Year:</strong> ${book.p_year}</p>
      </div>
    `).join('');
  } else {
    results.innerHTML = '<p>No details found for this book.</p>';
  }
};
