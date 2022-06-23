- 💰 Currency: Captain's Coin (₵₵)
- get ₵₵ for chatting and more
- unlock commands and more by leveling
- Basics:
 !discord, !reddit : socials
 !lurk : show you are lurking now
 !slots : 🎰 try your luck (₵₵)
 !balance : check your ₵₵ balance 🏦
 !transfer : send someone ₵₵ 💰
 !burn : burn ₵₵ for nothing 🔥
 !lvl : check your level progress
 !ranking : check level ranking
- Unlockable:
 !sound : instant play a sound 🔊 (₵₵)
 !tts : send Text-To-Speech 🔊 (₵₵)
 !anthem : set your personal theme 📯 (₵₵)
 !slotsx : special slot machine 🔞 (₵₵)


The CaptainsEngineer is a Twitch Chat Bot designed to assist and enrich the live streaming experience. Originaly designed for "CaptainCasimir"'s channel, it is configurable to be deployed on any channel and provides a maritim context ;)


# Setup
The bot requires NodeJS and is designed to work solely on Windows.

## Prerequisites
- NodeJS (tested on v16.13.1)
- local VLC installation (later to be copied into the bot directory)
- Windows

## Getting the source
1. Clone the repo
2. run `npm i -d` to install node dependencies
3. Install VLC Mediaplayer and make a copy of its main directory to be called 'vlc' with its main content. The Bot will later access vlc.exe to play sounds

## Configuring
1. in the `bot.js` set `DISCORD_INVITE` to a Discord perma invite link of your choice and `REDDIT_LINK` to a Reddit link of your choice
2. access privilaged users can be set with `PRIV_STREAMER`, `PRIV_SUPPORT`, `PRIV_MOD_0` and `PRIV_MOD_1`
3. set your channel name in the `credentials.json`
4. update and start the bot by runing `update.bat`, it will download the latest version from the repo and connect to your specified channel
5. optional: embed your own sounds by replacing .mp3 files or changine the source names in the `bot.js`
6. optional: set up channel rewards to play sounds or trigger a random challenge to be displayed using the `REWARD_ID_...` variables.


# Usage: As a viewer

The bot will manage a currency called the Captain's Coin. A viewer will recieve a coin for each (non command) chat message he sends. The amount is adjustable later.
With this currency the viewer can engage in a variety of activities. They can play sounds, trigger events such as text to speech and play with a slot machine.
Any new viewer will also get a welcome message and a sound played by the bot.

## Commands: As a viewer
All viewer commands are available to broadcasters etc aswell
- `!dice`: rolls a random number between 1 and 6
- `!tm`: will print the trademark symbol in chat
- `!discord` alias `!dc`: Will print the Discord in chat
- `!reddit`: will print the Reddit link in chat
- `!gulb`: will play a short gulping sound
- `!lurk`: will display a message indicating that the viewer is away from stream but remains on site, upon non frequent usage a minor coin reward is issued as well a descend amount of XP
- `!tutorial` alias `!help`: will print a bot tutorial in chat. This feature is deprecated and to be replaced by bot tutorials in info boxes
- `!balance`: will print the viewer's balance in chat
- `!transfer <user> <amount>`: will attempt to transfer the specified amount of coin from the viewer's account to the specified user
- `!tts <text>`: will attempt to redem a text to speech message for a certain amount of coin. Maximum tts length and cooldown can be adjusted by the broadcaster, limit scales with level
- `!sound <name>`: will play a sound
- `!sounds | !sound list`: will display available sounds
- `!slots [amount|'all']` alias `!slotsx [amount|'all']`: will withdraw the amount entered into the slot machine and make as many rolls as are possible with the inputed amount. Winnings are aggregated and displayed. Upon optaining a jackpot, a sound is played and a reward issued. A basic jackpot condition is met when three equal symbols align in a single roll, a super jackpot only takes place if three special symbols are rolled, per default the peach. `!slotsx` will display different symbols, take more money but also play an additional winning sound. There is an additional super rare jackpot which's symbol can be set to an emote or anything. With a very low propability (by default 1/71) a slot gets overwritten with said symbol during a roll. If all three slots appear to be overwritten a golden jackpot takes place. It will trigger a special sound, event aswell as reward.
- `!anthem <name>`: will set an anthem
- `!anthems | !anthem list`: will list all avaibale anthems
- `!fight`: will fight in the pirate hijack even
- `!burn <amount>`: will burn given amount of captains coin
- `!anthem <name>`: will set an anthem
- `!lvl | !xp | !level`: will show level progress
- `!top | !ranking | !top10 | !levels`: will show furthes progressed viewers (xp)


## Commands: As a broadcaster / admin
Additional commands available to people specified in `PRIV_STREAMER` and sometimes `PRIV_SUPPORT` are
- `!silent` alias `!silence`: will toggle a silent mode, disabling all sounds and tts
- `!givecc <name> <amount>`: will add the specified amount of Captain's Coin to the appointed user's balance
- `!volume <gain multiplier percentage> / !volume <file name> <gain multiplier percentage> / !volume`: will either set a global gain multiplayer for sound effects (excluding tts) or a specific one to the mp3 file mentioned. Values input have to be positive (including 0) numbers. Executing the command without any arguments will display the current global gain multiplier
- `!config .....`
- `!death [amount]`: Will increase the deathcounter, optionaly by a specified amount. Death counts are saved into txt files which's names are specified in `FILENAME_DEATH_COUNTER`. `PRIV_MOD_0` and `PRIV_MOD_1` are also be priviliged to use this command.
- `!brause [amount]`: Will increase the brause counter, optionaly by a specified amount. Brause consumption counts are saved into txt files which's names are specified in `FILENAME_BRAUSE_COUNTER`. `PRIV_MOD_0` and `PRIV_MOD_1` are also be priviliged to use this command.
- `!forceplay <item name>`: will instantly play the specified sound/anthem
- `!challenge <hunt|global> <text>`: will add a challenge to the saved challenges, randomly printed when the challenge reward is used. There are two categorys: hunt and global challenges. Global challenges usage is not implemented as of 4-4.22.
- `!config <variable> [value]`: will set a certain config value. See available config values below. Not specifying a value will print the current variable value.
- `!stop | !stoptts`: will stop the current tts message

