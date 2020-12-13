# RSA Encryption System

## General Goal
- Provide a safe system that can encrypt your message. You don't have to worry about hackers or strangers  know about content of your chat. 

## Implementation

- Golang(Calculation): Golang will play as both encrypter and decryptor. Since Go is extremely good at calculation, using Go for this task will guarantee faster speed for server 
- Python (REST API): Since it's easy to import functions and data from other languages to Python, it is use as the bridge between client and  calculation. 
Here I use Flask framework.
- JavaScript (Front-end) Javascript is known for its diversity and ability to work in web enviroment. ReactJS is used to generate UI and speed up development process.


## Instruction 
- From root directory, run docker-compose build && docker-compose up
- In case Docker not wroking
    +Go to frontend folder, run npm install and run npm run start
    +In root folder run sudo apt install go. After finish run python3 app.py
- It will take a while to install npm and react-script.
- Notice: Port 3000 and 5000 must be free on your machine 
- Open web browser and go to localhost:3000/welcome
-  First you can choose whether you wan to generate key or want to send a message. If you are the receiver, go for generate key. There you must provide two distinct prime nummer to the server. Server will return to you 2 public key and 1 private key. You can give public key to your friends
so they can send you the secret without being known. Remmember your private key. You will need it to decrypt message. You can go to decrypt site after finish
- If you receive other's public key and want to send message, go for "send Message" option. There, you need to insert your keys and the message you want to send.
- In decrypt site (localhost:3000/decrypt), you must insert the first public key, private key and ecrypted message to get the message you want

## Communication
- We are separate the system into 3 parts: Calculator, Server and Client. Calculator will communicate with Server via Python "ctyes" and native library. 
- Communication between Server- Client (or front end - back end) will be set up via REST API (Flask). Server will receive request from client via HTTPS

## Feature
- Able to encrypt the message
- Able to decrypt the message
- In the future, I can save the chat log for each user so the message that they sent or receive will be save in the server. 