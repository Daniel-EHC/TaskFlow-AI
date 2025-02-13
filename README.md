# TaskFlow AI 🤖✨

TaskFlow AI is a smart task management application that helps you organize your tasks efficiently using artificial intelligence. The app automatically prioritizes your tasks and persists data in your browser's local storage for seamless task management.

## Features ✨

- AI-powered task prioritization
- Local storage persistence
- Clean and intuitive user interface
- Real-time task organization
- Responsive design

## Technologies Used 🛠️

- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Generative AI](https://ai.google.dev/) - AI capabilities
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Date-fns](https://date-fns.org/) - Date manipulation
- [Lucide React](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

## Getting Started 🚀

### Prerequisites

- Node.js (version 14 or higher)
- pnpm (`npm install -g pnpm`)

### Installation

1. Clone the repository
```bash
git clone https://github.com/deniyaldanidan/taskflow-ai.git
cd app
```

2. Install dependencies
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your Google API Key
```bash
VITE_AI_API_KEY=your_api_key_here
```

4. Start the development server
```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production 🏗️

To create a production build, run:
```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.