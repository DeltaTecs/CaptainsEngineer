// V 2.5  // golden slots und mehr reward sounds

// LICENSE: tmijs is MIT. The following work is MIT aswell. 
// I do not take responsibility for functionality and reliability of this code.

const tmi = require('tmi.js');
const fs = require('fs');
const { exec } = require('child_process');
const say = require('say');
const {resolve} = require('path');
//const express = require('express');
//const app = express();

const CC_SYMBOL = "₵₵"; // Captain's Coin

const LVL_EMBLEMS = ["🦐", "🦐🦐", "🦐🦐🦐", "🐟", "🐟🐟", "🐟🐟🐟", "🐠", "🐠🐠", "🐠🐠🐠", "🐡", "🐡🐡", "🐡🐡🐡", "🦀", "🦀🦀", "🦀🦀🦀", "🦞", "🦞🦞", "🦞🦞🦞", "🐙", "🐙🐙", "🐙🐙🐙", "🦈", "🦈🦈", "🦈🦈🦈", "🐋", "🐋🐋", "🐋🐋🐋", "☠️", "☠️☠️", "☠️☠️☠️", "🖤", "🖤🖤", "🖤🖤🖤", "💠", "💠💠", "💠💠💠", "💎", "💎💎", "💎💎💎", "🃏", "🃏🃏", "🃏🃏🃏", "⭐", "⭐⭐", "⭐⭐⭐", "🌌🌌🌌"];

// full access, unlimited slots
const PRIV_STREAMER = "captaincasimir";
// administrative access
const PRIV_SUPPORT = "deltatecs";
// allowed to update counters
const PRIV_MOD_0 = "xx_berenike_xx";
const PRIV_MOD_1 = "stefan_2202";

const FILENAME_DEATH_COUNTER = "deathcounter.txt"
const FILENAME_BRAUSE_COUNTER = "brausecounter.txt"

const DURATION_CANTNA = 7.5;

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
const SOUND_BRAUSE_JACKPOT = "brause-jackpot.mp3";
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
const SOUND_BADUMTS = "badum-ts.mp3";
const SOUND_WASTED = "wasted.mp3";
const SOUND_CHALLENGE = "challenge.mp3";
const SOUND_FANFARE = "fanfare.mp3";
const SOUND_GOLDEN_JACKPOT = "golden-jackpot.mp3";
const SOUND_SOVIET_ANTHEM = "soviet.mp3";
const SOUND_CRAZY_FROG = "crazy-frog.mp3";
const SOUND_AXEL_F = "axel-f.mp3";
const SOUND_CHIPPIN_IN = "chippinin.mp3";
const SOUND_ELDEN_RING = "elden-ring.mp3";
const SOUND_SPOILER = "spoiler.mp3";
const SOUND_CANTINA_BAND = "cantina-band.mp3";
const SOUND_WILD_WEST = "wild-west.mp3";
const SOUND_007 = "007.mp3";
const SOUND_STRANGER_THINGS = "stranger-things.mp3";
const SOUND_X_FILES = "x-files.mp3";
const SOUND_NICE = "nice.mp3";
const SOUND_OOF = "oof.mp3";
const SOUND_OK_LETS_GO = "ok-lets-go.mp3";
const SOUND_AMONGUS = "amongus.mp3";
const SOUND_LAUGHING = "laughing.mp3";
const SOUND_SACKGESICHT = "sackgesicht.mp3";
const SOUND_PAUSE_ANTHEM = "kgpausa-anthem.mp3";
const SOUND_BENIS = "benis.mp3";
const SOUND_OUTSIDER = "outsider.mp3";
const SOUND_ORDER = "order.mp3";
const SOUND_SPITFIRE = "spitfire.mp3";

const REWARD_ID_STRECH = "8c31a6f0-b319-4865-9c4a-e9b57b960311";
const REWARD_ID_SOUND_SACKGESICHT = "a37d499f-1550-488b-896a-2b43e2ec9c2f";
const REWARD_ID_SOUND_THOMAS = "afcbdea0-0eee-4a35-8d18-a1e71e62703f";
const REWARD_ID_SOUND_FAIL = "3efc8ce0-3da1-40a7-83b5-a2725ab2b1f9";
const REWARD_ID_SOUND_INCEPTION = "fe96b4b0-11f2-449d-92e1-65cde878e110";
const REWARD_ID_MUSIC_REQUEST = "c9b4dfaa-a3fb-4f97-8195-14de8822a5b8"; 
const REWARD_ID_SCREAM = "e9456e46-8d24-4e89-bec3-dc0d5132ba6c";
const REWARD_ID_CHALLENGE_GLOBAL = "-bec3-dc0d5132ba6c";
const REWARD_ID_CHALLENGE_HUNT = "5d798aed-c0bd-48f2-aaae-2ab3b24dea81";
const REWARD_ID_AIRHORN = "42eb57c3-2b1f-4700-a35a-2713bd9ed519";
const REWARD_ID_BADUMTS = "a8f76e26-aa73-494c-a75b-49ac5d6b6783";
const REWARD_ID_TTS = "68bc9f6b-2601-4bf5-a30a-2d60eaf7daf4";

const CONFIGURABLE = [{name: "tts_cooldown", type: 'n', default: 60, unit: "seconds"},
  {name: "tts_limit", type: 'n', default: 60, unit: "symbols"},
  {name: "tutorial_cooldown", type: 'n', default: 300, unit: "seconds"},
  {name: "mastervolume", type: 'n', default: 80, unit: "%"},
  {name: "volume", type: 'o', default: "[]"},
  {name: "lurk_reward_amount", type: 'n', default: 30, unit: "coins"},
  {name: "lurk_reward_cooldown", type: 'n', default: 60 * 60 * 1, unit: "seconds"},
  {name: "cc_initial", type: 'n', default: 50, unit: "coins"},
  {name: "cc_cost_slots", type: 'n', default: 5, unit: "coins"},
  {name: "cc_cost_slotsx", type: 'n', default: 8, unit: "coins"},
  {name: "cc_slots_max_in", type: 'n', default: 10, unit: "coins"},
  {name: "cc_cost_tts", type: 'n', default: 80, unit: "coins"},
  {name: "cc_return_slots_basic", type: 'n', default: 250, unit: "coins"},
  {name: "cc_return_slots_peach", type: 'n', default: 1000, unit: "coins"},
  {name: "cc_return_slots_golden", type: 'n', default: 10000, unit: "coins"},
  {name: "cc_per_chat", type: 'f', default: 1, unit: "coins"},
  {name: "cc_sound_cost_multiplier", type: 'n', default: 10, unit: "factor"},
  {name: "cc_anthem_cost_multiplier", type: 'n', default: 100, unit: "factor"},
  {name: "cc_cost_cantina_band", type: 'n', default: 1000, unit: "coins"},
  {name: "msg_welcome", type: 's', default: encodeURIComponent("Ahoy, Matey! ⛵ Welcome aboard ")} , // followed by: username
  {name: "msg_lurk_0", type: 's', default: encodeURIComponent("Thank you for boarding the ship ")},
  {name: "msg_lurk_1", type: 's', default: encodeURIComponent("⛵ Lay back and enjoy your drink <3")},
  {name: "death_cnt_prefix", type: 's', default: encodeURIComponent("DEATHS: ")},
  {name: "brause_cnt_prefix", type: 's', default: encodeURIComponent("BRAUSE: ")},
  {name: "rand_golden", type: 'n', default: 71, unit: "(1 in x)"}, // one in 71 fruits is a golden captain -> prop of getting a tripple is 0.0003%
  {name: "rand_brause", type: 'n', default: 14, unit: "(1 in x)"}, // one in 14 fruits is a brause captain -> prop of getting a tripple is 0.03%
  {name: "golden_emote", type: 's', default: encodeURIComponent("captai1955Golden")},
  {name: "gold_status_duration", type: 'n', default: 1000 * 60 * 60 * 24 * 30, unit: "milliseconds"}, // gold status gives golden slots
  {name: "compact_jackpots", type: 'n', default: 1, unit: "0=off, 1=on"},
  {name: "slot_rolls_delay", type: 'n', default: 600, unit: "milliseconds"},
  {name: "max_lvl_reward", type: 'n', default: 100, unit: "levels"},
  {name: "xp_factor_subsciber", type: 'f', default: 1.5, unit: "x-times"},
  {name: "xp_base", type: 'n', default: 500, unit: "xp"},
  {name: "xp_added_per_lvl", type: 'n', default: 50, unit: "xp"},
  {name: "xp_per_char", type: 'f', default: 0.5, unit: "xp"},
  {name: "xp_per_captain_emote", type: 'f', default: 4, unit: "xp"},
  {name: "xp_per_slot_cmd", type: 'f', default: 5, unit: "xp"},
  {name: "xp_per_slot_win", type: 'f', default: 0, unit: "xp"},
  {name: "xp_per_reward", type: 'f', default: 50, unit: "xp"},
  {name: "xp_per_lurk", type: 'n', default: 200, unit: "xp"},
  {name: "xp_per_pirate_fight", type: 'n', default: 400, unit: "xp"},
  {name: "xp_on_pirate_win", type: 'n', default: 100, unit: "xp"},
  {name: "min_lvl_sound", type: 'n', default: 2, unit: "level"},
  {name: "min_lvl_slotsx", type: 'n', default: 20, unit: "level"},
  {name: "min_lvl_anthems", type: 'n', default: 50, unit: "level"},
  {name: "max_lvl_anthems", type: 'n', default: 90, unit: "level"},
  {name: "min_lvl_golden_chance_1", type: 'n', default: 91, unit: "level"},
  {name: "min_lvl_golden_chance_2", type: 'n', default: 100, unit: "level"},
  {name: "min_lvl_tts", type: 'n', default: 10, unit: "level"},
  {name: "max_lvl_tts_scaling", type: 'n', default: 50, unit: "level"},
  {name: "slot_rolls_per_lvl", type: 'n', default: 2, unit: "rolls"},
  {name: "max_lvl_slot_scaling", type: 'n', default: 89, unit: "lvl"},
  {name: "slot_rolls_added_last_lvls", type: 'n', default: 20, unit: "rolls"},
  {name: "lvl_per_emblem", type: 'n', default: 5, unit: "lvl"},
  {name: "cc_per_lvl", type: 'n', default: 200, unit: "coins"},
  {name: "tts_chars_per_lvl", type: 'n', default: 5, unit: "symbols"},
  {name: "min_delay_broadcast", type: 'n', default: 10, unit: "minutes"},
  {name: "max_delay_broadcast", type: 'n', default: 30, unit: "minutes"},
  {name: "pirate_loss_factor", type: 'f', default: 0.5, unit: "factor"},
  {name: "pirate_min_win", type: 'n', default: 100, unit: "coin"},
  {name: "pirate_max_win", type: 'n', default: 1000, unit: "factor"},
  {name: "msg_so", type: 's', default: encodeURIComponent("👨‍✈️☝️ Make sure to check out ")},
  {name: "link_discord", type: 's', default: encodeURIComponent("https://discord.gg/X5KGBJGTPu")},
  {name: "link_reddit", type: 's', default: encodeURIComponent("https://www.reddit.com/r/captaincasimir/")},
  {name: "brause_emote", type: 's', default: encodeURIComponent("🧃")},
  {name: "juwlz_referal", type: 's', default: encodeURIComponent("🖤 Check out JulwzDblack! 🖤 https://www.twitch.tv/juwlzdblack")},
  {name: "enable_slots_bill", type: 'n', default: 0, unit: "0=off, 1=on"},
  {name: "cantina_band_duration", type: 'n', default: 0, unit: "seconds"},
  {name: "link_timetable", type: 's', default: encodeURIComponent("")},
  {name: "enable_slot_roll_multiplicator", type: 'n', default: 1, unit: "0=off, 1=on"},
  {name: "compact_slots", type: 'n', default: 0, unit: "0=off, 1=on"}
]

