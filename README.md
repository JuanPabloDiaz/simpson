# The Simpsons API

![The Simpsons Logo](/public/logo.png)

A full-stack Next.js application that provides a RESTful API for The Simpsons characters, episodes, and products with an interactive documentation interface.

## 🚀 Live Demo

Visit the live application at [https://the-simpsons-api.vercel.app](https://the-simpsons-api.vercel.app)

## ✨ Features

- **RESTful API** - Access data about Simpsons characters, episodes, and products
- **Interactive API Documentation** - Explore and test API endpoints with Swagger UI
- **Responsive UI** - Simpsons-themed interface that works on all devices
- **Server-side Rendering** - Fast page loads with Next.js
- **Modern Design** - Clean, intuitive interface with Simpsons color scheme

## 📚 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/characters` | Get all characters |
| `/api/characters/[slug]` | Get a specific character by slug |
| `/api/episodes` | Get all episodes |
| `/api/episodes/[slug]` | Get a specific episode by slug |
| `/api/products` | Get all products |
| `/api/products/[slug]` | Get a specific product by slug |
| `/api/docs` | OpenAPI specification |

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **API Documentation**: Swagger UI, OpenAPI
- **Icons**: Iconify
- **Deployment**: Vercel

## 🏁 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/simpson.git
cd simpson
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📝 Project Structure

```
/
├── app/                # Next.js 13 app directory
│   ├── api/            # API routes
│   ├── characters/     # Characters pages
│   ├── episodes/       # Episodes pages
│   ├── products/       # Products pages
│   ├── api-docs/       # API documentation page
│   └── page.jsx        # Homepage
├── components/         # Reusable components
├── lib/                # Utility functions and data
│   └── swagger.js      # OpenAPI specification
├── public/             # Static assets
└── ...
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please check out our [Contributing Guide](CONTRIBUTING.md) for more details.

## 🙏 Acknowledgements

- Data sourced from The Simpsons series
- Icons provided by [Iconify](https://iconify.design/)
- Built with [Next.js](https://nextjs.org/)
