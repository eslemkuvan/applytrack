# ApplyTrack

ApplyTrack is a responsive job and internship application tracking application built with React and TypeScript.

Users can add, edit, delete, search, filter, sort and review their applications from a simple dashboard.

## Features

- Add new job and internship applications
- Edit existing applications
- Delete applications
- Search by company or position
- Filter applications by status
- Sort applications by application date
- View application details on a separate page
- View application statistics on the dashboard
- Save application data with localStorage
- Responsive design for desktop, tablet and mobile devices
- Client-side navigation with React Router

## Technologies

- React
- TypeScript
- Vite
- React Router
- CSS
- Web Storage API
- ESLint

## Application Statuses

Applications can be tracked with the following statuses:

- Applied
- Under Review
- Interview
- Offer
- Rejected
- Completed

## Routes

| Route | Description |
|---|---|
| `/` | Application summary dashboard |
| `/applications` | Application management page |
| `/applications/:id` | Individual application detail page |

## Project Structure

```text
src/
├── components/
│   ├── ApplicationCard.tsx
│   ├── Navigation.tsx
│   └── SummaryCard.tsx
├── pages/
│   ├── ApplicationDetailPage.tsx
│   ├── ApplicationsPage.tsx
│   └── DashboardPage.tsx
├── types/
│   └── Application.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

Make sure Node.js and npm are installed on your computer.

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run lint
```

Checks the project for code quality problems.

```bash
npm run build
```

Creates a production-ready build.

```bash
npm run preview
```

Runs the production build locally for testing.

## What I Learned

While developing this project, I practised:

- Creating reusable React components
- Managing state with `useState`
- Running side effects with `useEffect`
- Passing data and callback functions with props
- Lifting shared state to a parent component
- Creating controlled forms
- Rendering and transforming arrays
- Using TypeScript interfaces
- Saving and reading data with localStorage
- Creating routes with React Router
- Reading dynamic URL parameters with `useParams`
- Using Git commits to track project development

## Future Improvements

- User authentication
- Backend API and database integration
- Application notes and company links
- Deadline reminders
- Automated component tests
- Dark mode

## Author

Developed by Eslem Nur Kuvan.