/*Notes on the level system: Goal is an xp earn of 1000xp as an active user per stream (daily).
  Level 100 shall be achieved after 300 days of watching -> after 300 000 xp.
  expected default XP per stream:
  Expect 1 lurk -> 200xp
  Expect 3 rewards -> 150xp
  Expect 5 slot wins -> 100xp
  Expect 20 slot commands -> 100xp
  Expect 50 captain emotes -> 200xp
  Expect 1000 chars as chat messages in 30 mins, avg 2,5hrs streams (5000 chars) -> 250xp
 */

const CC_SOUNDS = [
  {name: "gulb", price: 1, sound: SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS},
  {name: "nani", price: 2, sound: SOUND_NANI},
  {name: "magic", price: 2, sound: SOUND_MAGIC},
  {name: "nice", price: 2, sound: SOUND_NICE},
  {name: "oof", price: 2, sound: SOUND_OOF},
  {name: "scream", price: 2, sound: SOUND_WILHELM_SCREAM},
  {name: "wasted", price: 3, sound: SOUND_WASTED},
  {name: "order", price: 3, sound: SOUND_ORDER},
  {name: "airhorn", price: 4, sound: SOUND_AIRHORN},
  {name: "amongus", price: 4, sound: SOUND_AMONGUS},
  {name: "fail", price: 4, sound: SOUND_FAIL},
  {name: "cantina", price: 4, sound: SOUND_CANTINA_BAND},
  {name: "laugh", price: 4, sound: SOUND_LAUGHING},
  {name: "ok-lets-go", price: 4, sound: SOUND_OK_LETS_GO},
  {name: "inception", price: 6, sound: SOUND_INCEPTION},
  {name: "to-be-continued", price: 6, sound: SOUND_JOJO_TO_BE_CONTINUED},
  {name: "x-files", price: 6, sound: SOUND_X_FILES},
  {name: "earrape", price: 100, sound: SOUND_THOMAS}
]

const CC_ANTHEMS = [
  {name: "magic", price: 2, sound: SOUND_MAGIC},
  {name: "scream", price: 2, sound: SOUND_WILHELM_SCREAM},
  {name: "jojo-tbc", price: 6, sound: SOUND_JOJO_TO_BE_CONTINUED},
  {name: "benis", price: 6, sound: SOUND_BENIS},
  {name: "hes-a-pirate", price: 8, sound: SOUND_HES_A_PIRATE},
  {name: "brawl", price: 8, sound: SOUND_BRAWL},
  {name: "soviet", price: 8, sound: SOUND_SOVIET_ANTHEM},
  {name: "crazy-frog", price: 8, sound: SOUND_CRAZY_FROG},
  {name: "axel-f", price: 8, sound: SOUND_AXEL_F},
  {name: "chippin-in", price: 8, sound: SOUND_CHIPPIN_IN},
  {name: "elden-ring", price: 8, sound: SOUND_ELDEN_RING},
  {name: "cyberpunk", price: 8, sound: SOUND_SPOILER},
  {name: "cantina", price: 8, sound: SOUND_CANTINA_BAND},
  {name: "jojo-ost", price: 8, sound: SOUND_JOJO_GOLDEN_WING},
  {name: "jojo-stroheim", price: 8, sound: SOUND_JOJO_STROHEIM},
  {name: "wild-west", price: 8, sound: SOUND_WILD_WEST},
  {name: "007", price: 8, sound: SOUND_007},
  {name: "spitfire", price: 8, sound: SOUND_SPITFIRE},
  {name: "outsider", price: 8, sound: SOUND_OUTSIDER},
  {name: "strangerthings", price: 8, sound: SOUND_STRANGER_THINGS},
  {name: "skrillex", price: 10, sound: SOUND_SKRILLEX}
]

var config;
initConfig();

const golden_emote = decodeURIComponent(config.golden_emote);
const brause_emote = decodeURIComponent(config.brause_emote);

const BROADCASTS = [
  {randspace: 200, event: undefined, message: "💡 Gambling may cause addiction 🎰 no participation under 18, chance to win 1:38"},
  {randspace: 50, event: undefined, message: "💡 You earn " + config.cc_per_chat + CC_SYMBOL + " by chatting"},
  {randspace: 80, event: undefined, message: "💡 Subscribers earn +" + (100 * (config.xp_factor_subsciber - 1)) + "% more xp"},
  {randspace: 80, event: undefined, message: "💡 Subscribers can use !anthem from level 1"},
  {randspace: 80, event: undefined, message: "💡 You earn XP by chatting, using captain emotes, channel rewards and slots <3"},
  {randspace: 50, event: undefined, message: "💡 You increase your chance of rolling a golden jackpot 50% when reaching lvl " + config.min_lvl_golden_chance_2 + " " + golden_emote},
  {randspace: 50, event: undefined, message: "💡 You can play a Text-To-Speech message with !tts (min lvl " + config.min_lvl_tts + ")"},
  {randspace: 50, event: undefined, message: "💡 By leveling you can increase your slot and TTS limit"},
  {randspace: 50, event: undefined, message: "💡 The chance to win a single roll of slots is ~2.8% 🍑🍒🍍🍇🍉🍐"},
  {randspace: 50, event: undefined, message: "💡 Special rewards end with level 100, but level emblems don't ;)"},
  {randspace: 50, event: undefined, message: "💡 An anthem is a theme that welcomes you personaly every stream. Unlock anthems by subscribing or by reaching level " + config.min_lvl_anthems + " (!anthem)"},
  {randspace: 50, event: undefined, message: "💡 By leveling to 100, you can reach a slots limit of 2000" + CC_SYMBOL + " 🎰"},
  {randspace: 50, event: undefined, message: "💡 Rolling a golden jackpot unlocks a special anthem and grants you gold status for a month 👑"},
  {randspace: 50, event: undefined, message: "💡 Feel free to pm deltatecs bot features you would like to see ;)"},
  {randspace: 50, event: undefined, message: "💡 Transfer Captain's Coin 💰 with !transfer"},
  {randspace: 50, event: undefined, message: "💡 Check your place in the level ranking with !ranking"},
  {randspace: 50, event: undefined, message: "💡 Besides using a reward you can play sounds with !sound"},
  {randspace: 50, event: undefined, message: "💡 We have a slot machine 🎰 on board! Try !slots"},
  {randspace: 50, event: undefined, message: "💡 This bot and a detailed manual are available at https://github.com/DeltaTecs/CaptainsEngineer"},
  {randspace: 100, event: triggerEventHappyHr, message: "/announce 🚨 Happy Hour! 🚨  !slots are 20% off! (for " + config.min_delay_broadcast + " mins)"},
  {randspace: 50, event: triggerEventMegaHappyHr, message: "/announce 🚨 Mega Happy Hour! 🚨  !slots are 40% off! (for " + config.min_delay_broadcast + " mins)"},
  {randspace: 100, event: triggerEventXpBoost, message: "/announce 🚨 XP Boost! 🚨  All XP earned is multiplied x5! (for " + config.min_delay_broadcast + " mins)"},
  {randspace: 25, event: triggerEventBlessing, message: "/announce 🚨 " + golden_emote + " Blessed! " + golden_emote + " 🚨  1:200 golden jackpot chance " + golden_emote + " (for " + config.min_delay_broadcast + " mins)"},
  {randspace: 50, event: triggerEventSuperSale, message: "/announce 🚨 Super Sale! 🚨  Sounds, anthems and tts are 90% off! (for " + config.min_delay_broadcast + " mins)"},
  {randspace: 25, event: triggerEventMadSlots, message: "/announce 🚨🎰 Mad Slots! 🎰🚨  Slot limit is 5k " + CC_SYMBOL + "! (for " + config.min_delay_broadcast + " mins)"},
  {randspace: 70, event: triggerEventPirateAttack, message: "/announce 🚨🏴‍☠️⚔️ PIRATES! ⚔️🏴‍☠️🚨  Pirates are trying to hijack our boat! Use !fight ⚔️ You stand to loose/win " + CC_SYMBOL + "! Participation is rewarded with XP! 🏴‍☠️☠️ (" + config.min_delay_broadcast + " mins event)"}
]


const slot_symbols = ['🍑', '🍒', '🍍', '🍇', '🍉', '🍐']; // propability of getting a triple is 2.8%
const slut_symbols = ['💦', '🍆', '😩', '👅', '💋', '🔞']; // propability of getting a triple is 2.8%
const slot_symbols_gold = ['💎', '👑', '⛲', '🦞', '🏰', '💂']; // propability of getting a triple is 2.8%
// average return per roll is (68/71)*250*7/(8^3) + (68/71)*1000*(1/8^3) = 5,144  ->  win +29 per 1000

const SYMBOL_TM = "™";

const GLOBAL_COMMAND_COOLDOWN = 3; // seconds
const ENABLE_COMMAND_COOLDOWN = true;
const ENABLE_COMMAND_COOLDOWN_MESSAGE = false; // disabled because whisper dont work

// Define configuration options
var opts;

loadCredentials();

console.log("target channel: " + opts.channels[0] + ", acc: " + opts.identity.username);

/**
 * time millis since unix, updated every 10ms
 */
var time;

// initialize cooldown map
var command_cooldowns = [];

// initialize lurk time map
var lurks = [];

var sub_status = [];
var vips = [];
var levels = [];
var pirate_participants = [];


var last_tts = getTime() - config.tts_cooldown;

// last tutorial display
var last_tutorial_print = getTime() - config.tutorial_coldown;

// event timestamps
var event_happy_hr = 0; // 20% of slots
var event_mega_happy_hr = 0; // 40% of slots
var event_pirate_attack = 0; // !fight
var event_xp_boost = 0; // double xp
var event_blessing = 0; // +1000% golden chance
var event_super_sale = 0; // 90% of sounds, tts and anthems
var event_mad_slots = 0; // slot limit 5000

// no sounds mode
var silent_mode = false;

// when the cantina band was bought before
var cantina_hired = 0;

// death counter this session
var deaths = 0;

// brause counter this session
var brause = 0;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

var chatters = loadChatters();

// set captains xp to max so he can use all features
chatters.accounts.forEach(a => {if (a.name == PRIV_STREAMER) a.xp = 1000000;});

backupChatters(); // backup just in case

var users_seen = [];

var chat_target;

initUserLevels();


// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self || context.username.toLowerCase() == 'captainsengineer') { return; } // Ignore messages from the bot
  chat_target = target;

  sub_status[context.username.toLowerCase()] = context.subscriber;
  if (context.username == PRIV_STREAMER) {
    levels[PRIV_STREAMER] = config.max_lvl_reward;
  }

  if (context["custom-reward-id"] != undefined) {
    onReward(msg, target, context, self);
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
  handleChatRewards(context.username, commandName);
  
  if (commandName[0] != '!') { // no command
    return;
  }

  onCommand(target, context, commandName, self);
}


