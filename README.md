JWT Secure App

A Node.js web application that demonstrates secure authentication and authorization using JSON Web Tokens (JWT). The app includes a /login endpoint to authenticate users and issue a JWT, and a /protected endpoint accessible only to users with the "admin" role.

Prerequisites





Node.js and npm: Install from https://nodejs.org.





Verify with:

node -v
npm -v



Text Editor: VS Code or any preferred editor.



Testing Tools: Postman or curl for API testing.

Setup





Create Project Folder:

mkdir jwt-secure-app
cd jwt-secure-app



Initialize Project:

npm init -y



Install Dependencies:

npm install express jsonwebtoken bcryptjs body-parser



Create server.js:





Copy the contents of server.js (provided in the project) into the jwt-secure-app folder.

Running the App





Start the Server:

node server.js





The server runs at http://localhost:3000.



Stop the Server:





Press Ctrl + C in the terminal.

Testing Endpoints

1. /login Endpoint





Method: POST



URL: http://localhost:3000/login



Body (JSON):

{
  "username": "admin",
  "password": "admin123"
}



Expected Response:

{
  "token": "<JWT_token>"
}



Using curl:

curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"



Using Postman:





Set method to POST, URL to http://localhost:3000/login, and add the JSON body.



Send the request and copy the token from the response.

2. /protected Endpoint





Method: GET



URL: http://localhost:3000/protected



Header: Authorization: Bearer <JWT_token>



Expected Response (for admin role):

{
  "message": "Welcome Admin! Secure content here."
}



Using curl:

curl -X GET http://localhost:3000/protected -H "Authorization: Bearer <JWT_token>"



Using Postman:





Set method to GET, URL to http://localhost:3000/protected, and add the Authorization header with Bearer <JWT_token>.



Send the request.

Notes





The app includes a mock database with two users:





admin (password: admin123, role: admin)



user (password: user123, role: user)



Only the admin role can access the /protected endpoint.



Tokens expire after 1 hour.

Submission





Stop the Server:





Press Ctrl + C in the terminal.



Delete node_modules:

rmdir /s /q node_modules  # Windows Command Prompt
# OR
Remove-Item -Recurse -Force node_modules  # PowerShell



Zip the Files:





Include: server.js, package.json, package-lock.json.



Exclude: node_modules.



Using File Explorer:





Select the files, right-click, and choose Send to > Compressed (zipped) folder.



Name the file jwt-secure-app.zip.



Using terminal:

tar -cvf jwt-secure-app.zip server.js package.json package-lock.json



Submit:





Upload jwt-secure-app.zip to the submission platform (e.g., Discord ticket).



Alternatively, push to GitHub:

git init
git add server.js package.json package-lock.json
git commit -m "JWT secure app submission"
git remote add origin <your-repo-url>
git push -u origin main

Share the GitHub link in the submission platform.

Troubleshooting





Module Not Found: Ensure dependencies are installed (npm install express jsonwebtoken bcryptjs body-parser).



Server Not Running: Verify node server.js shows Server running at http://localhost:3000.



Invalid Token: Re-authenticate via /login if the token expires.



curl Issues: Open a new terminal or run the server in the background (node server.js &).
