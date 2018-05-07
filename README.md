# AlmaDonationBot
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/almatrass/AlmaDonationBot/blob/master/LICENSE)

This is a simple Steam bot, written in node.js and created by me to solve the problem of OPSkins sending me 50 separate trade offers and having to accept them all. The bot will accept all incoming donation offers, and decline all offers in which you will be required to give items. 

### Setup

Clone this repository to your local machine, and make sure you have node.js installed.

The `config.js` file is the only file you need to edit, and is fairly self-explanatory, just follow the comments in the code. The `admin` setting will cause the bot to accept all incoming offers from that user, regardless of whether the trade is profitable or not. If the admin Steam64 is a separate user from the account running the bot, all console messages will also be outputted in Steam messages. 

### Usage

For Windows users, simply just run the `install.bat`, then `start.bat` files. 

For Linux/Mac users, navigate to the directory in Terminal, eg. `cd /home/user/AlmaDonationBot-master`. 
Then run the command `npm i`, and then `node bot` to run the bot. 