function onReward(msg, target, context, self) {

  console.log("id: " + context["custom-reward-id"]);

  incrementUserBalanceAndXP(context.username, balance_add=0, xp_add=config.xp_per_reward, cause="reward");
  
  if (context["custom-reward-id"] === REWARD_ID_SOUND_SACKGESICHT) {
  
    playSound(SOUND_SACKGESICHT);
  
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

  } else if (context["custom-reward-id"] === REWARD_ID_AIRHORN) {

    playSound(SOUND_AIRHORN, 10500);

  } else if (context["custom-reward-id"] === REWARD_ID_BADUMTS) {

    playSound(SOUND_BADUMTS, 10500);

  } else if (context["custom-reward-id"] === REWARD_ID_TTS) {

    if (silent_mode) {
      return;
    }
  
    if (checkProvanity(msg)) {
      whisperBack(target, context, "TTS request dropped because of provanity. Don't be a dick when using tts pls.");
      return;
    }

    externalTts(msg);

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
  if (command_cooldowns[context.username] != undefined && context.username != PRIV_SUPPORT && context.username != PRIV_STREAMER && ENABLE_COMMAND_COOLDOWN) {
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
  command_cooldowns[context.username] = getTime();

  let raw = commandName + "";
  args = commandName.replaceAll('@', '').split(" ");
  commandName = args[0].toLowerCase();

  // If the command is known, let's execute it
  if (commandName === '!dice') {

    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);

  } else if (commandName === '!watchtime') {

    client.say(target, `42069 seconds`);
    console.log(`* watchtime`);

  } else if (commandName == "!slots" || commandName == "!inserts" || commandName == "!gamble" || commandName == "!slot" || commandName == "!lot" || commandName == "!slt") {

    console.log(`* slots`);
    slotsCommand(args, target, context, self, sluts=false);

  } else if (commandName == "!slotsx") {

    console.log(`* slots`);
    slotsCommand(args, target, context, self, sluts=true);

  } else if (commandName === '!discord' || commandName === '!dc') {

    console.log(`* discord`);
    client.say(target, decodeURIComponent(config.link_discord));

  } else if (commandName === '!timetable' || commandName === '!tt') {

    console.log(`* timetable`);
    client.say(target, decodeURIComponent(config.link_timetable));

  }  else if (commandName === '!reddit') {

    console.log(`* reddit`);
    client.say(target, decodeURIComponent(config.link_reddit));

  } else if (commandName === '!tm') {

    tmCommand(target, context, self);
  
  } else if (commandName === '!bless' || commandName === '!blessing' || commandName === '!bles') {

    blessingCommand(target, context, self);
  
  } else if (commandName === '!gulp') {

    console.log(`* gulp`);
    playSound(SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS);

  } else if (commandName === '!lurk' || commandName === '!afk') {

    console.log(`* lurk`);
    lurkCommand(target, context, self);

  } else if (commandName === '!silent' || commandName === '!silence' || commandName === '!mute' ) {

    console.log(`* toggle mute`);
    muteCommand(target, context, self);

  }  else if (commandName === '!tutorial' || commandName === '!help') {

    console.log(`* tutorial cmd`);
    tutorialCommand(target, context, self);

  }  else if (commandName === '!balance' || commandName == "!coin" || commandName == "!wallet" || commandName == "!money") {

    console.log(`* balance cmd`);
    balanceCommand(target, context, self);

  } else if (commandName == "!burn") {

    console.log(`* burn coin cmd`);
    burnCoinCommand(args, target, context, self);

  } else if (commandName == "!givecc") {

    console.log(`* give coin cmd`);
    giveCoinCommand(args, target, context, self);

  } else if (commandName == "!givexp") {

    console.log(`* give xp cmd`);
    giveXpCommand(args, target, context, self);

  } else if (commandName == "!volume") {

    console.log(`* volume cmd`);
    volumeCommand(args, target, context, self);

  } else if (commandName == "!volumes" || commandName == "!volums") {

    console.log(`* volumes cmd`);
    volumesCommand(args, target, context, self);

  } else if (commandName == "!config" || commandName == "!set") {

    console.log(`* config cmd`);
    configCommand(args, target, context, self);

  } else if (commandName == "!rename") {

    console.log(`* rename cmd`);
    renameCommand(args, target, context, self);

  }  else if (commandName == "!transfer" || commandName == "!give") {

    console.log(`* transfer coin cmd`);
    transferCoinCommand(args, target, context, self);

  } else if (commandName == "!death") {

    console.log(`* death cmd`);
    deathCommand(args, target, context, self);

  } else if (commandName == "!brause") {

    console.log(`* brause cmd`);
    brauseCommand(args, target, context, self);

  } else if (commandName == "!fight" || commandName == "!pirates") {

    console.log(`* fight cmd`);
    fightCommand(target, context);

  } else if (commandName == "!ttslegacy") {

    console.log(`* tts: ` + raw.substring(10, raw.length));
    ttsLegacyCommand(raw.substring(10, raw.length), target, context, self);

  } else if (commandName == "!tts") {

    console.log(`* tts: ` + raw.substring(4, raw.length));
    ttsCommand(raw.substring(4, raw.length), target, context, self);

  }  else if (commandName == "!stop" || commandName == "!stoptts") {

    console.log("* stop tts");
    stopTTSCommand(context);

  } else if (commandName == "!purchase" || commandName == "!sound" || commandName == "!play") {

    console.log(`* sound cmd`);

    soundCommand(args, target, context, self);

  } else if (commandName == "!so" || commandName == "!see" || commandName == "!seealso"  || commandName == "!sa") {

    console.log(`* so cmd`);

    soCommand(args, target, context, self);

  } else if (commandName == "!juwlz" || commandName == "!jewls"  || commandName == "!jewlz") {

    console.log(`* juwlz cmd`);

    juwlzCommand(args, target, context, self);

  } else if (commandName == "!spieldenselbensongnochmal" || commandName == "!selbensongnochmal"  || commandName == "!again") {

    console.log(`* selber song nochmal cmd`);

    sameSongCommand(args, target, context, self);

  } else if (commandName == "!hirecantina" || commandName == "!hireband"  || commandName == "!cantina") {

    console.log(`* hire band cmd`);

    cantinaCommand(args, target, context, self);

  } else if (commandName == "!anthem") {

    console.log(`* anthem cmd`);

    anthemCommand(args, target, context, self);

  } else if (commandName == "!anthems") {

    console.log(`* anthems cmd`);

    listAnthems(target, context, self);

  } else if (commandName == "!forceplay") {

    console.log(`* force play`);
    forcePlayCommand(args, target, context, self);

  } else if (commandName == "!challenge") {

    console.log(`* challenge `);
    challengeCommand(args, commandName, target, context, self);

  } else if (commandName === '!xp' || commandName === '!level' || commandName === '!lvl') {

    console.log(`* level cmd`);
    levelCommand(target, context, self);

  } else if (commandName === '!top' || commandName === '!rank' || commandName === '!ranking' || commandName === '!top5'  || commandName === '!levels') {

    console.log(`* ranking cmd`);
    rankingCommand(target, context, self);

  } else {
    console.log(`* Unknown command ${commandName}`);
    whisperBack(target, context, `unknown command ${commandName}`);
  }
}

function tutorialCommand(target, context, self) {

  // check for cooldown so it can't be spammed
  if (getTime() - last_tutorial_print < config.tutorial_coldown) {
    client.say(target, " 🧭Tutorial on cooldown, please wait " + (config.tutorial_coldown - (getTime() - last_tutorial_print)) + " seconds");
    return;
  } else
    last_tutorial_print = getTime();

  let tutorial = ": -- Captain's Manual 🧭🌍 -- :";
  client.say(target, tutorial);
  tutorial = "🤖 Basics: !discord, !reddit, !tm";
  client.say(target, tutorial);
  tutorial = "💰 Captain's Coin (" + CC_SYMBOL + "):";
  client.say(target, tutorial);
  tutorial = "- earn " + config.cc_per_chat + " " + CC_SYMBOL + " per chat message";
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
  tutorial = "- to list sounds to play: !sound";
  client.say(target, tutorial);
  tutorial = "- to play a sound: !sound <name>";
  client.say(target, tutorial);
  tutorial = "- to buy and activate a tts message: !tts <message>";
  client.say(target, tutorial);
  tutorial = ": ----------------- :"
  client.say(target, tutorial);
}

function deathCommand(args, target, context, self) {

  if (context.username != PRIV_STREAMER && context.username != PRIV_SUPPORT && context.username != PRIV_MOD_0 && context.username != PRIV_MOD_1) {
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

  if (context.username != PRIV_STREAMER && context.username != PRIV_SUPPORT && context.username != PRIV_MOD_0 && context.username != PRIV_MOD_1) {
    return;
  }

  let toSet = brause + 1;

  if (args.length > 1) {
    if (isNaN(args[1])) {
      whisperBack(target, context, "invalid arguments, !brause [count to add]");
      return;
    }

    toSet = parseInt(args[1], 10);
  }

  setBrauseCount(toSet);
}

function lurkCommand(target, context, self) {

  let reward_string = "";

  if (lurks[context.username] == undefined || getTime() - lurks[context.username] > config.lurk_reward_cooldown) {
    // eligble for lurk reward
    console.log(context.username + " eligable for lurk reward");
    incrementUserBalanceAndXP(context.username, balance_add=config.lurk_reward_amount, xp_add=config.xp_per_lurk, cause="lurk");
    reward_string = " (+" + config.lurk_reward_amount + CC_SYMBOL + ")"
    lurks[context.username] = getTime();
  } else {
    console.log(context.username + " not eligable for lurk reward");
  }

  client.say(target, decodeURIComponent(config.msg_lurk_0) + context.username + decodeURIComponent(config.msg_lurk_1) + reward_string);

}

function muteCommand(target, context, self) {

  if (context.username != PRIV_STREAMER && context.username != PRIV_SUPPORT) {
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
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {
    // integrity guard
    if (args.length != 2 ) {
      whisperBack(target, context, "invalid arguments, !forceplay <titel>, see list: !sound, !anthem");
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

    whisperBack(target, context, "sound not found: " + sound_name + ", see '!sound' or '!anthem' for a list");    
  } // else: no athority, do nothing
}


function tmCommand(target, context, self) {
  whisperBack(target, context, SYMBOL_TM);
}


function ttsLegacyCommand(text, target, context, self) {

  if (silent_mode) {
    return;
  }

  if (levels[context.username.toLowerCase()] < config.min_lvl_tts && context.username != PRIV_STREAMER) {
    whisperBack(target, context, "You are level " + levels[context.username.toLowerCase()] + ", unlock !tts at level " + config.min_lvl_tts);
    return;
  }

  const time_to_wait = config.tts_cooldown - (getTime() - last_tts);

  if (time_to_wait > 0) {
    whisperBack(target, context, "TTS was used recently, please wait " + time_to_wait + "s ");
    return;
  }

  const tts_limit = config.tts_limit + config.tts_chars_per_lvl * Math.min(config.max_lvl_tts_scaling - config.min_lvl_tts, levels[context.username.toLowerCase()] - config.min_lvl_tts);

  if (text.length > tts_limit) {
    whisperBack(target, context, "TTS character limit exceeded. Your maximum is " + tts_limit + ", your message has " + text.length);
    return;
  }

  if (checkProvanity(text)) {
    whisperBack(target, context, "TTS request dropped because of provanity. Don't be a dick when using tts pls.");
    return;
  }

  const cost = Math.floor(config.cc_cost_tts * (isEventActive(event_super_sale) ? 0.1 : 1));

  if (getUserBalance(context.username) < cost) {
    whisperBack(target, context, "You are broke. Text-To-Speech costs " + cost + CC_SYMBOL + "! Chat more.");
    return;
  }

  updateUserBalance(context.username, getUserBalance(context.username) - cost);

  say.speak(text);
  last_tts = getTime();
}

function ttsCommand(text, target, context, self) {

  if (silent_mode) {
    return;
  }

  if (levels[context.username.toLowerCase()] < config.min_lvl_tts && context.username != PRIV_STREAMER) {
    whisperBack(target, context, "You are level " + levels[context.username.toLowerCase()] + ", unlock !tts at level " + config.min_lvl_tts);
    return;
  }

  const time_to_wait = config.tts_cooldown - (getTime() - last_tts);

  if (time_to_wait > 0) {
    whisperBack(target, context, "TTS was used recently, please wait " + time_to_wait + "s ");
    return;
  }

  const tts_limit = config.tts_limit + config.tts_chars_per_lvl * Math.min(config.max_lvl_tts_scaling - config.min_lvl_tts, levels[context.username.toLowerCase()] - config.min_lvl_tts);

  if (text.length > tts_limit) {
    whisperBack(target, context, "TTS character limit exceeded. Your maximum is " + tts_limit + ", your message has " + text.length);
    return;
  }

  if (checkProvanity(text)) {
    whisperBack(target, context, "TTS request dropped because of provanity. Don't be a dick when using tts pls.");
    return;
  }

  const cost = Math.floor(config.cc_cost_tts * (isEventActive(event_super_sale) ? 0.1 : 1));

  if (getUserBalance(context.username) < cost) {
    whisperBack(target, context, "You are broke. Text-To-Speech costs " + cost + CC_SYMBOL + "! Chat more.");
    return;
  }

  updateUserBalance(context.username, getUserBalance(context.username) - cost);

  externalTts(text);

  last_tts = getTime();
}

function stopTTSCommand(context) {
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {
    say.stop();
  }
}

function fightCommand(target, context) {

  if (!isEventActive(event_pirate_attack)) {
    whisperBack(target, context, "The pirate event 🏴‍☠️ has ended :(");
    return;
  }

  if (pirate_participants[context.username] != undefined) {
    whisperBack(target, context, "You already fought in this battle 🏴‍☠️");
    return;
  }

  const balance_before = getUserBalance(context.username);
  const battle_win = getRandomInt(2) == 0;
  const lost = getRandomInt(balance_before * config.pirate_loss_factor);
  const won = getRandomInt(config.pirate_max_win - config.pirate_min_win) + config.pirate_min_win;

  if (battle_win) {
    client.say(target, "⚔️ " + context.username + " won the pirate battle! 💰 loot: +" + won + CC_SYMBOL + ", +" + config.xp_per_pirate_fight + "xp");
    incrementUserBalanceAndXP(context.username, won, config.xp_per_pirate_fight, cause="piratebattle");
  } else {
    client.say(target, "⚔️ " + context.username + " lost the pirate battle  (+" + config.xp_per_pirate_fight + "xp) 💀 pirates stole " + lost + CC_SYMBOL);
    incrementUserBalanceAndXP(context.username, -1 * lost, config.xp_per_pirate_fight, cause="piratebattle");
  }

  pirate_participants[context.username] = battle_win;
}

function slotsCommand(args, target, context, self, sluts=false) {

  if (sluts && levels[context.username.toLowerCase()] < config.min_lvl_slotsx) {
    whisperBack(target, context, "You are level " + levels[context.username.toLowerCase()] + ", unlock !slotsx at level " + config.min_lvl_slotsx);
    return;
  }

  if (args.length > 1 && isNaN(args[1]) && args[1] != "all") {
    whisperBack(target, context, "invalid arguments, !slots [all|<amount>]");
    return;
  }

  let amount = 0;
  const balance = getUserBalance(context.username);
  const base_roll_cost = sluts ? config.cc_cost_slotsx : config.cc_cost_slots;
  const roll_cost = isEventActive(event_happy_hr) ? Math.floor(base_roll_cost * 0.8) : (isEventActive(event_mega_happy_hr) ? Math.floor(base_roll_cost * 0.6) : base_roll_cost);
  const compact_jackpots = config.compact_jackpots != 0;
  const slot_rolls_delay = config.slot_rolls_delay;
  const rolls_mid_scaling = (Math.min(config.max_lvl_slot_scaling, levels[context.username.toLowerCase()]) - 1) * config.slot_rolls_per_lvl;
  const rolls_end_scaling = config.slot_rolls_added_last_lvls * (Math.max(0, Math.min(config.max_lvl_reward, levels[context.username.toLowerCase()] - config.max_lvl_slot_scaling)));
  let user_slot_max = isEventActive(event_mad_slots) ? 5000 : config.cc_slots_max_in + (base_roll_cost * (rolls_mid_scaling + rolls_end_scaling));
  if (context.username == PRIV_STREAMER) {
    user_slot_max = 999999999;
  }

  if (args.length == 1) {
    amount = roll_cost;
  } else if (args[1] == "all") {
    amount = Math.min(user_slot_max, balance);
    amount -= amount % roll_cost;
  } else {
    amount = parseInt(args[1], 10);
    amount -= amount % roll_cost;
  }


  if (amount < roll_cost) {
    whisperBack(target, context, "To few coin inserted. Turning the slots once costs " + roll_cost + CC_SYMBOL);
    return;
  }

  if (amount > balance) {
    whisperBack(target, context, "You dont have coin. (" + balance + "/" + amount + ") " + CC_SYMBOL + ", chat more");
    return;
  }

  if (amount > user_slot_max && context.username != PRIV_STREAMER) {
    whisperBack(target, context, "Your slot limit is " + user_slot_max + CC_SYMBOL);
    return;
  }

  const rolls = amount / roll_cost; // acts as win multiplicator with a single roll in enable_slot_roll_multiplicator enables and as rolls otherwise
  let wins = [];
  let slots_out_chosen = [];
  let usr_gold_status = isGoldStatusActive(context.username);

  if (config.enable_slot_roll_multiplicator == 1) {
  // run a single roll. Winnings will be multiplicated
  let slots_out = getSlotOutput(context.username, sluts=sluts, goldStatus=usr_gold_status);
  if (slots_out.rank > 0)
    wins.push(slots_out);
  slots_out_chosen = slots_out.symbols; // set to last output
  } else {
    // run multiple rolls without multiplicator for winnings
    for (let i = 0; i < rolls; i++) { // roll
      let slots_out = getSlotOutput(context.username, sluts=sluts, goldStatus=usr_gold_status);
      if (slots_out.rank > 0)
        wins.push(slots_out);
      slots_out_chosen = slots_out.symbols; // set to last output
    }
  }

  // sort
  let win_max = wins.length > 0 ? wins[0] : undefined;
  let total_win = 0;

  for (let win of wins) {

    if (win.rank >= win_max.rank) {
      win_max = win;
      slots_out_chosen = win.symbols;
    }
    total_win += win.return;
  }

  if (config.enable_slot_roll_multiplicator == 1)
    // multiplicate winnings
    total_win *= rolls;
  
  let special_count = 0;
  if (total_win == 0) {
    // try to pick slots out with golden/brause emote if possible
    for (let win of wins) {
      let count = (win.symbols[0] == " " + golden_emote + " " ? 1 : 0) + (win.symbols[1] == " " + golden_emote + " " ? 1 : 0) + (win.symbols[2] == " " + golden_emote + " " ? 1 : 0);
      count += (win.symbols[0] == " " + brause_emote + " " ? 1 : 0) + (win.symbols[1] == " " + brause_emote + " " ? 1 : 0) + (win.symbols[2] == " " + brause_emote + " " ? 1 : 0);
      if (count > special_count) {
        special_count = count;
        slots_out_chosen = win.symbols;
      }
    }
  }

  incrementUserBalanceAndXP(context.username, total_win - amount, wins.length * config.xp_per_slot_win, cause="slots");

  if (total_win > 0)
    console.log(context.username + " won slots: cc_before=" + balance + ", amount_in=" + amount + ", cc_after=" + getUserBalance(context.username) + ", win=" + total_win);

  // default animation
  const input_display = config.enable_slot_roll_multiplicator ? ("x" + rolls ) : ("-" + amount + "" + CC_SYMBOL);
  let slots_out_fancy_0 = "[" + slots_out_chosen[0] + "|🔳|🔳]_📍   " + input_display;
  let slots_out_fancy_1 = "[" + slots_out_chosen[0] + "|" + slots_out_chosen[1] + "|🔳]_📍";
  let slots_out_fancy_2 = "[" + slots_out_chosen[0] + "|" + slots_out_chosen[1] + "|" + slots_out_chosen[2] + "]_📍";

  if (config.compact_slots == 1) {
    scheduleDelayedMessage(target, 0, slots_out_fancy_2 + " " + input_display);
  } else {
    scheduleDelayedMessage(target, 0, slots_out_fancy_0);
    scheduleDelayedMessage(target, slot_rolls_delay, slots_out_fancy_1);
    scheduleDelayedMessage(target, 2 * slot_rolls_delay, slots_out_fancy_2);
  }

  let delay = 2 * slot_rolls_delay;

  if (compact_jackpots && total_win > 0) {

    // display only highest roll
    setTimeout(function() {
      client.say(target, win_max.message + total_win + CC_SYMBOL);
      playSound(win_max.sound);
    }, delay);
    if (sluts) {
      setTimeout(function() {
        playSound(SOUND_OH_YEAH);
      }, delay + 1900);
    }

    if (win_max.rank == 4 && context.username != PRIV_STREAMER) { // golden win present
      setTimeout(function() {
        goldenEvent(target, context.username);
      }, delay);
    }

  } else {

    // all wins after each other
    for (let win of wins) {
      if (win.rank != 1)
        continue;
      setTimeout(function() {
        client.say(target, win.message + config.cc_return_slots_basic + CC_SYMBOL);
        playSound(win.sound);
      }, delay);
      if (sluts) {
        setTimeout(function() {
          playSound(SOUND_OH_YEAH);
        }, delay + 1900);
      }
      delay += 1000;
    }

    for (let win of wins) {
      if (win.rank != 2)
        continue;
      setTimeout(function() {
        client.say(target, win.message + config.cc_return_slots_peach + CC_SYMBOL);
        playSound(win.sound);
      }, delay);
      if (sluts) {
        setTimeout(function() {
          playSound(SOUND_OH_YEAH);
        }, delay + 2200);
      }
      delay += 2000;
    }
  
    for (let win of wins) {
      if (win.rank != 3)
        continue;
      setTimeout(function() {
        client.say(target, win.message + config.cc_return_slots_golden + CC_SYMBOL);
        playSound(win.sound);
      }, delay);
      delay += 2000;
    }

    if (total_win > 0 && win_max.rank == 3  && context.username != PRIV_STREAMER) { // golden win present
      setTimeout(function() {
        goldenEvent(target, context.username);
      }, delay - 2000);
    }

  }

  if (total_win > config.cc_return_slots_basic && config.enable_slots_bill > 0) {
    // print bill only if atleast two basic wins or a super win
    setTimeout(function() {
      client.say(target, balance + CC_SYMBOL + " >> " + (balance - amount + total_win) + CC_SYMBOL + "", user=context.username);
    }, delay + 10);
  }
}

function getSlotOutput(username, sluts=false, goldstatus=false) {

  symbols = [];

  let rand_golden = config.rand_golden;
  let rand_brause = config.rand_brause;

  if (isEventActive(event_blessing))
    rand_golden = 7;
  else if (levels[username.toLowerCase()] >= config.min_lvl_golden_chance_2)
    rand_golden -= 2;
  else if (levels[username.toLowerCase()] >= config.min_lvl_golden_chance_1)
    rand_golden -= 1;

  for (let i = 0; i < 3; i++) {
    if (getRandomInt(rand_golden) == 0) { // force golden
      symbols.push(" " + golden_emote + " ");
    } else if (getRandomInt(rand_brause) == 0) { // force brause
      symbols.push(" " + brause_emote + " ");
    } else if (sluts) { // !sluts / !slotsx
      symbols.push(slut_symbols[getRandomInt(slut_symbols.length)]);
    } else if (goldstatus && username != PRIV_STREAMER) { // !slots but after golden win
      symbols.push(slot_symbols_gold[getRandomInt(slot_symbols_gold.length)]);
    } else { // !slots default
      symbols.push(slot_symbols[getRandomInt(slot_symbols.length)]);
    }
  }

  let win_rank = 0; // 0 nothing, 1 default, 2 super, 3 golden
  let win_return = 0;
  let win_message = "";
  let win_sound = "";

  if (symbols[0] == symbols[1] && symbols[1] == symbols[2]) { // some win present

    if (symbols[0] == " " + golden_emote + " ") { // golden win
      win_rank = 4;
      win_return = config.cc_return_slots_golden;
      win_message = username + " FOUND THE SECRET GOLDEN CAPTAIN'S TREASURE!!! " + golden_emote + " 💰💰💰 " + golden_emote + " 💰💰💰 " + "  +";
      win_sound = SOUND_GOLDEN_JACKPOT;
    } else if (symbols[0] == " " + brause_emote + " ") { // brause win
      win_rank = 3;
      win_return = config.cc_return_slots_peach;
      win_message = brause_emote + " " + username + " rolled a Brause jackpot!!! CaptainCasimir has to snack 1 Brause!!! " + brause_emote + " " + brause_emote + " +";
      win_sound = SOUND_BRAUSE_JACKPOT;
    } else if (symbols[0] == '🍑' || symbols[0] == '💦' || symbols[0] == '💎') { // super win
      win_rank = 2;
      win_return = config.cc_return_slots_peach;
      win_message = golden_emote + " 💰💰💰 SUPER WIN 💰💰💰 " + golden_emote + " " + username + " WON +";
      win_sound = SOUND_SUPER_JACKPOT;
    } else { // basic win
      win_rank = 1;
      win_return = config.cc_return_slots_basic;
      win_message = golden_emote + " " + username + " WON 💰💰 +";
      win_sound = SOUND_JACKPOT;
    }
  }

  return {symbols: symbols, rank: win_rank, return: win_return, message: win_message, sound: win_sound};
}

function goldenEvent(target, username) {

  const rain_messages = 10;
  const chars_per_rain = 13;
  const rain_symbols = "💎👑";
  const rain_delay = 1000;

  let delay = 2000;

  for (let i = 0; i < rain_messages; i++) {

    let rain = "";
    for (let j = 0; j < chars_per_rain; j++) {
        rain = rain + rain_symbols[getRandomInt(rain_symbols.length)];
    }

    scheduleDelayedMessage(target, delay, rain);
    delay += rain_delay;
  }

  const ge = golden_emote;

  scheduleDelayedMessage(target, delay, "Congratulations " + username + "!! You achieved the impossible! You have gold status for 30 days and will greeted with a special anthem from now on!");
  scheduleDelayedMessage(target, delay + 1000, ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge + " " + ge);

  updateUser(username, getUserBalance(username), anthem=SOUND_FANFARE, gold=(time));
}

function topLevelEvent(target, name, lvl) {

  if (name == PRIV_STREAMER)
    return; // no congrats for cheating mr casimir

  if (lvl == 100) {
    const message = "🥂 Congratulations " + name + " on behalf of the crew for reaching level 100! Thank you for beeing such an active member. We hope the journey has been pleasant for you. There are no rewards to be unlocked beyond this point, however, you may continue to level, just for the prestige ;)  Cheers!  sign. Your Captain & Staff 👨‍✈️";
    scheduleDelayedMessage(target, 2100, message);
  } else if (lvl == 500) {
    const message = "🥂 Congratulations " + name + " on behalf of the crew for reaching level 500! You reached the mountain top but kept on climbing, we are glad to have you.  Cheers!  sign. Your Captain & Staff 👨‍✈️";
    scheduleDelayedMessage(target, 2100, message);
  } else if (lvl == 1000) {
    const message = "🥂 Congratulations " + name + " on behalf of the crew for reaching level 1000! Who is the machine here? You or the CaptainsEngineer?  Cheers!  sign. Your Captain & Staff 👨‍✈️";
    scheduleDelayedMessage(target, 2100, message);
  }
}

function scheduleDelayedMessage(target, delay, message) {

  setTimeout(function() {
    client.say(target, message);
  }, delay);
}


function balanceCommand(target, context, self) {
  whisperBack(target, context, "your balance is " + getUserBalance(context.username) + CC_SYMBOL);
}

function challengeCommand(args, cmd, target, context, self) {

    // check if authorised
    if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {

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

      client.say(target, "Challenge added!");

      writeChallenges(challenges);
   }

}

function checkProvanity(text) {
  let t = text.toLowerCase();
  return t.replaceAll(' ', '').includes('neger') || t.includes('negger') || t.includes('nigger')|| t.includes('nigga') || t.includes('niga') || t.includes('bitch') || t.includes('hure') || t.includes('arsch') || t.includes('wichser') || t.includes('schwanz') || t.includes('penis') || t.includes('bastard') || t.includes('bastart') || t.includes('schwuchtel') || t.includes('faggot') || t.includes('simp');
}

function transferAccountCommand(args, target, context, self) {

    // check if authorised
    if (context.username != PRIV_STREAMER && context.username != PRIV_SUPPORT) {
      return;
    }

    // integrity guard
    if (args.length != 3) {
      whisperBack(target, context, "invalid arguments, !transferaccount <old username> <new username>");
      return;
    }
  
    let oldUser = args[1].toLowerCase();
    let newUser = args[2].toLowerCase();
  
    // check target exsiting
    if (isUserKnown(oldUser) == false) {
      whisperBack(target, context, targetUser + " is not in the save list");
      return;
    }
  
    for (let a of chatters.accounts) {
      if (a.name == oldUser) {
        a.name = newUser;
        // write changes to file
        try {
          fs.writeFile('chatters.json', JSON.stringify(chatters), callback=function(callback) {});
        } catch (e) {
          console.log(e);
        }
        client.say(target, context.username + " send " + targetUser + " " + amount + CC_SYMBOL);
        break;
      }
    }
  }

function rankingCommand(target, context, self) {

  let arr = chatters.accounts;

  arr.sort((b, a) => (a.xp == undefined ? 0 : a.xp) - (b.xp == undefined ? 0 : b.xp));

  let message = "Top sailors: "

  let own_rank;
  let own_lvl;
  let own_emblem;
  let sub = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr.length <= i)
      break;
    if (arr[i].name == PRIV_STREAMER) {
      sub = 1;
      continue;
    }
    const lvl = getLevel(arr[i].xp).lvl;

    if (arr[i].name == context.username) {
      own_rank = i + 1 - sub;
      own_lvl = lvl;
      own_emblem = LVL_EMBLEMS[Math.min(Math.floor(lvl / config.lvl_per_emblem), LVL_EMBLEMS.length - 1)];
    }

    if (i > 5 + sub)
      continue; // stop printing, keep iterating to find target user
    const emblem = LVL_EMBLEMS[Math.min(Math.floor(lvl / config.lvl_per_emblem), LVL_EMBLEMS.length - 1)];
    message += "#" + (i + 1 - sub) + " lvl " + lvl + " [" + emblem + "] " + arr[i].name + ", ";
  }
  message = message.substring(0, message.length - 2);
  client.say(target, message);
  if (context.username != PRIV_STREAMER && own_rank > 5) {
    client.say(target, context.username + " is #" + own_rank + " lvl " + own_lvl + " [" + own_emblem + "]");
  }
}

function levelCommand(target, context, self) {
  let lvl = levels[context.username.toLowerCase()];
  let xp = getUserXp(context.username);
  let xp_calculated = getLevel(xp);
  let xp_left = xp_calculated.xpleft;
  let xp_next_level = xp_calculated.nextlvlxp;

  let progress = Math.floor((1 - ((0.0 + xp_left) / xp_next_level)) * 100);

  let emblem = LVL_EMBLEMS[Math.min(Math.floor(lvl / config.lvl_per_emblem), LVL_EMBLEMS.length - 1)];
  if (context.username == PRIV_STREAMER)
    emblem = "👨🏻‍✈️"; // chef will cheat levels for sure
  let message = "lvl " + lvl + " [" + emblem + "], " + progress + "% -> " + (lvl + 1);
  whisperBack(target, context, message);
}

function giveXpCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == PRIV_SUPPORT) {
    // integrity guard
    if (args.length != 3 || isNaN(args[2])) {
      whisperBack(target, context, "invalid arguments, !givexp <username> <amount>");
      return;
    }

    let targetUser = args[1].toLowerCase();
    let amount = parseInt(args[2], 10);
    incrementUserBalanceAndXP(targetUser, balance_add = 0, xp_add = amount, cause = "command");
    whisperBack(target, context, "Gave " + amount + "xp to " + targetUser);
  } // else: no athority, do nothing
}

function configCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {

    if (args.length < 2) {
      whisperBack(target, context, "invalid arguments, !config <variable> [value]");
      return;
    }

    for (let setting of CONFIGURABLE) {
      if (args[1] == setting.name) {

        if (args.length == 2) {
          whisperBack(target, context, args[1] + " is " + eval("config." + setting.name));
          return;
        }

        if (setting.type == 'o') { // volume for example is an array of volume entries
          whisperBack(target, context, args[1] + " is set/used by a different command");
          return;
        }

        if (setting.type == 'n' && isNaN(args[2])) {
          whisperBack(target, context, args[1] + " has to be a number (" + setting.unit + ")");
          return;
        }

        if (setting.type == 'f' && isNaN(args[2])) {
          whisperBack(target, context, args[1] + " has to be a float (" + setting.unit + ")");
          return;
        }

        let val = setting.type == 's' ? encodeURIComponent(args[2]) : args[2];
        if (setting.type == 'n')
          val = parseInt(val, 10);
        else if (setting.type == 'f')
          val = parseFloat(val);
        eval("config." + setting.name + " = val;");
        console.log("set " + setting.name + " to " + args[2]);
        whisperBack(target, context, "set " + setting.name + " to " + args[2]);
        saveConfig();
        return;
      }
    }

    let all_settings = "";
    for (let setting of CONFIGURABLE) {
      all_settings += setting.name + ", ";
    }
    whisperBack(target, context, args[1] + " not found. Available: " + all_settings);
  }
}

function configCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {

    if (args.length < 2) {
      whisperBack(target, context, "invalid arguments, !config <variable> [value]");
      return;
    }

    for (let setting of CONFIGURABLE) {
      if (args[1] == setting.name) {

        if (args.length == 2) {
          whisperBack(target, context, args[1] + " is " + eval("config." + setting.name));
          return;
        }

        if (setting.type == 'o') { // volume for example is an array of volume entries
          whisperBack(target, context, args[1] + " is set/used by a different command");
          return;
        }

        if (setting.type == 'n' && isNaN(args[2])) {
          whisperBack(target, context, args[1] + " has to be a number (" + setting.unit + ")");
          return;
        }

        if (setting.type == 'f' && isNaN(args[2])) {
          whisperBack(target, context, args[1] + " has to be a float (" + setting.unit + ")");
          return;
        }

        let val = setting.type == 's' ? encodeURIComponent(args[2]) : args[2];
        if (setting.type == 'n')
          val = parseInt(val, 10);
        else if (setting.type == 'f')
          val = parseFloat(val);
        eval("config." + setting.name + " = val;");
        console.log("set " + setting.name + " to " + args[2]);
        whisperBack(target, context, "set " + setting.name + " to " + args[2]);
        saveConfig();
        return;
      }
    }

    let all_settings = "";
    for (let setting of CONFIGURABLE) {
      all_settings += setting.name + ", ";
    }
    whisperBack(target, context, args[1] + " not found. Available: " + all_settings);
  }
}

function volumeCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {

    if (args.length == 1) {
      whisperBack(target, context, "Master volume is " + config.mastervolume + "%, show overview in console with !volumes");
      return;
    }

    if (args.length > 3) {
      whisperBack(target, context, "invalid arguments, !volume [<global volume>]|[<file> <volume>], volume greater 0");
      return;
    }

  //  if (args[1].startsWith('+') || args[1].startsWith('-')) {
      // assume additive modifier


    if (args.length == 2) {

      if (args[1] == "standard" || args[1] == "reset") {
        config.mastervolume = 100;
        config.volume = [];
        whisperBack(target, context, "Volumes reset");
        return;
      }

      if (args[1].startsWith('+') || args[1].startsWith('-')) {

        // assume additivemod
        let mod = args[1].substring(1, args[1].length);
        if (isNaN(mod)) {
          whisperBack(target, context, "invalid modifier, must be +/-<value>");
          return
        } else {
          config.mastervolume = parseInt(config.mastervolume, 10) + parseInt(args[1], 10);
          saveConfig();
          whisperBack(target, context, "Master volume set to " + config.mastervolume + "%");  
        }

      } else if (isNaN(args[1])) {
        
        let target_sound = args[1];

        // check if target file exists
        try {
          if (!fs.existsSync(target_sound)) {
            whisperBack(target, context, "No such file " + target_sound);
            let filenames = "";
            fs.readdir(".", (err, files) => {
              files.forEach(file => {
                if (file.endsWith(".mp3")) {
                  filenames += file + ", ";
                }
              });
              whisperBack(target, context, "Available: " + filenames);
            });
            return;
          }
        } catch(err) {
          console.log(err)
        }

      let found = false;
      for (let s of config.volume) {
        if (s.file == target_sound) {
          whisperBack(target, context, target_sound + " volume set to " + s.volume + "%");  
          found = true;
          break;
        }
      }

      if (!found) {
        whisperBack(target, context, target_sound + " volume set to 100%");  
      }

      } else {

        let gain = args[1];
        config.mastervolume = gain;
        saveConfig();
        whisperBack(target, context, "Master volume set to " + gain + "%");  
      }

    } else if (args.length == 3) {

      let target_sound = args[1];
      let gain = args[2];

      if (!target_sound.endsWith(".mp3")) {
        whisperBack(target, context, "Sounds have .mp3 format");
        return;
      }

      // check if target file exists
      try {
        if (!fs.existsSync(target_sound)) {
          whisperBack(target, context, "No such file " + target_sound);
          let filenames = "";
          fs.readdir(".", (err, files) => {
            files.forEach(file => {
              if (file.endsWith(".mp3")) {
                filenames += file + ", ";
              }
            });
            whisperBack(target, context, "Available: " + filenames);
          });
          return;
        }
      } catch(err) {
        console.log(err)
      }

      let overwritten = false;
      for (let s of config.volume) {
        if (s.file == target_sound) {
          if (gain.startsWith('+') || gain.startsWith('-')) {
            s.volume = parseInt(s.volume, 10) + parseInt(gain, 10);
            whisperBack(target, context, "Set " + target_sound + " volume multiplier to " + (parseInt(s.volume, 10)) + "%");
          } else {
            s.volume = gain;
            whisperBack(target, context, "Set " + target_sound + " volume multiplier to " + gain + "%");
          }
          overwritten = true;
          break;
        }
      }


      if (!overwritten) {
        if (gain.startsWith('+') || gain.startsWith('-')) {
          config.volume.push({file : target_sound, volume : 100 + parseInt(gain, 10)});
          whisperBack(target, context, "Set " + target_sound + " volume multiplier to " + (100 + parseInt(gain, 10)) + "%");
        } else {
          config.volume.push({file : target_sound, volume : gain});
          whisperBack(target, context, "Set " + target_sound + " volume multiplier to " + gain + "%");
        }
      }

      saveConfig();
    }

  } // else: no athority, do nothing
}

function volumesCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {

    let message = "\n\n***** Sound overview *****\n";
    message += "***** Commands: \n";
    message += "Set master volume:  !volume <value>\n";
    message += "Adjust master volume: !volume +/-<adjustment>\n";
    message += "Adjust single volume:  !volume <file> <value>\n";
    message += "Adjust master volume: !volume <file> +/-<adjustment>\n";
    message += "Reset all volumes:  !volume reset\n";
    message += "***** Current Setting: \n";
    message += "Master volume: " + config.mastervolume + "%\n";
    message += "--- Anthems: value, file \n";
    for (let a of CC_ANTHEMS) {
      let vol = 100;
      for (let s of config.volume)
        if (s.file == a.sound) {
          vol = s.volume;
          break;
        }
        message += " " + vol + "%  \t" + a.sound + " \t aka '" + a.name +  "'\n";
      }
    message += "--- Sounds: value, file\n";
    for (let a of CC_SOUNDS) {
      let vol = 100;
      for (let s of config.volume)
        if (s.file == a.sound) {
          vol = s.volume;
          break;
        }
      message += " " + vol + "%  \t" + a.sound + " \t aka '" + a.name +  "'\n";
    }
    message += "--- Others: value, file\n";

    let others = [SOUND_CONTROLL_THE_NARATIVE_LOOSES_HIS_LIVESAVINGS, SOUND_ENORM, SOUND_OH_YEAH, SOUND_FAIL, SOUND_INCEPTION, SOUND_FOX_INTRO, SOUND_INTRO_CLIP, SOUND_AYE_AYE_CAPTAIN, SOUND_JACKPOT, SOUND_SUPER_JACKPOT, SOUND_GOLDEN_JACKPOT, SOUND_SON_OF_A_BITCH, SOUND_BADUMTS, SOUND_CHALLENGE, SOUND_FANFARE];
    for (let a of others) {
      let vol = 100;
      for (let s of config.volume)
        if (s.file == a) {
          vol = s.volume;
          break;
        }
      message += " " + vol + "% \t " + a + "\n";
    }
    message += "**************************\n\n";

    console.log(message);

    whisperBack(target, context, "Volume overview printed in console");

  } // else: no athority, do nothing
}

function burnCoinCommand(args, target, context, self) {
  
  // integrity guard
  if (args.length != 2 || isNaN(args[1])) {
    whisperBack(target, context, "invalid arguments, !burn <amount>");
    return;
  }

  let amount = parseInt(args[1], 10);

  const balance_after = Math.max(getUserBalance(context.username) - amount, 0);
  updateUserBalance(context.username, balance_after); // remove requested amount from save file
  whisperBack(target, context, "🔥 burned " + amount + CC_SYMBOL);
}


function giveCoinCommand(args, target, context, self) {
  
  // check if authorised
  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT) {
    // integrity guard
    if (args.length != 3 || isNaN(args[2])) {
      whisperBack(target, context, "invalid arguments, !givecc <username> <amount>");
      return;
    }

    let targetUser = args[1].toLowerCase();
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

  let targetUser = args[1].toLowerCase();
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
    whisperBack(target, context, targetUser + " is not on deck");
    return;
  }

  updateUserBalance(targetUser, getUserBalance(targetUser) + amount); // add requested amount to user save
  updateUserBalance(context.username, getUserBalance(context.username) - amount);

  client.say(target, context.username + " send " + targetUser + " " + amount + CC_SYMBOL);

}


function listSounds(target, context, self) {

  let list = "sounds: ";

  for (let sound of CC_SOUNDS) {
    list += sound.name + " " + (sound.price * sccfac()) + CC_SYMBOL + ", ";
  }

  whisperBack(target, context, list);
}

function listAnthems(target, context, self) {

  let list = "your available anthems: reset (free)";
  const vip = isVIP(context.username) || isSubscriber(context.username);

  for (let sound of CC_ANTHEMS) {
    if (vip || isAnthemUnlocked(levels[context.username.toLowerCase()], sound)) {
      list += ", " + sound.name + " " + (sound.price * accfac()) + CC_SYMBOL;
    }
  }

  whisperBack(target, context, list);
}

function soundCommand(args, target, context, self) {

  if (levels[context.username.toLowerCase()] < config.min_lvl_sound) {
    whisperBack(target, context, "You are level " + levels[context.username.toLowerCase()] + ", unlock !sound at level " + config.min_lvl_sound);
    return;
  }

  if (args.length == 1 || args[1] == "list" || args[1] == "l" || args[1] == "all") {
    // show item list
    listSounds(target, context, self);
    return;
  }

  let itemname = args[1];

  // iterrate sounds
  for (let sound of CC_SOUNDS) {
    if (sound.name == itemname) {

      // check funding
      let userbalance = getUserBalance(context.username);

      const price = sound.price * sccfac();

      if (userbalance < price) {
        whisperBack(target, context, "You have not enough Captain's Coin (" + userbalance + "/" + price + CC_SYMBOL + "), chat more.");
        return;
      } else {
        // purchase successfull
        client.say(target, context.username + " bought " + sound.name + ". -" + price + CC_SYMBOL);
        updateUserBalance(context.username, userbalance - price);
        playSound(sound.sound);
        return;
      }
    }
  }

  
  // assume no item name hit
  whisperBack(target, context, itemname + " not found, try !sound");
}

function sameSongCommand(args, target, context, self) {

  if (getTime() - cantina_hired <  config.cantina_band_duration) {
    // cantina was recently hired, do not pay again
    setTimeout(function() {
      playSound(SOUND_CANTINA_BAND);
    }, 1000 * (Math.max(DURATION_CANTNA - (getTime() - cantina_hired), 0)));
    console.log("cantina hired: " + cantina_hired + "playing in " + (Math.max(DURATION_CANTNA - (getTime() - cantina_hired), 0)));
    cantina_hired += DURATION_CANTNA;
    console.log("cantina hired after increment: " + cantina_hired);
  } else {
    // band needs to be hired
    whisperBack(target, context, "The band left " + (getTime() - cantina_hired) + " seconds ago, use !cantina to hire (" + config.cc_cost_cantina_band + CC_SYMBOL + ")");
  }
}

