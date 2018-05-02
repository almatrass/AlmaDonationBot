const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const config = require('./config');

const client = new SteamUser();
const logOnOptions = {
    accountName: config.accountName,
    password: config.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};
client.logOn(logOnOptions);

const community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

client.on('webSession', (sid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(20000, config.identitySecret);
    community.chatLogon();
});

client.on('loggedOn', () => {
    client.setPersona(SteamUser.Steam.EPersonaState.Online, config.steamName);
    client.gamesPlayed(config.inGame);
    console.log(`Bot logged on, listening for trade offers!`);
});

community.on('chatLoggedOn', () => {
    community.chatMessage(config.admin, `Chat logged on`);
    console.log(`Chat logged on`);
})

manager.on('newOffer', offer => {
    if (offer.partner.getSteamID64() === config.admin) {
        offer.accept(false, function(err, status) {
            if (err) {
                community.chatMessage(config.admin, `There was a problem accepting admin trade offer`);
                console.log(`There was a problem accepting admin trade offer`);
            } else {
                community.chatMessage(config.admin, `Admin trade offer accepted`);
                console.log(`Admin trade offer accepted`);
            }
        })
    } else if (offer.itemsToGive.length === 0) {
        offer.accept(false, function(err, status) {
            if (err) {
                community.chatMessage(config.admin, `There was a problem accepting a trade. Partner Steam64: ${offer.partner.getSteamID64()}`);
                console.log(`There was a problem accepting a trade. Partner Steam64: ${offer.partner.getSteamID64()}`);
            } else {
                community.chatMessage(config.admin, `Donation accepted. Partner Steam64: ${offer.partner.getSteamID64()}`);
                console.log(`Donation accepted. Partner Steam64: ${offer.partner.getSteamID64()}`);
            }
        });
    } else {
        offer.decline(function(err) {
            if (err) {
                community.chatMessage(config.admin, `There was a problem declining a trade. Partner Steam64: ${offer.partner.getSteamID64()}`);
                console.log(`There was a problem declining a trade. Partner Steam64: ${offer.partner.getSteamID64()}`);
            } else {
                community.chatMessage(config.admin, `Declined scam trade. Partner Steam64: ${offer.partner.getSteamID64()}`);
                console.log(`Declined scam trade. Partner Steam64: ${offer.partner.getSteamID64()}`);
            }
        });
    }
});