## Available config variables for deep customization
- `tts_limit`, number, default `60`: Maximum amount of character allowed to be used in a text to speech message
- `tutorial_cooldown`, number, default `300`: Duration of seconds to pass until the tutorial command may be used again
- `mastervolume`, number, default `80`: Master volume gain multiplier in percentage. Managed via `!volume`
- `volume`, array, default `[]`: Volume gain multiplier for specific files. Managed via `!volume` 
- `lurk_reward_amount`, number, default `30`: Amount of coins issued per `!lurk` command
- `lurk_reward_cooldown`, number, default `360`: Amount of seconds to pass until a new `!lurk` reward can be issued for the same person
- `cc_initial`, number, default `50`: Amount of coin a new viewer start with 
- `cc_cost_slots`, number, default `5`: Cost for a single default slot roll
- `cc_cost_slotsx`, number, default `8`: Cost for a single special slot roll
- `cc_slots_max_in`, number, default `100`: Maximum amount of coins to slot with at once
- `cc_cost_tts`, number, default `60`: Cost for a TTS message
- `cc_return_slots_basic`, number, default `250`: Amount of coins, rewarded for rolling a basic jackpot
- `cc_return_slots_peach`, number, default `1000`: Amount of coins, rewarded for rolling a super jackpot
- `cc_return_slots_golden`, number, default `10000`: Amount of coins, rewarded for rolling a golden jackpot
- `cc_per_chat`, number, default `1`: Amount of coins, rewarded for a single non command chat message per viewer
- `msg_welcome`, string, default `Ahoy, Matey! ⛵ Welcome aboard `: Chat message a new chatter will be greeted by if he visits the channel the first time. The username will be appended to the message.
- `msg_lurk_0`, string, default `Thank you for boarding the ship `: Chat message that will be displayed upon `!lurk`. The username will be appended between `msg_lurk_0` and `msg_lurk_1`
- `msg_lurk_1`, string, default `⛵ Lay back and enjoy your drink <3`: Chat message that will be displayed upon `!lurk`. The username will be appended between `msg_lurk_0` and `msg_lurk_1`
- `death_cnt_prefix`, string, default `DEATHS: `: Prefix of the death count message, writen to the deathcount file
- `brause_cnt_prefix`, string, default `BRAUSE: `: Prefix of the brause count message, writen to the brause count file
- `golden_emote`, string, default `captai1955Golden`: String to be used to display a golden slot
- `rand_golden`, number, default `71`: Propability to get a slot overwritten with a golden symbol, the lower the value the more likely the golden win
- `gold_status_duration`, number, default `2592000000`: Duration of gold status (after wining the golden jackpot) in milliseconds, default is one month
- `cc_sound_cost_multiplier`, number, default `10`: Price multiplier for purchasing instant sound effects
- `cc_anthem_cost_multiplier`, number, default `100`: Price multiplier for purchasing anthems (repeating sounds)
- `compact_jackpots`, number, default `1`:  Wether slot jackpots should be summarized instead of a disting jackpot message for all of them (0 = detailed, 1 = compressed)
- `brause_cnt_prefix`, number, default `600`:
- `death_cnt_prefix`, number, default `600`:
- `max_lvl_reward`, number, default `100`:
- `xp_factor_subsciber`, float, default `1.5`:
- `xp_base`, number, default `1.5`:
- `xp_added_per_lvl`, number, default `600`:
- `xp_per_char`, number, default `600`:
- `xp_per_captain_emote`, number, default `600`:
- `xp_per_slot_cmd`, number, default `600`:
- `xp_per_slot_win`, number, default `600`:
- `xp_per_reward`, number, default `600`:
- `xp_per_lurk`, number, default `600`:
- `xp_per_pirate_fight`, number, default `600`:
- `xp_on_pirate_win`, number, default `600`:
- `min_lvl_sound`, number, default `600`:
- `min_lvl_slotsx`, number, default `600`:
- `min_lvl_anthems`, number, default `600`:
- `max_lvl_anthems`, number, default `600`:
- `min_lvl_golden_chance_1`, number, default `600`:
- `min_lvl_golden_chance_2`, number, default `600`:
- `min_lvl_tts`, number, default `600`:
- `max_lvl_tts_scaling`, number, default `600`:
- `slot_rolls_per_lvl`, number, default `600`:
- `max_lvl_slot_scaling`, number, default `600`:
- `slot_rolls_added_last_lvls`, number, default `600`:
- `lvl_per_emblem`, number, default `600`:
- `cc_per_lvl`, number, default `600`:
- `tts_chars_per_lvl`, number, default `600`:
- `min_delay_broadcast`, number, default `600`:
- `max_delay_broadcast`, number, default `600`:
- `pirate_loss_factor`, number, default `600`:
- `pirate_min_win`, number, default `600`:
- `pirate_max_win`, number, default `600`:

