function cantinaCommand(args, target, context, self) {

  const price = config.cc_cost_cantina_band;

  if (getTime() - cantina_hired <  config.cantina_band_duration) {
    // cantina was recently hired, do not pay again
    cantina_hired = getTime();
    playSound(SOUND_CANTINA_BAND);
  } else {
    // band need to be hired, require funds
    
    // check funding
    let userbalance = getUserBalance(context.username);
    if (userbalance < price) {
      whisperBack(target, context, "You don't have enough Captain's Coin (" + userbalance + "/" + price + CC_SYMBOL + ") to hire the band");
      return;
    } else {
      client.say(target, context.username + " hired the cantina band, use !spieldenselbensongnochmal in time -" + price + CC_SYMBOL);
      updateUserBalance(context.username, userbalance - price);
      playSound(SOUND_CANTINA_BAND);
      cantina_hired = getTime();
      return;
    }
  }
}

function soCommand(args, target, context, self) {

  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT || context.username == PRIV_MOD_0 || context.username == PRIV_MOD_1){

    if (args.length < 2) {
      whisperBack(target, context, "invalid usage: !so <username>");
      return;
    }

    let linked = args[1].toLowerCase().replaceAll('@', '');

    client.say(target, decodeURIComponent(config.msg_so) + " " + linked + " https://www.twitch.tv/"+  linked);  
  }
}

function juwlzCommand(args, target, context, self) {

  if (context.username.toLowerCase() == "juwlzdblack" || context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT || context.username == PRIV_MOD_0 || context.username == PRIV_MOD_1){
    client.say(target, decodeURIComponent(config.juwlz_referal));  
  }
}

function blessingCommand(args, target, context, self) {

  if (context.username == PRIV_STREAMER || context.username == PRIV_SUPPORT){
    triggerEventBlessing(); 
  }
}


function anthemCommand(args, target, context, self) {

  const vip = isVIP(context.username) || isSubscriber(context.username);

  if (!vip && levels[context.username.toLowerCase()] < config.min_lvl_anthems) {
    whisperBack(target, context, "You are level " + levels[context.username.toLowerCase()] + ", unlock !anthem at level " + config.min_lvl_anthems + " or by subscribing to the channel!");
    return;
  }

  if (args.length == 1 || args[1] == "list" || args[1] == "l" || args[1] == "all") {
    // show item list
    listAnthems(target, context, self);
    return;
  }

  let itemname = args[1];

  if (itemname == "reset") {
    whisperBack(target, context, context.username + " will no longer have a welcome sound played");
    updateUser(context.username, getUserBalance(context.username), anthem=-1);
    return;
  }

  // iterrate anthems
  for (let sound of CC_ANTHEMS) {
    if (sound.name == itemname) {

      // check unlock
      if (!vip && !isAnthemUnlocked(levels[context.username.toLowerCase()], sound)) {
        whisperBack(target, context, "You didn't unlock this anthem yet. Level more or subscribe to the channel.");
      }

      // check funding
      let userbalance = getUserBalance(context.username);

      const price = sound.price * accfac();

      if (userbalance < price) {
        whisperBack(target, context, "You have not enough Captain's Coin (" + userbalance + "/" + price + CC_SYMBOL + "), earn coin by chatting.");
        return;
      } else {
        // purchase successfull
        client.say(target, "🥳 " + context.username + " will now be greeted with " + sound.name + ". -" + price + CC_SYMBOL);
        updateUser(context.username, userbalance - price, anthem=sound.sound);
        return;
      }
    }
  }

  // assume no item name hit
  whisperBack(target, context, itemname + " not found, try !anthem");
}

function renameCommand(args, target, context, self) {
  
  if (context.username != PRIV_STREAMER && context.username != PRIV_SUPPORT) {
    return;
  }

  // integrity guard
  if (args.length != 3) {
    whisperBack(target, context, "invalid arguments, !rename <username before> <username now>");
    return;
  }

  let name_original = args[1].toLowerCase();
  let name_new = args[2].toLowerCase();

  let res = renameUser(name_original, name_new);

  if (res != undefined) {
    client.say(target, name_original + "'s account was successfully assigned to " + name_new);
  } else {
    client.say(target, name_original + "'s account was not found");
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  updateVips();
  scheduleBroadcast();
  updateTime();
}

function updateTime() {
  time = new Date().getTime();
  setTimeout(updateTime, 10);
}

function updateVips() {
  client.vips(opts.channels[0]).then((n) => vips = n).catch(e => console.log(e));
  setTimeout(updateVips, 20000); // refresh every 30 sec
}

function isSubscriber(name) {
  return sub_status[name];
}


function isVIP(name) {
  for (s of vips) {
    if (s.toLowerCase() == name.toLowerCase()) {
      return true;
    }
  }
  return false;
}

/**
 * Initializes levels map with user levels based on xp in chatters.json
 */
function initUserLevels() {
  for (let acc of chatters.accounts) {
    levels[acc.name] = getLevel(acc.xp).lvl;
  }
}

function scheduleBroadcast() {
  let delay = (config.min_delay_broadcast + getRandomInt(config.max_delay_broadcast - config.min_delay_broadcast + 1)) * 60000;

  let broadcasts_summed = 0;
  BROADCASTS.forEach(b => broadcasts_summed += b.randspace);
  let broadcast_picked = getRandomInt(broadcasts_summed);

  for (let b of BROADCASTS) {
    broadcasts_summed -= b.randspace;

    if (broadcast_picked >= broadcasts_summed) {
      scheduleDelayedMessage(opts.channels[0], delay, b.message);
      if (b.event != undefined)
        setTimeout(b.event, delay + 10);
      break;
    }
  }
  setTimeout(scheduleBroadcast, delay);
}

function triggerEventHappyHr() {
  // 20% of slots
  console.log("event: happy hr");
  event_happy_hr = time;
}

function triggerEventMegaHappyHr() {
  // 40% of slots
  console.log("event: mega happy hr");
  event_mega_happy_hr = time;
}

function triggerEventPirateAttack() {
  // !fight
  console.log("event: pirate attack");
  event_pirate_attack = time;
  pirate_participants = []; // reset participants
  setTimeout(function() {
    let win = false;
    for (let acc of chatters.accounts) {
      if (pirate_participants[acc.name] == true)
        win = true;
    }
    if (win) {
      client.say(opts.channels[0], "🏴‍☠️🔥 The pirates were successfuly defeated! (+" + config.xp_on_pirate_win + "xp for all participants)");
      
      chatters.accounts.forEach(acc => {
        if (pirate_participants[acc.name] != undefined)
          incrementUserBalanceAndXP(acc.name, 0, config.xp_on_pirate_win, cause="piratewin-after-event");
        });

    } else {
      client.say(opts.channels[0], "🏴‍☠️⚔️ The pirates won")
    }
  }, config.min_delay_broadcast * 60000);
}

function triggerEventXpBoost() {
  // double xp
  console.log("event: xp boost");
  event_xp_boost = time;
}

function triggerEventBlessing() {
  // +1000% golden chance
  console.log("event: blessed");
  event_blessing = time;
}

function triggerEventSuperSale() {
  // 90% of sounds, tts and anthems
  console.log("event: super sale");
  event_super_sale = time;
}

function triggerEventMadSlots() {
  // slot limit 5000
  console.log("event: mad slots");
  event_mad_slots = time;
}

/**
 * returns wether the event time stamp value means the event is currently active
 * @param {*} timestamp 
 */
function isEventActive(timestamp) {
  const max_duration = config.min_delay_broadcast;
  return time - timestamp <= max_duration * 60000;
}

function handleChatRewards(name, message) {

  let xp_added = 0;
  let cc_added = 0;

  if (message.startsWith("!slot")) {
    xp_added = config.xp_per_slot_cmd;
    incrementUserBalanceAndXP(name, cc_added, xp_added, "slot command");
    return;
  } else if (message.startsWith("!tts ")) { 
    xp_added = message.length * config.xp_per_char; // add char xp even for tts
    incrementUserBalanceAndXP(name, cc_added, xp_added, "tts command");
    return;
  } else if (message.startsWith('!')) {
    return; // no rewards for other commands. Rewards for lurk and slot win are handled seperatly
  }

  // assume non-command message

  // count captain emotes
  var emote_count = (message.match(/ captai/g) || []).length;
  xp_added = emote_count * config.xp_per_captain_emote + message.length * config.xp_per_char;
  cc_added = config.cc_per_chat;

  incrementUserBalanceAndXP(name, cc_added, xp_added, "chat message");
}

function handleXpUpdate(name, xp_updated) {

  const lvl_updated = getLevel(xp_updated).lvl;
  const lvl_before = levels[name];

  if (lvl_before != lvl_updated) {
    console.log("Level up for " + name + " " + lvl_before + " > " + lvl_updated);
    levels[name] = lvl_updated;
    const emblem = LVL_EMBLEMS[Math.min(Math.floor(lvl_updated / config.lvl_per_emblem), LVL_EMBLEMS.length - 1)];
    
    
    let reward_list = "-> +" + ((lvl_updated - lvl_before) * config.cc_per_lvl) + CC_SYMBOL;
    
    if (lvl_before < config.min_lvl_sound && lvl_updated >= config.min_lvl_sound) {
      reward_list += ", !sound 🔓"
    }

    if (lvl_before < config.min_lvl_slotsx && lvl_updated >= config.min_lvl_slotsx) {
      reward_list += ", !slotsx 🔓"
    }

    if (lvl_before < config.min_lvl_golden_chance_1 && lvl_updated >= config.min_lvl_golden_chance_1) {
      reward_list += ", +50% golden chance " + golden_emote;
    }

    if (lvl_before < config.min_lvl_golden_chance_2 && lvl_updated >= config.min_lvl_golden_chance_2) {
      reward_list += ", +100% golden chance " + golden_emote;
    }

    for (let a of CC_ANTHEMS) {
      if (isAnthemUnlocked(lvl_updated, a) && !isAnthemUnlocked(lvl_before, a)) {
        reward_list += ", !anthem " + a.name;
      }
    }

    if (lvl_before < config.min_lvl_tts && lvl_updated >= config.min_lvl_tts) {
      reward_list += ", !tts 🔓"
    }

    if (lvl_updated > config.min_lvl_tts && lvl_updated <= config.max_lvl_tts_scaling) {
      reward_list += ", +" + (lvl_updated - Math.max(lvl_before, config.min_lvl_tts)) * config.tts_chars_per_lvl + " TTS limit";
    }

    if (lvl_updated <= config.max_lvl_slot_scaling) {
      reward_list += ", +" + (lvl_updated - lvl_before) * config.slot_rolls_per_lvl * config.cc_cost_slots + CC_SYMBOL + " 🎰 limit";
    } else if (lvl_updated <= config.max_lvl_reward && lvl_before > config.max_lvl_slot_scaling) {
      reward_list += ", +" + (lvl_updated - lvl_before) * config.slot_rolls_added_last_lvls * config.cc_cost_slots + CC_SYMBOL + " 🎰 limit";
    }

    if (name != PRIV_STREAMER) {
      const message = "⬆️🎉 Level up! " + name + " >> " + lvl_updated + " [" + emblem + "] " + reward_list;
      scheduleDelayedMessage(opts.channels[0], 2010, message);
      if (lvl_updated == 100 || lvl_updated == 500 || lvl_updated == 1000)
        topLevelEvent(opts.channels[0], name, lvl_updated);
    }
  }
}

function isAnthemUnlocked(lvl, anthem_obj) {

  if (lvl < config.min_lvl_anthems) { // minimum lvl for anthems not reached
    return false;
  } else if (lvl > config.max_lvl_anthems) { // all anthems quaranteed
    return true;
  }

  let anthem_index = CC_ANTHEMS.indexOf(anthem_obj);

  // scale lvl by anthem price
  let target_lvl = config.min_lvl_anthems + (anthem_index * 1.0 / (CC_ANTHEMS.length - 1)) * (config.max_lvl_anthems - config.min_lvl_anthems);
  return lvl >= target_lvl;
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


    updateUser(name, config.cc_initial);
    levels[name] = 1;
    client.say(target, decodeURIComponent(config.msg_welcome) + name + "!");
  }
}


