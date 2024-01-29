Node.js Content Management API
This project is a content management API built with Node.js, Express, MongoDB, and Mongoose. It allows for the creation, retrieval, updating, and deletion of user-generated content, as well as user registration, authentication, and profile management. This API supports multimedia content uploads to Cloudinary and includes features such as content tagging, commenting, and access control based on user roles.



Features
# User authentication and authorization with JWT.
# CRUD operations for content (articles, blogs, tutorials, etc.).
# File upload for content images and user profile pictures to Cloudinary.
# Commenting system for user-generated content.
# Role-based access control (Regular users and Content Creators).
# User profile and cover image management.

Technologies Used

Node.js: JavaScript runtime for the backend.
Express: Web application framework for Node.js.
MongoDB: NoSQL database for storing application data.
Mongoose: MongoDB object modeling tool.
bcryptjs: Library for hashing and comparing passwords.
jsonwebtoken: Implementation of JSON Web Tokens for authentication.
multer-storage-cloudinary & cloudinary: For handling file uploads to Cloudinary.
dotenv: To load environment variables from a .env file.


Install dependencies
# npm install


Start the server:

# npm start