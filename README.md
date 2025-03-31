# Instagram Clone

This is a Next.js project that mimics the functionality of Instagram, allowing users to register, log in, and view a feed of posts. The application is integrated with Firebase for authentication and data storage.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd instagram-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add your Firebase configuration:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Features

- User authentication (login and registration)
- User profile management
- Feed displaying posts from users
- Responsive design

## Learn More

To learn more about Next.js, check out the [Next.js Documentation](https://nextjs.org/docs).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.