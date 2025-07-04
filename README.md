# Modern Blog Website with AI Compose

This is a modern, full-stack blog website built with Node.js, Express, EJS, MongoDB, and AI-powered blog post generation (Eden AI/OpenAI). It features dark mode, beautiful UI, and an AI assistant to help you write blog posts.

## Features
- Modern, responsive UI with dark mode
- Compose, edit, and view blog posts
- AI-powered blog post generation (Eden AI/OpenAI)
- MongoDB Atlas cloud database

## Getting Started (Local Development)

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```
MONGODB_URI=your-mongodb-atlas-uri
EDEN_API_KEY=your-eden-ai-api-key
```

### 4. Start the server
```sh
npm start
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Deploying to Render
1. Push your code to GitHub.
2. Go to [Render.com](https://render.com/) and create a new Web Service.
3. Connect your GitHub repo.
4. Set the following environment variables in the Render dashboard:
   - `MONGODB_URI` (your MongoDB Atlas URI)
   - `EDEN_API_KEY` (your Eden AI API key)
5. Set the start command to `npm start`.
6. Deploy and enjoy your live blog!

---

## Project Structure
```
weather/
  blog.js
  package.json
  views/
    home.ejs
    about.ejs
    contact.ejs
    compose.ejs
    post.ejs
    list.ejs
    footer.ejs
    header.ejs
  blog-css/
    style.css
  .gitignore
  README.md
```

---

## License
MIT 
