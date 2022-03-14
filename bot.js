// V 2.4.7  // lates change: 50% sounds

const tmi = require('tmi.js');
const fs = require('fs');
const { exec } = require('child_process');
const say = require('say');

const slot_symbols = ['🍐', '🍒', '🍍', '🍇', '🍉', '🍑', '🍊']; // propability of getting a triple is 2.04%
const CC_SYMBOL = "₵₵"; // Captain's Coin

const DISCORD_INVITE = "https://discord.gg/X5KGBJGTPu";
const REDDIT_LINK = "https://www.reddit.com/r/captaincasimir/";

const FILENAME_DEATH_COUNTER = "deathcounter.txt"
const DEATH_COUNTER_PREFIX = "DEATHS:";
const FILENAME_BRAUSE_COUNTER = "brausecounter.txt"
const BRAUSE_COUNTER_PREFIX = "BRAUSE:";

const GOLDEN_EMOTE = "captai1955Golden"

// change sound volumne, except tts
const GLOBAL_VOLUME_MULTIPLIER = 0.2; // min: 0.0, max: 1.0

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
const SOUND_JACKPOT = "jackpot.mp3";
const SOUND_SUPER_JACKPOT = "super-jackpot.mp3";
const SOUND_SON_OF_A_BITCH = "son-of-a-bitch.mp3";
const SOUND_BRAWL = "brawl.mp3";
const SOUND_JOJO_GOLDEN_WING = "jojo-golden-wind.mp3";
const SOUND_NANI = "nani.mp3";
const SOUND_JOJO_TO_BE_CONTINUED = "jojo-tbc.mp3";
const SOUND_JOJO_STROHEIM = "jojo-stroheim.mp3";
const SOUND_MAGIC = "magic.mp3";
const SOUND_SKRILLEX = "skrillex.mp3";
const SOUND_WILHELM_SCREAM = "wilhelm-scream.mp3";
const SOUND_AIRHORN = "airhorn.mp3";
const SOUND_WASTED = "wasted.mp3";
const SOUND_CHALLENGE = "challenge.mp3";


const REWARD_ID_STRECH = "8c31a6f0-b319-4865-9c4a-e9b57b960311";
const REWARD_ID_BRAUSE = "a37d499f-1550-488b-896a-2b43e2ec9c2f";
const REWARD_ID_SOUND_THOMAS = "afcbdea0-0eee-4a35-8d18-a1e71e62703f";
const REWARD_ID_SOUND_FAIL = "3efc8ce0-3da1-40a7-83b5-a2725ab2b1f9";
const REWARD_ID_SOUND_INCEPTION = "fe96b4b0-11f2-449d-92e1-65cde878e110";
const REWARD_ID_MUSIC_REQUEST = "c9b4dfaa-a3fb-4f97-8195-14de8822a5b8"; 
const REWARD_ID_SCREAM = "e9456e46-8d24-4e89-bec3-dc0d5132ba6c";
const REWARD_ID_CHALLENGE_GLOBAL = "-bec3-dc0d5132ba6c";
const REWARD_ID_CHALLENGE_HUNT = "5d798aed-c0bd-48f2-aaae-2ab3b24dea81";

const INITIAL_CC_BALANCE = 50;
const CC_COST_SLOTS = 5;
const CC_SLOTS_MAX_INPUT = 100;
const CC_COST_TTS = 30;
const CC_RETURN_SLOTS_BASIC = 200;
const CC_RETURN_SLOTS_PEACH = 1000;
const CC_PER_CHAT = 1;
const WELCOME_MSG = "Ahoy, Matey! ⛵ Welcome aboard "; // followed by: username!
const LURK_MSG_0 = "Thank you for boarding the ship ";
const LURK_MSG_1 = " ⛵ Lay back and enjoy your drink <3"
const TUTORIAL_COOLDOWN = 300; // how often the tutorial can be requested (in seconds)

