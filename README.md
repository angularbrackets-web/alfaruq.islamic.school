This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Key Features

### Admin Post Management

The project includes a comprehensive admin dashboard for managing posts.

*   **Add Posts:** A dedicated form at `/admin/new` allows administrators to create new posts with a title, date, text content, and an uploaded image or video. Posts can also be pinned.
*   **Edit Posts:** Existing posts can be modified through an edit page, allowing updates to all fields.
*   **Delete Posts:** From the main admin dashboard, administrators can remove posts.
*   **View Posts:** The `/admin` page lists all current posts for easy management.

### Teacher Management

The project also includes a section for managing and displaying teacher information.

*   **Add Teachers:** A dedicated form at `/admin/teachers/new` allows administrators to add new teachers with their name and a poster.
*   **Delete Teachers:** From the teacher management dashboard at `/admin/teachers`, administrators can remove teachers.
*   **View Teachers:** The `/teachers` page displays a grid of all teacher posters.

## Technical Architecture

This project uses a modern web architecture composed of the following services:

*   **Frontend:** The user interface is built with [Next.js](httpss://nextjs.org), a React framework for building server-rendered and statically generated web applications.

*   **Database:** Post data is stored in **Firebase Firestore**, a NoSQL cloud database.
    *   All post information (title, date, text, etc.) is stored in a collection named `posts`.
    *   Each post is a separate document within this collection.

*   **Media Storage:** Media files (images and videos) are handled by **Cloudinary**.
    *   Files are uploaded directly from the user's browser to Cloudinary via an upload widget.
    *   The application does not store the files themselves. Instead, it saves the secure URL provided by Cloudinary into the post's document in Firestore.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.