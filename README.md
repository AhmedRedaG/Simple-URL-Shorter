# Simple URL Shortener

A lightweight and efficient URL shortening service built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔗 Create short URLs from long URLs
- ⚡ Fast redirects to original URLs
  format
- 🚀 TypeScript for type safety and better development experience

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: CORS, JSend response formatting
- **Development**: TSC Watch for hot reloading

## Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Simple-URL-Shorter
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/url-shortener
PORT=3000
```

## Usage

### Development Mode

```bash
npm run dev
```

This will start the development server with hot reloading enabled.

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Create Short URL

- **POST** `/`
- **Body**: `{ "originalUrl": "https://example.com/very-long-url" }`
- **Response**: `{ "status": "success", "data": { "shortUrl": "https://baseurl.com/abc123"}`

### Redirect to Original URL

- **GET** `/:shortUrlId`
- **Response**: Redirects to the original URL and increments visit count

### Get Full URL Info

- **GET** `/:shortUrlId/info`
- **Response**: `{
    "status": "success",
    "data": {
        "urlInfo": {
            "shortUrl": "https://baseurl.com/abc123",
            "shortUrlId": "abc123",
            "originalUrl": "https://originalurl.com",
            "visits": 8,
            "createdAt": "2025-08-24T23:13:20.924Z",
            "updatedAt": "2025-08-24T23:47:01.177Z"
        }
    }
}`

## License

This project is open source and available under the [MIT License](LICENSE).