const CC_SOUNDS = [
  {name: "gulb", price: 5, sound: SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS},
  {name: "nani", price: 10, sound: SOUND_NANI},
  {name: "magic", price: 10, sound: SOUND_MAGIC},
  {name: "scream", price: 10, sound: SOUND_WILHELM_SCREAM},
  {name: "wasted", price: 15, sound: SOUND_WASTED},
  {name: "airhorn", price: 20, sound: SOUND_AIRHORN},
  {name: "fail", price: 20, sound: SOUND_FAIL},
  {name: "inception", price: 30, sound: SOUND_INCEPTION},
  {name: "to-be-continued", price: 30, sound: SOUND_JOJO_TO_BE_CONTINUED},
  {name: "earrape", price: 500, sound: SOUND_THOMAS}
]

const CC_ANTHEMS = [
  {name: "anthem-gulb", price: 50, sound: SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS},
  {name: "anthem-magic", price: 100, sound: SOUND_MAGIC},
  {name: "anthem-scream", price: 100, sound: SOUND_WILHELM_SCREAM},
  {name: "anthem-airhorn", price: 150, sound: SOUND_AIRHORN},
  {name: "anthem-inception", price: 200, sound: SOUND_INCEPTION},
  {name: "anthem-jojo-tbc", price: 300, sound: SOUND_JOJO_TO_BE_CONTINUED},
  {name: "anthem-hes-a-pirate", price: 400, sound: SOUND_HES_A_PIRATE},
  {name: "anthem-brawl", price: 400, sound: SOUND_BRAWL},
  {name: "anthem-jojo-ost", price: 400, sound: SOUND_JOJO_GOLDEN_WING},
  {name: "anthem-jojo-stroheim", price: 400, sound: SOUND_JOJO_STROHEIM},
  {name: "anthem-skrillex", price: 500, sound: SOUND_SKRILLEX},
  {name: "anthem-earrape", price: 10000, sound: SOUND_THOMAS}
]

const SYMBOL_TM = "™";

const GLOBAL_COMMAND_COOLDOWN = 3; // seconds
const ENABLE_COMMAND_COOLDOWN = true;
const ENABLE_COMMAND_COOLDOWN_MESSAGE = false; // disabled because whisper dont work

// Define configuration options
const opts = {
  identity: {
    username: "CaptainsEngineer",
    //password: "oauth:0ubb2esitt1x1bnt1kw6n2ll16hdfo"
    password: "oauth:dj9k6ncwzz7u0dwmy5y241ojvxd950"
  },
  channels: [
    "captaincasimir"
    //"DeltaTecs"
  ]
};

// initialize cooldown map
var command_cooldowns = [];

// last tutorial display
var last_tutorial_print = getTime();

// no sounds mode
var silent_mode = false;

// death counter this session
var deaths = 0;

// brause counter this session
var deaths = 0;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

var chatters = loadChatters();

var users_seen = [];

