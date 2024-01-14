/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    domains: ["books.google.com", "www.googleapis.com"], 
    /*
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.googleapis.com",
        pathname: "/books/v1/volumes/",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      }
    ],
    */
  },
};
