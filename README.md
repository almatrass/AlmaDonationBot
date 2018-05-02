# AlmaDonationBot
This is a simple bot, created by me to solve the problem of OPSkins sending me 50 separate trade offers and having to accept them all. The bot will accept all incoming donation offers, and decline all offers in which you will be required to give items. 

### Setup and Usage

For Windows users, make sure node.js is installed, and run the `install.bat`, then `start.bat` files. 

For Linux/Mac users, navigate to the directory in Terminal, run `npm i`, and then `node bot` to run the bot. 

The `config.js` file is the only file you need to edit, and is fairly self-explanatory, just follow the comments in the code. The `admin` setting will cause the bot to accept all incoming offers from that user, regardless of whether the trade is profitable or not. 

If the admin Steam64 is a separate user from the account running the bot, all console messages will be outputted in Steam messages. 