var chat_target;

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self || context.username.toLowerCase() == 'captainsengineer') { return; } // Ignore messages from the bot
  chat_target = target;

  if (context["custom-reward-id"] != undefined) {
    onReward(target, context, self);
    return;
  }

  handleFirstChatter(context.username, target);

  handleAnthem(context.username, target);

  if (msg.includes("einzigster")) {
    client.say(target, `einziger*!`);
    return;
  } else if (msg.includes("einzigste")) {
    client.say(target, `einzige*!`);
    return;
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();
  if (commandName[0] != '!') {
    handleIncrementBalance(context.username); // increment only for non commands and rewards
    return;
  }

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

  } else if (context["custom-reward-id"] === REWARD_ID_SCREAM) {

    playSound(SOUND_SON_OF_A_BITCH, 10500);

  } else if (context["custom-reward-id"] === REWARD_ID_CHALLENGE_GLOBAL) {

    challenges = loadChallenges();

    if (challenges.length == 0) {
      client.say(target, "No global challenge saved");
      return;
    }

    playSound(SOUND_CHALLENGE, 5000);

    challenge = challenges.global[getRandomInt(challenges.global.length)];

    client.say(target, "🔥 CHALLENGE: " + challenge);

  } else if (context["custom-reward-id"] === REWARD_ID_CHALLENGE_HUNT) {

    challenges = loadChallenges();

    if (challenges.length == 0) {
      client.say(target, "No hunt challenge saved");
      return;
    }

    playSound(SOUND_CHALLENGE, 5000);

    challenge = challenges.hunt[getRandomInt(challenges.hunt.length)];

    client.say(target, "🔥 CHALLENGE: " + challenge);
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

  } else if (commandName.split(" ")[0] == "!slots") {

    console.log(`* slots`);
    slotsCommand(commandName.split(" "), target, context, self);

  } else if (commandName === '!discord' || commandName === '!dc') {

    console.log(`* discord`);
    client.say(target, DISCORD_INVITE);

  } else if (commandName === '!reddit') {

    console.log(`* reddit`);
    client.say(target, REDDIT_LINK);

  } else if (commandName === '!tm') {

    tmCommand(target, context, self);
  
  } else if (commandName === '!gulp') {

    console.log(`* gulp`);
    playSound(SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS);

  } else if (commandName === '!lurk') {

    console.log(`* lurk`);
    client.say(target, LURK_MSG_0 + context.username + LURK_MSG_1);

  } else if (commandName === '!silent' || commandName === '!silence') {

    console.log(`* toggle mute`);
    muteCommand(target, context, self);

  }  else if (commandName === '!tutorial') {

    console.log(`* tutorial cmd`);
    tutorialCommand(target, context, self);

  }  else if (commandName === '!help') {

    console.log(`* tutorial cmd`);
    tutorialCommand(target, context, self);

  }  else if (commandName === '!balance') {

    console.log(`* balance cmd`);
    balanceCommand(target, context, self);

  } else if (commandName.split(" ")[0] == "!givecc") {

    console.log(`* give coin cmd`);
    giveCoinCommand(commandName.split(" "), target, context, self);

  } else if (commandName.split(" ")[0] == "!transfer") {

    console.log(`* transfer coin cmd`);
    transferCoinCommand(commandName.split(" "), target, context, self);

  } else if (commandName.split(" ")[0] == "!death") {

    console.log(`* death cmd`);
    deathCommand(commandName.split(" "), target, context, self);

  } else if (commandName.split(" ")[0] == "!brause") {

    console.log(`* brause cmd`);
    brauseCommand(commandName.split(" "), target, context, self);

  } else if (commandName.split(" ")[0] == "!tts") {

    console.log(`* tts: ` + commandName.substring(4, commandName.length));
    ttsCommand(commandName.substring(4, commandName.length), target, context, self);

  }  else if (commandName.split(" ")[0] == "!purchase") {

    console.log(`* purchase cmd`);

    if (commandName.split(" ").length == 1) {
      // too few arguments
      whisperBack(target, context, "invalid usage, !purchase <list | itemname>");
      return;

    } else if (commandName.split(" ")[1] == "list") {
      // show item list
      purchaseListCommand(target, context, self);

    } else {
      // assume item purchase
      purchaseItemCommand(commandName.split(" "), target, context, self);
    }

  } else if (commandName.split(" ")[0] == "!forceplay") {

    console.log(`* force play`);
    forcePlayCommand(commandName.split(" "), target, context, self);

  } else if (commandName.split(" ")[0] == "!challenge") {

    console.log(`* challenge `);
    challengeCommand(commandName.split(" "), commandName, target, context, self);

  } else {
    console.log(`* Unknown command ${commandName}`);
    whisperBack(target, context, `unknown command ${commandName}`);
  }
}

