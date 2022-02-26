// V 1.3  // lates change: first message sound und welcome

const tmi = require('tmi.js');
const fs = require('fs');

const slot_symbols = ['🍐', '🍒', '🍍', '🍇', '🍉', '🍑', '🍊']; // propability of getting a triple is 2.04%
const CC_SYMBOL = "₵₵"; // Captain's Coin

const INITIAL_CC_BALANCE = 50;
const WELCOME_MSG = "Ahoy, Matey! Welcome aboard "; // followed by: username!

const DISCORD_INVITE = "https://discord.gg/X5KGBJGTPu";
const REDDIT_LINK = "https://www.reddit.com/r/captaincasimir/";

const SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS = "ctn_uuh.mp3";
const SOUND_ENORM = "enorm.mp3";
const SOUND_OH_YEAH = "oh-yeah.mp3";
const SOUND_THOMAS = "thomas_earrape.mp3";
const SOUND_FAIL = "fail.mp3";
const SOUND_INCEPTION = "inception.mp3";
const SOUND_FOX_INTRO = "fox_intro.mp3";
const SOUND_HES_A_PIRATE = "hes-a-pirate.mp3";
const SOUND_INTRO_CLIP = "intro_clip.mp3";
const SOUND_AYE_AYE_CAPTAIN = "aye-aye-captain.mp3";


const REWARD_ID_STRECH = "8c31a6f0-b319-4865-9c4a-e9b57b960311";
const REWARD_ID_BRAUSE = "a37d499f-1550-488b-896a-2b43e2ec9c2f";
const REWARD_ID_SOUND_THOMAS = "afcbdea0-0eee-4a35-8d18-a1e71e62703f";
const REWARD_ID_SOUND_FAIL = "3efc8ce0-3da1-40a7-83b5-a2725ab2b1f9";
const REWARD_ID_SOUND_INCEPTION = "fe96b4b0-11f2-449d-92e1-65cde878e110";
const REWARD_ID_MUSIC_REQUEST = "c9b4dfaa-a3fb-4f97-8195-14de8822a5b8";

const SYMBOL_TM = "™";

const GLOBAL_COMMAND_COOLDOWN = 3; // seconds
const ENABLE_COMMAND_COOLDOWN = true;
const ENABLE_COMMAND_COOLDOWN_MESSAGE = false; // disabled because whisper dont work

const COMMAND_HELP_OUTPUT = "---- Captain's commands -----\n";

// Define configuration options
const opts = {
  identity: {
    username: "CaptainsEngineer",
    //password: "oauth:0ubb2esitt1x1bnt1kw6n2ll16hdfo"
    password: "oauth:dj9k6ncwzz7u0dwmy5y241ojvxd950"
  },
  channels: [
    //"captaincasimir"
    "DeltaTecs"
  ]
};

// initialize cooldown map
var command_cooldowns = [];

// no sounds mode
var silent_mode = false;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

var chatters = loadChatters();

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  if (context["custom-reward-id"] != undefined) {
    onReward(target, context, self);
    return;
  }

  handleFirstChatter(context.username, target);

  if (msg.includes("einzigster")) {
    client.say(target, `einziger*!`);
    return;
  } else if (msg.includes("einzigste")) {
    client.say(target, `einzige*!`);
    return;
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();
  if (commandName[0] != '!')
    return;

  onCommand(target, context, commandName, self);
}


function onReward(target, context, self) {

  console.log("id: " + context["custom-reward-id"]);
  
  if (context["custom-reward-id"] === REWARD_ID_BRAUSE) {
  
    playSound(SOUND_ENORM);
  
  } else if (context["custom-reward-id"] === REWARD_ID_STRECH) {

    playSound(SOUND_OH_YEAH);

  } else if (context["custom-reward-id"] === REWARD_ID_SOUND_THOMAS) {

    playSound(SOUND_THOMAS, 7000);

  } else if (context["custom-reward-id"] === REWARD_ID_SOUND_FAIL) {

    playSound(SOUND_FAIL, 7000);

  } else if (context["custom-reward-id"] === REWARD_ID_SOUND_INCEPTION) {

    playSound(SOUND_INCEPTION, 6500);

  } else if (context["custom-reward-id"] === REWARD_ID_MUSIC_REQUEST) {

    playSound(SOUND_FOX_INTRO, 10500);

  }
}


