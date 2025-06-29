# Library Search Engine

A real-time web application that allows users to search for books with live suggestions, pulling data directly from a Supabase backend. The app is built with modern frontend technologies and deployed via GitHub Pages.

---

## Features

- **Real-time search suggestions:** Instant dropdown of matching book titles as users type.
- **Detailed book info:** Clicking a suggestion shows author, publisher, ISBN, type, access type, and published year.
- **Responsive design:** Modern and accessible UI with SCSS for styling.
- **Backend:** Powered by Supabase RESTful API for scalable and serverless data management.

---

## Tech Stack

- **Frontend:** HTML5, JavaScript (ES6+), SCSS (Sass)
- **Backend:** Supabase (PostgreSQL + REST API)
- **Version Control & Deployment:** Git, GitHub, GitHub Pages

---

## Usage

1. Clone or download this repo.
2. Open `index.html` in a browser for local testing.
3. Deployed live at: [aravindhrdev.github.io/Liby/]

---

## Security & Code Practices

- **API Key Exposure:** For demo and ease of deployment, the Supabase anon API key is included in the frontend code. **This is a public key with limited permissions** intended for client-side use only.
- For production apps, consider securing sensitive API keys via server-side code or environment variables.
- Avoid committing private keys or secrets to public repositories.
- This project uses the Supabase anonymous key which has read-only permissions scoped to the `books` table for safe public access.

---

## Contribution

Feel free to fork, open issues, or submit pull requests for improvements or new features.

---

## License

This project is licensed under the MIT License.

---

## Contact

[Aravindh] - [aravindhr.developer@gmail.com]