function tutorialCommand(target, context, self) {

  // check for cooldown so it can't be spammed
  if (getTime() - last_tutorial_print < TUTORIAL_COOLDOWN) {
    client.say(target, " 🧭Tutorial on cooldown, please wait " + (TUTORIAL_COOLDOWN - (getTime() - last_tutorial_print)) + " seconds");
    return;
  } else
    last_tutorial_print = getTime();

  let tutorial = ": -- Captain's Manual 🧭🌍 -- :";
  client.say(target, tutorial);
  tutorial = "🤖 Basics: !discord, !reddit, !tm";
  client.say(target, tutorial);
  tutorial = "💰 Captain's Coin (" + CC_SYMBOL + "):";
  client.say(target, tutorial);
  tutorial = "- earn " + CC_PER_CHAT + " " + CC_SYMBOL + " per chat message";
  client.say(target, tutorial);
  tutorial = "- spend " + CC_SYMBOL + " on sounds 🔊";
  client.say(target, tutorial);
  tutorial = "- spend " + CC_SYMBOL + " on anthems (welcome sound) 🙋‍♂️";
  client.say(target, tutorial);
  tutorial = "- spend " + CC_SYMBOL + " on text to speech 🗨️";
  client.say(target, tutorial);
  tutorial = "- gamble with " + CC_SYMBOL + " on slots 🎰";
  client.say(target, tutorial);
  tutorial = "- view " + CC_SYMBOL + " balance: !balance 🏦";
  client.say(target, tutorial);
  tutorial = "- item types: sounds (play instantly), anthems (play on first message)"
  client.say(target, tutorial);
  tutorial = "- to list items to buy: !purchase list";
  client.say(target, tutorial);
  tutorial = "- to buy and activate an item: !purchase <name>";
  client.say(target, tutorial);
  tutorial = "- to buy and activate a tts message: !tts <message>";
  client.say(target, tutorial);
  tutorial = ": ----------------- :"
  client.say(target, tutorial);
}

function deathCommand(args, target, context, self) {

  if (context.username != "captaincasimir" && context.username != "deltatecs" && context.username != "xx_berenike_xx" && context.username != "stefan_2202") {
    return;
  }

  let toSet = deaths + 1;

  if (args.length > 1) {
    if (isNaN(args[1])) {
      whisperBack(target, context, "invalid arguments, !death [count to add]");
      return;
    }

    toSet = parseInt(args[1], 10);
  }

  setDeathCount(toSet);
}

function brauseCommand(args, target, context, self) {

  if (context.username != "captaincasimir" && context.username != "deltatecs" && context.username != "xx_berenike_xx" && context.username != "stefan_2202") {
    return;
  }

  let toSet = deaths + 1;

  if (args.length > 1) {
    if (isNaN(args[1])) {
      whisperBack(target, context, "invalid arguments, !brause [count to add]");
      return;
    }

    toSet = parseInt(args[1], 10);
  }

  setBrauseCount(toSet);
}

function muteCommand(target, context, self) {

  if (context.username != "captaincasimir") {
    return;
  }

  silent_mode = !silent_mode;
  console.log(`* toggeling silent mode to ` + silent_mode);
  if (silent_mode)
    client.say(target, "Sounds disabled");
  else
    client.say(target, "Sounds enabled");
}

function forcePlayCommand(args, target, context, self) {

  // check if authorised
  if (context.username == "captaincasimir" || context.username == "deltatecs") {
    // integrity guard
    if (args.length != 2 ) {
      whisperBack(target, context, "invalid arguments, !forceplay <titel>, see list: !purchase list");
      return;
    }

    let sound_name = args[1];

    // iterrate sounds
    for (let sound of CC_SOUNDS) {
      if (sound.name == sound_name) {
        playSound(sound.sound);
        return;
      }
    }

    // iterrate anthems
    for (let sound of CC_ANTHEMS) {
      if (sound.name == sound_name) {
        playSound(sound.sound);
        return;
      }
    }

    whisperBack(target, context, "sound not found: " + sound_name + ", see '!purchase list' for a list");    
  } // else: no athority, do nothing
}


function tmCommand(target, context, self) {
  whisperBack(target, context, SYMBOL_TM);
}