function onCommand(target, context, commandName, self) {


  // check if user on cooldown
  if (command_cooldowns[context.username] != undefined && context.username != "deltatecs" && context.username != "captaincasimir" && ENABLE_COMMAND_COOLDOWN) {
    if (getTime() - command_cooldowns[context.username] <= GLOBAL_COMMAND_COOLDOWN) { // user on cooldown and not excepted from cooldown
      console.log("user " + context.username + " on cooldown");
      if (!ENABLE_COMMAND_COOLDOWN_MESSAGE)
        return;
      else { // whisper cooldown notification
        whisperBack(target, context, (getTime() - command_cooldowns[context.username]) + "s of command cooldown remaining")
        return;
      }
    }
  }

  // reset user cooldown
  command_cooldowns[context.username] = getTime()[0];

  // If the command is known, let's execute it
  if (commandName === '!dice') {

    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);

  } else if (commandName === '!watchtime') {

    client.say(target, `42069 seconds`);
    console.log(`* watchtime`);

  } else if (commandName === '!slots') {

    console.log(`* slots`);
    slotsCommand(target, context, self);

  } else if (commandName === '!discord') {

    console.log(`* discord`);
    client.say(target, DISCORD_INVITE);

  } else if (commandName === '!reddit') {

    console.log(`* reddit`);
    client.say(target, REDDIT_LINK);

  } else if (commandName === '!tm') {

    tmCommand(target, context, self);
  
  } else if (commandName === '!sound') {

    console.log(`* sound`);
    playSound(SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS);

  } else if (commandName === '!silent') {

    muteCommand(target, context, self);

  } else {
    console.log(`* Unknown command ${commandName}`);
    whisperBack(target, context, `unknown command ${commandName}`);
  }
}

function muteCommand(target, context, self) {

  if (context.username != "captaincasimir") {
    return;
  }

  silent_mode = !silent_mode;
  console.log(`* toggeling silent mode to ` + silent_mode);
  if (silent_mode)
    client.say(target, "Sounds enabled");
  else
    client.say(target, "Sounds disabled");

}

function handleIncrementBalance(target, context, self) {
  WOW!
  uuuu

}

function tmCommand(target, context, self) {
  whisperBack(target, context, SYMBOL_TM);
}

function slotsCommand(target, context, self) {
  client.say(target, getSlotOutput());
}

function getSlotOutput() {
  return slot_symbols[getRandomInt(slot_symbols.length)] + slot_symbols[getRandomInt(slot_symbols.length)] + slot_symbols[getRandomInt(slot_symbols.length)];
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function handleFirstChatter(name, target) {

  if (!isUserKnown(name)) {

    let sound_selection = getRandomInt(3);

    if (sound_selection == 0) {
      playSound(SOUND_HES_A_PIRATE, duration=13000);
    } else if (sound_selection == 1) {
      playSound(SOUND_INTRO_CLIP, duration=8000);
    } else {
      playSound(SOUND_AYE_AYE_CAPTAIN, duration=5500);
    }


    //updateUser(name, INITIAL_CC_BALANCE);
    client.say(target, WELCOME_MSG + name + "!");
  }

}

function playSound(sound_path, duration=3000) {

  if (silent_mode) { // no sounds during silent mode
    console.log("sound " + sound_path + " suppressed due to silent mode");
    return;
  }

  console.log("playing sound " + sound_path);
  const player = require('play-sound')();
  player.play(sound_path, { timeout: duration }, (err) => {
      if (err) console.log(`Could not play sound: ${err}`);
  });
}

function getRandomInt(max) {
  var val = Math.floor(Math.random() * max);
  return val < max ? val : val - 1;
}

function isUserKnown(user) {
  for (acc of chatters.accounts) {
    if (acc.name == user)
      return true;
  }
  return false;
}

function updateUser(user, balance) tunnek MediaStream
  
  accs_updated = [];
  updated = false;
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      acc.balance = balance;
      updated = true;
    }
    accs_updated.push({"name" : acc.name, "balance" : acc.balance});
  }

  if (!updated) { // no update so far, assume new user
    accs_updated.push({"name" : user, "balance" : balance});
  }

  json = {"accounts" : accs_updated};

  // write changes to file
  fs.writeFileSync('chatters.json', JSON.stringify(json));
  chatters = json;
}

function loadChatters() {
  let rawdata = fs.readFileSync('chatters.json');
  if (rawdata == "") { // if file absent, create it
    rawdata = "{\"accounts\" : [{\"name\" : \"obama69\", \"balance\" : 420}]}";
    fs.writeFileSync('chatters.json', rawdata);
  }
  let chatters = JSON.parse(rawdata);
  return chatters;
}

function whisperBack(target, context, message) {
  client.say(target, message);
  //client.say(target, "/w " + context.username + " " + message);
  //console.log("/w " + context.username + " " + message);
}

// returns time in seconds since process start
function getTime() {
  return process.hrtime()[0];
}