# User Registration Template with Next.js

This template provides a user registration and authentication system using technologies. It is built with **Next.js**, **NextAuth**, **MongoDB**, **Nodemailer**, **React Hook Form**, **Axios**, and **TypeScript**.

## Features

- **User Authentication:** Secure user registration and login using NextAuth.
- **Password Reset:** Users can request password resets via email using Nodemailer.
- **Database Integration:** MongoDB for data storage.
- **Forms Management:** React Hook Form for easy and validated form handling.
- **API Requests:** Axios for streamlined communication with the backend.
- **Type Safety:** TypeScript for improved code reliability.
- **TailwindCss:** TailwindCss for the styles.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/)
- A valid email account for sending emails (e.g., Gmail, Outlook)

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:juanperezzdp/template-nextauth-credential.git
cd user-registration-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and configure the following variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
NEXTAUTH_SECRET=your-nextauth-secret
EMAIL_PASS=egofpmjyambdhegofpm
EMAIL_USER=your-email@example.com
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```plaintext
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │        ├── [...nextauth]  # NextAuth API route
│   │        ├── reset-password # API route change password
│   │        ├── reset-request  # Password reset API route
│   │        └── signup         # User registration API route
│   ├── pages.tsx               # Login page
│   ├── register                # Registration page
│   ├── new-password            # Change password page
│   ├── reset-password          # Password reset page
│   ├── dashboard               # Dashboard page
│   ├── globals.css             # Global styles
│   └── Providers.txs           # Providers global page
├── lib/
│   └── mongodb.ts              # MongoDB connection utilities
├── models/
│   ├── resetPassword.ts        # Schema reset password
│   └── user.ts                 # Scheme to register users
└── middleware.ts
```

## Usage

### User Registration

1. Navigate to `/register`.
2. Fill in the registration form.
3. A new user record will be saved in MongoDB.

### Login

1. Navigate to `/`.
2. Enter your credentials.
3. On success, you'll be redirected to the dashboard.

### Password Reset

1. Navigate to `/reset-password`.
2. Enter your email address.
3. Check your email for the reset link.
4. Follow the link to set a new password.

## Technology Stack

- **Next.js**: React-based framework for building web applications.
- **NextAuth**: Handles user authentication securely.
- **MongoDB**: Stores user data persistently.
- **Nodemailer**: Sends password reset emails.
- **React Hook Form**: Simplifies form handling and validation.
- **Axios**: Makes API communication seamless.
- **TypeScript**: Ensures type safety and reduces bugs.
- **TailwindCss**: TailwindCss for the styles.

## Customization

### Adding New Features

- Add new API routes in the `src/app/api/` directory.
- Create new pages in `src/app/pages/` for additional functionalities.

### Styling

Modify the styles in `src/styles/globals.css` or integrate your preferred CSS framework.

## Deployment

### Deploy to Vercel

1. Push your project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and import your repository.
3. Set up the environment variables in the Vercel dashboard.
4. Deploy your application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests to improve the template.