function ttsCommand(text, target, context, self) {

  if (silent_mode) {
    return;
  }

  if (checkProvanity(text)) {
    whisperBack(target, context, "TTS request dropped because of provanity. Don't be a dick when using tts pls.");
    return;
  }

  if (getUserBalance(context.username) < CC_COST_TTS) {
    whisperBack(target, context, "You are broke. Text-To-Speech costs " + CC_COST_TTS + CC_SYMBOL + "! Chat more.");
    return;
  }

  updateUserBalance(context.username, getUserBalance(context.username) - CC_COST_TTS);

  say.speak(context.username + " sagt: " + text);
}


function slotsCommand(args, target, context, self) {

  if (args.length == 1) { // no arguments, slot for 5 cc
    slotsDefault(target, context, self);
  } else {

    if (isNaN(args[1]) && args[1] != "all") {
      whisperBack(target, context, "invalid arguments, !slots [all|<amount>]");
      return;
    }

    let amount = 0;
    const balance = getUserBalance(context.username);

    if (args[1] == "all") {
      amount = balance;
      amount -= amount % CC_COST_SLOTS;
    } else {
      amount = parseInt(args[1], 10);
      amount -= amount % CC_COST_SLOTS;
    }

    if (amount < CC_COST_SLOTS) {
      whisperBack(target, context, "Not enough coin. Turning the slots once costs " + CC_COST_SLOTS + CC_SYMBOL);
      return;
    }

    if (amount > balance) {
      whisperBack(target, context, "You dont have coin. (" + balance + "/" + amount + ") " + CC_SYMBOL + ", chat more");
      return;
    }

    if (amount > CC_SLOTS_MAX_INPUT && context.username != "captaincasimir") {
      whisperBack(target, context, "Slot max is " + CC_SLOTS_MAX_INPUT + CC_SYMBOL);
      return;
    }

    let rolls = amount / 5;
    let win = 0;
    let superwin = 0;

    let slots_out_chosen = [];

    for (let i = 0; i < rolls; i++) {
      let slots_out = Array.from(getSlotOutput());
      if (slots_out[0] == '🍑' && slots_out[1] == '🍑' && slots_out[2] == '🍑') { // check super win
        slots_out_chosen = slots_out;
        superwin += CC_RETURN_SLOTS_PEACH;
      } else if (slots_out[0] == slots_out[1] && slots_out[1] == slots_out[2]) { // check basic win
        win += CC_RETURN_SLOTS_BASIC;
        if (superwin == 0) { // set output if no super jackpot
          slots_out_chosen = slots_out;
        }
      }
      if (superwin == 0 && win == 0) { // if no jackpot set last output
        slots_out_chosen = slots_out;
      }
    }


    updateUserBalance(context.username, balance + win + superwin - amount);

    console.log(context.username + " won slots: cc_before=" + balance + ", amount_in=" + amount + ", cc_after=" + getUserBalance(context.username) + ", win=" + win + ", superwin=" + superwin);


    // default animation
    let slots_out_fancy_0 = "[" + slots_out_chosen[0] + "|🔳|🔳]_📍   -" + (CC_COST_SLOTS * rolls) + "" + CC_SYMBOL;
    let slots_out_fancy_1 = "[" + slots_out_chosen[0] + "|" + slots_out_chosen[1] + "|🔳]_📍";
    let slots_out_fancy_2 = "[" + slots_out_chosen[0] + "|" + slots_out_chosen[1] + "|" + slots_out_chosen[2] + "]_📍";

    scheduleDelayedMessage(target, context, 0, slots_out_fancy_0);
    scheduleDelayedMessage(target, context, 600, slots_out_fancy_1);
    scheduleDelayedMessage(target, context, 1200, slots_out_fancy_2);

    let delay = 1200;

    for (let w = win; w > 0; w -= CC_RETURN_SLOTS_BASIC) {
      setTimeout(function() {
        client.say(target, "💰💰💰" + context.username + " WON " + CC_RETURN_SLOTS_BASIC + CC_SYMBOL + " 💰💰💰");
        playSound(SOUND_JACKPOT);
      }, delay);
      delay += 1000;
    }

    for (let w = superwin; w > 0; w -= CC_RETURN_SLOTS_PEACH) {
      setTimeout(function() {
        client.say(target, "💰💰💰 SUPER 💰💰💰 WIN 💰💰💰" + context.username + " WON " + CC_RETURN_SLOTS_PEACH + CC_SYMBOL + " 💰💰💰 " + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL);
        playSound(SOUND_SUPER_JACKPOT);
      }, delay);
      delay += 2000;
    }

    if (superwin + win > CC_RETURN_SLOTS_BASIC) {
      // print bill only if atleast two basic wins or a super win
      setTimeout(function() {
        client.say(target, "-- total: " + balance + CC_SYMBOL + " >> " + (balance - amount + win + superwin) + CC_SYMBOL + " --");
      }, delay - 900);
    }
  }


}

