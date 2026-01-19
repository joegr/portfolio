# Portfolio Website

A modern, responsive portfolio website showcasing Full Stack Development, Data Science, and Data Engineering projects.

## 🚀 Features

- **Three Portfolio Sections**: Full Stack, Data Science, and Data Engineering
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Interactive Elements**: Hover effects, scroll animations, and dynamic content
- **Contact Form**: Functional contact form (frontend only)
- **Navigation**: Smooth scrolling navigation with active link highlighting

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: No frameworks, pure JavaScript for all interactions
- **Font Awesome**: Icons for UI elements
- **Google Fonts**: Inter font for typography

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Images and other assets (if needed)
```

## 🎨 Customization

### Adding Your Own Projects

Edit the `portfolioData` object in `script.js` to add your own projects:

```javascript
const portfolioData = {
    fullstack: [
        {
            id: 1,
            title: "Your Project Title",
            description: "Project description goes here",
            image: "path/to/your/image.jpg",
            technologies: ["Tech1", "Tech2", "Tech3"],
            github: "https://github.com/yourusername/project",
            demo: "https://project-demo.com"
        }
        // Add more projects...
    ],
    datascience: [
        // Your data science projects...
    ],
    dataengineering: [
        // Your data engineering projects...
    ]
};
```

### Personalizing Contact Information

Update the contact section in `index.html`:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>Email</h4>
        <p>your.email@example.com</p>
    </div>
</div>
```

### Customizing Colors

Modify the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* Add more color variables... */
}
```

## 🌐 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository settings
3. Scroll down to "GitHub Pages"
4. Select "Deploy from a branch" and choose `main` branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Push your code to GitHub
2. Sign up for Netlify and connect your GitHub account
3. Select your repository
4. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
5. Click "Deploy site"

### Vercel

1. Push your code to GitHub
2. Sign up for Vercel and connect your GitHub account
3. Import your repository
4. Deploy settings:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Click "Deploy"

### Other Static Hosting

The site can be deployed to any static hosting service like:
- AWS S3 + CloudFront
- Firebase Hosting
- DigitalOcean App Platform
- Heroku (with static buildpack)

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Getting Started Locally

1. Clone or download the repository
2. Open `index.html` in your browser
3. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```
4. Visit `http://localhost:8000`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue.

## 📧 Contact

- Email: your.email@example.com
- GitHub: github.com/yourusername
- LinkedIn: linkedin.com/in/yourprofile

---

**Built with ❤️ using HTML, CSS, and JavaScript**