function handleAnthem(name, target) {

  if (users_seen.indexOf(name) == -1) {
    users_seen.push(name);

    if (name.toLowerCase() == "kgpausa") {
      // play Pausas own anthem
      playSound(SOUND_PAUSE_ANTHEM);
      return;
    }

    let anthem = getUserAnthem(name);
    if (anthem != undefined) {
      playSound(anthem);
    }
  }

}

function setDeathCount(count) {

  deaths = count;
  rawdata = decodeURIComponent(config.death_cnt_prefix) + " " + count
  fs.writeFileSync(FILENAME_DEATH_COUNTER, rawdata, {flag:'w'});
}

function setBrauseCount(count) {

  brause = count;
  rawdata = decodeURIComponent(config.brause_cnt_prefix) + " " + count
  fs.writeFileSync(FILENAME_BRAUSE_COUNTER, rawdata, {flag:'w'});
}

function playSound(sound_path, duration=20000) {

  if (silent_mode) { // no sounds during silent mode
    console.log("sound " + sound_path + " suppressed due to silent mode");
    return;
  }

  let gain = config.mastervolume / 100.0;

  // check if gain local modifier
  for (let s of config.volume) {
    if (s.file == sound_path) {
      gain = gain * s.volume / 100.0;
      break;
    }
  }

  exec('vlc\\vlc.exe -Irc -Idummy --gain ' + gain + ' ' + sound_path + ' vlc://quit', (err, stdout, stderr) => {});
  console.log("playing sound " + sound_path);
}

function getLevel(xp) {
  
  if (xp == undefined)
    return {lvl: 1, nextlvlxp: config.xp_base, xpleft: config.xp_base};

  const base = config.xp_base;
  const add = config.xp_added_per_lvl;

  let lvl = 1;
  let step = base;

  while (true) {

    xp -= step;

    if (xp < 0)
      break;

    lvl += 1;
    step += add;
  }

  return {lvl: lvl, nextlvlxp: step, xpleft: xp * -1};
}

/**
 * CC cost factor to purchase sounds
 */
function sccfac() {
  return config.cc_sound_cost_multiplier * (isEventActive(event_super_sale) ? 0.1 : 1);
}

/**
 * CC cost factor to purchase anthems
 */
 function accfac() {
  return config.cc_anthem_cost_multiplier * (isEventActive(event_super_sale) ? 0.1 : 1);
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

/**
 * Adds given values to user xp and coin balance
 * @param {string} user user name
 * @param {number} balance_add balance update 
 * @param {number} xp_add xp update
 * @param {string} cause debug string
 */
function incrementUserBalanceAndXP(user, balance_add=0, xp_add=0, cause=undefined) {

  let user_balance = 0;
  let user_xp = 0;

  for (acc of chatters.accounts) {
    if (acc.name == user) {
      user_balance = acc.balance;
      user_xp = acc.xp;  
      break;
    }
  }

  if (user_xp == undefined)
    user_xp = 0;

  let bonus = false;

  if (cause != "command" && isEventActive(event_xp_boost)) {
    xp_add = xp_add * 5;
  } else  if (cause != "command" && (isVIP(user) || isSubscriber(user))) { // apply sub/vip bonus if eligable
    xp_add = xp_add * config.xp_factor_subsciber;
    bonus = true;
  }

  if (cause != undefined) { // debug print
    console.log(user + " earns " + balance_add + "cc and " + xp_add + (bonus ? "B" : "") + "xp (-> " + (user_xp + xp_add) + ") due to " + cause);
  }

  if (xp_add > 0)
    handleXpUpdate(user, user_xp + xp_add);

  updateUser(user, user_balance + balance_add, anthem=undefined, gold=undefined, xp=user_xp + xp_add);
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

function getUserXp(user) {
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      return acc.xp;
    }
  }
  return 0; // user not found
}

function isGoldStatusActive(user) {
  if (getUserGoldStatus(user) == undefined)
    return false;
  return getUserGoldStatus(user) > (time) - config.gold_status_duration;
}

function getUserGoldStatus(user) {
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      return acc.gold;
    }
  }
  return undefined; // user not found
}

function updateUserBalance(user, balance) {
  updateUser(user, balance);
}

/**
 * Changes username to be identified with in the database
 * @param {*} name_original 
 * @param {*} name_new 
 * @return undefined if user not found, new username if user found
 */
function renameUser(name_original, name_new) {

  name_original = name_original.toLowerCase();
  name_new = name_new.toLowerCase();

  // pick potential duplicate for deletion
  let to_delete = undefined;
  for (acc of chatters.accounts) {
    if (acc.name == name_new) {
      to_delete = acc;
      break;
    }
  }

  let found = false;
  for (acc of chatters.accounts) {
    if (acc.name == name_original) {
      found = true;
      acc.name = name_new;
      break;
    }
  }

  if (found) {
    // delete duplicate if present
    if (to_delete != undefined) {
      chatters.accounts.splice(chatters.accounts.indexOf(to_delete), 1);
    }

    // write changes to file
    try {
      fs.writeFile('chatters.json', JSON.stringify(chatters), callback=function(callback) {});
    } catch (e) {
      console.log(e);
    }
    return name_new;
  } else
    return undefined;
}

/**
 * Updates user values and writes to json
 * @param {string} user user in lower case letters
 * @param {number} balance user balance
 * @param {string} anthem sound o be played as anthem as .exe file,  -1 if write as undefined
 * @param {number} gold gold status timestamp, -1 if write as undefined
 * @param {number} xp xp, -1 if write to undefined
 */
function updateUser(user, balance, anthem=undefined, gold=undefined, xp=undefined) {
  
  updated = false;
  for (acc of chatters.accounts) {
    if (acc.name == user) {
      acc.balance = balance;

      if (anthem == -1) {
        acc.anthem = undefined;
      } else if (anthem != undefined) {
        acc.anthem = anthem;
      }

      if (gold == -1) {
        acc.gold = undefined;
      } else if (gold != undefined) {
        acc.gold = gold;
      }

      if (xp == -1) {
        acc.xp = undefined;
      } else if (xp != undefined) {
        acc.xp = xp;
      }

      updated = true;
      break;
    }
  }

  if (!updated) { // no update so far, assume new user
    chatters.accounts.push({name : user, balance : balance, anthem: anthem, gold: gold, xp: xp});
  }

  // write changes to file
  try {
    fs.writeFile('chatters.json', JSON.stringify(chatters), callback=function(callback) {});
  } catch (e) {
    console.log(e);
  }
}

function loadChatters() {
  createIfUnexistent('chatters.json', JSON.stringify({accounts: [{name : "obama69", balance : 420}]}));

  let rawdata = fs.readFileSync('chatters.json');
  let parsed;

  try {
    parsed = JSON.parse(rawdata);
  } catch (err) {
    // parsing failed, savefile corrupted, load newest backup
    try {
      loadBackup(0);
      rawdata = fs.readFileSync('chatters.json');
      parsed = JSON.parse(rawdata);
    } catch (err) {
      console.log("ERR: recovery failed");
      throw err;
    }
  }
  

  return parsed;
}

function loadChallenges() {
  createIfUnexistent('challenges.json', JSON.stringify({global: [], hunt: []}));
  let rawdata = fs.readFileSync('challenges.json');
  return JSON.parse(rawdata);
}

function backupChatters() {

  const backup_id = getRandomInt(1000);

  try {
    if (!fs.existsSync('backups'))
      fs.mkdirSync('backups');
    fs.writeFileSync('backups/chatters_backup-' + backup_id + '.json', JSON.stringify(chatters), {flag:'w'});
  } catch (e) {
    console.log(e);
  }
}

function loadBackup(offset) {

  console.log("RECOVERY: Recovery requested");
  let files = fs.readdirSync(path="backups");
  files.sort((a, b) => fs.statSync("backups/" + b).mtime - fs.statSync("backups/" + a).mtime);
  let chosen = files[Math.min(files.length - 1, offset)];
  console.log("RECOVERY: Loading backup " + chosen);
  try {
    fs.unlinkSync("chatters.json");
  } catch(err) {}
  fs.copyFileSync("backups/" + chosen, "chatters.json");
}

function writeChallenges(challenges) {
    // write changes to file
    try {
      fs.writeFileSync('challenges.json', JSON.stringify(challenges), {flag:'w'});
    } catch (e) {
      console.log(e);
    }
}

function loadConfig() {
  createIfUnexistent('config.json', "{}");
  let rawdata = fs.readFileSync('config.json');
  config = JSON.parse(rawdata);
}

function loadCredentials() {
  createIfUnexistent('credentials.json', JSON.stringify({identity: {username: "CaptainsEngineer", password: "oauth:y4m3kppvn3ekwhmp9zrjlelstnx2n1"}, channels: ["captaincasimir"]}));
  let rawdata = fs.readFileSync('credentials.json');
  opts = JSON.parse(rawdata);
}

function saveConfig() {
    // write changes to file
    try {
      fs.writeFileSync('config.json', JSON.stringify(config), {flag:'w'});
    } catch (e) {
      console.log(e);
    }
}

/**
 * loads and inits config
 */
function initConfig() {

  loadConfig();

  // checks if all values present, if not sets defaults
  for (let setting of CONFIGURABLE) {
    if (eval("config." + setting.name) == undefined) {
      console.log("config: " + setting.name + " not defined, defaulting...");
      if (setting.type == 's')
        eval("config." + setting.name + " = '" + setting.default + "';");
      else
        eval("config." + setting.name + " = " + setting.default + ";");
    }
  }

  saveConfig();
}

function createIfUnexistent(file, defaultVal) {
  if (!fs.existsSync(file)) { // create file if not existing
    fs.writeFileSync(file, defaultVal, {flag:'w'});
    console.log("File absend: " + file + ", creating...");
  }
}

function whisperBack(target, context, message) {
  client.say(target, message);
  //client.whisper(context.username, message);
}

function whisperBackAndDelete(target, context, message) {
  client.say(target, message);
  //whisperBack(target, context, message);
  client.deletemessage(target, context.messageUUID);
}

// returns time in seconds since process start
function getTime() {
  return process.hrtime()[0];
}


/**
 * Runs the java tts engine with a given input
 * @param {*} text 
 */
function externalTts(text) {
  const ttsFileName = "tts-engine\\ttsWindow\\tts-" + getRandomInt(9999999999) + ".txt"
  try {
    fs.writeFileSync(ttsFileName, text, {flag:'w'});
  } catch (e) {
    console.log(e);
  }
  const keyPath = resolve('./google-key.json');
  console.log("executing: " + 'set "GOOGLE_APPLICATION_CREDENTIALS=' + keyPath + '" && java -jar tts-engine\\ttsWindow\\ttsWindow.jar ' + ttsFileName);
  exec('set "GOOGLE_APPLICATION_CREDENTIALS=' + keyPath + '" && java -jar tts-engine\\ttsWindow\\ttsWindow.jar ' + ttsFileName, (err, stdout, stderr) => {});
}