function slotsDefault(target, context, self) {
  let userbalance = getUserBalance(context.username);

  if (userbalance < CC_COST_SLOTS) {
    whisperBack(target, context, "You are broke. Turning the slots costs " + CC_COST_SLOTS + CC_SYMBOL + "! Chat more.");
    return;
  } else {
    updateUserBalance(context.username, userbalance - CC_COST_SLOTS);

    let slots_out = Array.from(getSlotOutput());
    let slots_out_fancy_0 = "[" + slots_out[0] + "|🔳|🔳]_📍   -" + CC_COST_SLOTS + CC_SYMBOL;
    let slots_out_fancy_1 = "[" + slots_out[0] + "|" + slots_out[1] + "|🔳]_📍";
    let slots_out_fancy_2 = "[" + slots_out[0] + "|" + slots_out[1] + "|" + slots_out[2] + "]_📍";


    scheduleDelayedMessage(target, context, 0, slots_out_fancy_0);
    scheduleDelayedMessage(target, context, 600, slots_out_fancy_1);
    scheduleDelayedMessage(target, context, 1200, slots_out_fancy_2);

    // check win
    if (slots_out[0] == '🍑' && slots_out[1] == '🍑' && slots_out[2] == '🍑') { // check super win

      updateUserBalance(context.username, getUserBalance(context.username) + CC_RETURN_SLOTS_PEACH);
      setTimeout(function() {
        playSound(SOUND_SUPER_JACKPOT);
        client.say(target, "💰💰💰" + context.username + " WON THE SLOTS: +" + CC_RETURN_SLOTS_PEACH + CC_SYMBOL + " 💰💰💰");
        client.say(target, CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL + CC_SYMBOL);
      }, 1200);

    } else if (slots_out[0] == slots_out[1] && slots_out[1] == slots_out[2]) { // check basic win

      updateUserBalance(context.username, getUserBalance(context.username) + CC_RETURN_SLOTS_BASIC);
      setTimeout(function() {
        playSound(SOUND_JACKPOT);
        client.say(target, "💰💰💰" + context.username + " WON THE SLOTS: +" + CC_RETURN_SLOTS_BASIC + CC_SYMBOL + " 💰💰💰");
      }, 1200);
    }

    return;
  }
}


function scheduleDelayedMessage(target, context, delay, message) {

  setTimeout(function() {
    client.say(target, message);
  }, delay);
}


function balanceCommand(target, context, self) {
  whisperBack(target, context, "your balance is " + getUserBalance(context.username) + CC_SYMBOL);
}

function challengeCommand(args, cmd, target, context, self) {

    // check if authorised
    if (context.username == "captaincasimir" || context.username == "deltatecs") {

      if (args.length < 3 || (args[1] != "hunt" && args[1] != "global")) {
        whisperBack(target, context, "invalid arguments, !challenge <hunt|global> <challenge text>");
        return;
      }

      let text = cmd.replaceAll('!challenge hunt', '').replaceAll('!challenge global', '');
      let challenges = loadChallenges();

      if (args[1] == 'hunt') {
        
        challenges.hunt.push(text);

      } else {

        challenges.global.push(text);

      }

      writeChallenges(challenges);




    }


}


