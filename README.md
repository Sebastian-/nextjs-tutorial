# Input Logic Study Project

This project is an extension of the NextJS tutorial found at: [Learn Next.js](https://nextjs.org/learn).

## Setup

Create a `.env.local` file containing a password for cookie encryption. Should look something like this (password must be 32 characters):

```
COOKIE_PASSWORD=p50qGE5rhCCUMEBtuM7QLofUkZCog3xa
```

Start the dev server:

```
npm install
npm run dev
```

Default users for logging in:

| Username | Password |
| -------- | -------- |
| seb      | sebpass  |
| sue      | suepass  |

## Features

- Authentication
  - based on ecrypted session cookie using `next-iron-session`
  - users persisted in `/users/mock-users.json`
  - API support for logging in/out and registration
  - based on [this example](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session)
- Login and Register forms with validation via react-hook-form
- SWR hooks used to manage and provide user state
- Homepage greeting based on current user
- Client-based view counter using Zustand
  - view counts for blog posts shown on the homepage and post page
  - view count increments each time a post page is visited
  - store integration based on [nextjs with zustand example](https://github.com/vercel/next.js/tree/canary/examples/with-zustand)