function checkProvanity(text) {
  let t = text.toLowerCase();
  return t.includes('neger') || t.includes('negger') || t.includes('nigger') || t.includes('niger') || t.includes('nigga') || t.includes('niga') || t.includes('bitch') || t.includes('hure') || t.includes('arsch') || t.includes('wichser') || t.includes('schwanz') || t.includes('penis') || t.includes('bastard') || t.includes('bastart') || t.includes('schwuchtel') || t.includes('faggot') || t.includes('simp');
}


function giveCoinCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == "captaincasimir" || context.username == "deltatecs") {
    // integrity guard
    if (args.length != 3 || isNaN(args[2])) {
      whisperBack(target, context, "invalid arguments, !givecc <username> <amount>");
      return;
    }

    let targetUser = args[1];
    let amount = parseInt(args[2], 10);
    updateUserBalance(targetUser, getUserBalance(targetUser) + amount); // add requested amount to user save
    whisperBack(target, context, "Added " + amount + CC_SYMBOL + " to " + targetUser + "'s balance");
  } // else: no athority, do nothing
}

function transferCoinCommand(args, target, context, self) {
  
  // integrity guard
  if (args.length != 3 || isNaN(args[2])) {
    whisperBack(target, context, "invalid arguments, !transfer <username> <amount>");
    return;
  }

  let targetUser = args[1];
  let amount = parseInt(args[2], 10);

  // check positive
  if (amount < 0) {
    whisperBack(target, context, "You are a smart one aren't you? But not as smart as the CaptainsEngineer :)");
    return;
  }

  // check sufficient funds
  if (getUserBalance(context.username) < amount) {
    whisperBack(target, context, "you dont have enough coin, chat more");
    return;
  }

  // check target exsiting
  if (isUserKnown(targetUser) == false) {
    whisperBack(target, context, target + " is not on deck");
    return;
  }

  updateUserBalance(targetUser, getUserBalance(targetUser) + amount); // add requested amount to user save
  updateUserBalance(targetUser, getUserBalance(context.username) - amount);

  client.say(target, context.username + " send " + targetUser + " " + amount + CC_SYMBOL);

  whisperBack(target, context, "Added " + amount + CC_SYMBOL + " to " + targetUser + "'s balance");

}


function purchaseListCommand(target, context, self) {

  let list = "sounds: ";

  for (let sound of CC_SOUNDS) {
    list += sound.name + " (" + sound.price + CC_SYMBOL + "), ";
  }

  list = list.substring(0, list.length - 2);

  list += "; anthems: ";

  for (let sound of CC_ANTHEMS) {
    list += sound.name + " (" + sound.price + CC_SYMBOL + "), ";
  }

  list += "anthem-reset (free)";

  whisperBack(target, context, list);
  whisperBack(target, context, "for Text-To-Speech (" + CC_COST_TTS + CC_SYMBOL + "): !tts <text>");
}

function purchaseItemCommand(args, target, context, self) {

  // assume args lenght atleast 2, checked in on cmd method

  let itemname = args[1];

  if (itemname == "anthem-reset") {
    whisperBack(target, context, context.username + " will no longer have a sound played as welcome.");
    updateUser(context.username, getUserBalance(context.username), anthem=undefined);
    return;
  }

  // iterrate sounds
  for (let sound of CC_SOUNDS) {
    if (sound.name == itemname) {

      // check funding
      let userbalance = getUserBalance(context.username);

      if (userbalance < sound.price) {
        whisperBack(target, context, "You have not enough Captain's Coin (" + userbalance + "/" + sound.price + CC_SYMBOL + "), earn coin by chatting.");
        return;
      } else {
        // purchase successfull
        client.say(target, context.username + " bought " + sound.name + ". -" + sound.price + CC_SYMBOL);
        updateUserBalance(context.username, userbalance - sound.price);
        playSound(sound.sound);
        return;
      }

    }
  }

  // iterrate anthems
  for (let sound of CC_ANTHEMS) {
    if (sound.name == itemname) {

      // check funding
      let userbalance = getUserBalance(context.username);

      if (userbalance < sound.price) {
        whisperBack(target, context, "You have not enough Captain's Coin (" + userbalance + "/" + sound.price + CC_SYMBOL + "), earn coin by chatting.");
        return;
      } else {
        // purchase successfull
        client.say(target, context.username + " will now be greeted with " + sound.name + ". -" + sound.price + CC_SYMBOL);
        updateUser(context.username, userbalance - sound.price, anthem=sound.sound);
        return;
      }
    }
  }

  // assume no item name hit
  whisperBack(target, context, "Item not found, check '!purchase list' for available items");
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


    updateUser(name, INITIAL_CC_BALANCE);
    client.say(target, WELCOME_MSG + name + "!");
  }
}


function handleAnthem(name, target) {

  if (users_seen.indexOf(name) == -1) {
    users_seen.push(name);
    let anthem = getUserAnthem(name);
    if (anthem != undefined) {
      playSound(anthem);
    }
  }

}

function setDeathCount(count) {

  deaths = count;
  rawdata = DEATH_COUNTER_PREFIX + " " + count
  fs.writeFileSync(FILENAME_DEATH_COUNTER, rawdata, {flag:'w'});
}

function setBrauseCount(count) {

  brause = count;
  rawdata = BRAUSE_COUNTER_PREFIX + " " + count
  fs.writeFileSync(FILENAME_BRAUSE_COUNTER, rawdata, {flag:'w'});
}

function playSound(sound_path, duration=3000) {

  if (silent_mode) { // no sounds during silent mode
    console.log("sound " + sound_path + " suppressed due to silent mode");
    return;
  }

  exec('vlc\\vlc.exe -Irc -Idummy --gain ' + GLOBAL_VOLUME_MULTIPLIER + ' ' + sound_path, (err, stdout, stderr) => {});
  console.log("playing sound " + sound_path);
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


function handleIncrementBalance(user) {
  updateUserBalance(user, getUserBalance(user) + CC_PER_CHAT);
}


function getUserBalance(user) {
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      return parseInt(acc.balance, 10);
    }
  }
  return 0; // user not found
}

function getUserAnthem(user) {
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      return acc.anthem;
    }
  }
  return undefined; // user not found
}

function updateUserBalance(user, balance) {
  updateUser(user, balance, getUserAnthem(user));
}

function updateUser(user, balance, anthem=undefined) {

  let balance_parsed = parseInt(balance, 10);
  
  updated = false;
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      acc.balance = balance_parsed;
      acc.anthem = anthem;
      updated = true;
      break;
    }
  }

  if (!updated) { // no update so far, assume new user
    chatters.accounts.push({name : user, balance : balance_parsed, anthem: anthem});
  }

  // write changes to file
  try {
    fs.writeFileSync('chatters.json', JSON.stringify(chatters), {flag:'w'});
  } catch (e) {
    console.log(e);
  }
}

function loadChatters() {
  let rawdata = fs.readFileSync('chatters.json');
  if (rawdata == "") { // if file absent, create it
    rawdata = "{accounts : [{name : \"obama69\", balance : 420}]}";
    fs.writeFileSync('chatters.json', rawdata, {flag:'w'});
  }
  let chatters = JSON.parse(rawdata);
  return chatters;
}

function loadChallenges() {
  let rawdata = fs.readFileSync('challenges.json');
  if (rawdata == "") { // if file absent, create it
    rawdata = "{\"global\": [], \"hunt\": []}";
    fs.writeFileSync('challenges.json', rawdata, {flag:'w'});
  }
  let challenges = JSON.parse(rawdata);
  return challenges;
}

function writeChallenges(challenges) {
    // write changes to file
    try {
      fs.writeFileSync('challenges.json', JSON.stringify(challenges), {flag:'w'});
    } catch (e) {
      console.log(e);
    }
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