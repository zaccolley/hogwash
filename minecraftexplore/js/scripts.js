function phraseChange(){

	var rText =['.party()!',
				'0% sugar!',
				'100% pure!',
				'110813!',
				'12 herbs and spices!',
				'12345 is a bad password!',
				'150 bpm for 400000 minutes!',
				'150% hyperbole!',
				'20 GOTO 10!',
				'4815162342 lines of code!',
				'90% bug free!',
				'90210!',
				'A skeleton popped out!',
				'Absolutely no memes!',
				'Afraid of the big, black bat!',
				'Age of Wonders is better!',
				'All inclusive!',
				'All is full of love!',
				'Almost java 6!',
				'"Almost never" is an interesting concept!',
				'Also try Braid!',
				'Also try Limbo!',
				'Also try Mount And Blade!',
				'Also try Pixeljunk Shooter!',
				'Also try Project Zomboid!',
				'Also try Super Meat Boy!',
				'Also try Terraria!',
				'Also try VVVVVV!',
				'Also try World of Goo!',
				'A riddle, wrapped in a mystery!',
				'As seen on TV!',
				'Ask your doctor!',
				'"Autological" is!',
				'Autonomous!',
				'Awesome community!',
				'Awesome!',
				'Bees, bees, bees, bees!',
				'Bekarton guards the gate',
				'Best in class!',
				'Better than Prey!',
				'Big Pointy Teeth!',
				'Bigger than a bread box!',
				'Boots with the fur!',
				'Bread is pain!',
				'Bring it on!',
				'Bring me Ray Cokes!',
				'Bringing home the bacon!',
				'BTAF used to be good!',
				'Buckets of lava!',
				'Call your mother!',
				'Casual gaming!',
				'Ceci n\'est pas une title screen!',
				'Check it out!',
				'Check out the far lands!',
				'Child\'s play!',
				'Classy!',
				'Closed source!',
				'Cloud computing!',
				'Cogito ergo sum!',
				'Collaborate and listen!',
				'Colormatic',
				'Complex cellular automata!',
				'Consummate V\'s!',
				'Conventional!',
				'Cooler than Spock!',
				'Cow Tools!',
				'Create!',
				'Cześć Polska!',
				'Déjà vu!',
				'Déjà vu!',
				'Do not distribute!',
				'Does barrel rolls!',
				'Doesn\'t avoid double negatives!',
				'Doesn\'t use the U-word!',
				'Don\'t bother with the clones!',
				'Don\'t feed avocados to parrots!',
				'Don\'t look directly at the bugs!',
				'Double buffered!',
				'Down with O.P.P.!',
				'DRR! DRR! DRR!',
				'Dungeon!',
				'DungeonQuest is unfair!',
				'Engage!',
				'Enhanced!',
				'Eple (original edit)!',
				'Euclidian!',
				'Excitement!',
				'Exclusive!',
				'Exploding creepers!',
				'Falling off cliffs!',
				'Fan fiction!',
				'Fantasy!',
				'Fat free!',
				'Feature packed!',
				'Finally complete!',
				'Finally with ladders!',
				'Finger-licking!',
				'Flashing letters!',
				'Flaxkikare!',
				'Fnord!',
				'Follow the train, CJ!',
				'Freaky!',
				'Free dental!',
				'From the streets of Södermalm!',
				'Full of stars!',
				'Funk soul brother!',
				'FUNKY LOL',
				'Gargamel plays it!',
				'Gasp!',
				'Ghoughpteighbteau tchoghs!',
				'Give us Gordon!',
				'Google anlyticsed!',
				'Got your nose!',
				'GOTY!',
				'Guaranteed!',
				'Haha, LOL!',
				'Haley loves Elan!',
				'Hampsterdance!',
				'Han shot first!',
				'Hard to label!',
				'Has an ending!',
				'Haunted!',
				'Heaps of hits on YouTube!',
				'Helo Cymru!',
				'Herregud!',
				'Hobo humping slobo babe!',
				'Holy cow, man!',
				'Homeomorphic to a 3-sphere!',
				'Hot tamale, hot hot tamale!',
				'Hotter than the sun!',
				'Huge tracts of land!',
				'HURNERJSGER?',
				'I have a suggestion.',
				'I miss ADOM!',
				'I see your vocabulary has improved!',
				'idspispopd!',
				'if not ok then return end',
				'Indev!',
				'Indie!',
				'Information wants to be free!',
				'Ingots!',
				'Inspirational!',
				'Internet enabled!',
				'It\'s a game!',
				'It\'s finished!',
				'It\'s groundbreaking!',
				'It\'s here!',
				'Jag känner en bot!',
				'Jason! Jason! Jason!',
				'Jeb has amazing hair!',
				'Joel is neat!',
				'Jump up, jump up, and get down!',
				'Kaaneeeedaaaa!',
				'Keyboard compatible!',
				'Khaaaaaaaaan!',
				'Kick it root down!',
				'Kind of dragon free!',
				'Kinda like Lemmings!',
				'Kiss the sky!',
				'l33t!',
				'Larger than Earth!',
				'Legal in Finland!',
				'Lennart lennart = new Lennart();',
				'Less addictive than TV Tropes!',
				'Let our battle\'s begin!',
				'Let\'s danec!',
				'Leveraging synergy!',
				'Lewd with two dudes with food!',
				'Limited edition!',
				'Lives in a pineapple under the sea!',
				'Livestreamed!',
				'Lots of truthiness!',
				'Loved by millions!',
				'Macroscopic!',
				'Made by Jeb!',
				'Made by Notch!',
				'Made in Sweden!',
				'MAP11 has two names!',
				'Matt Damon!',
				'May contain nuts!',
				'Meeting expectations!',
				'Menger sponge!',
				'Millions of peaches!',
				'Minecraft!',
				'Minors welcome!',
				'Mmmph, mmph!',
				'Monster infighting!',
				'More addictive than lemonade!',
				'More polygons!',
				'More than 500 sold!',
				'Music by C418!',
				'My life for Aiur!',
				'Never dig down!',
				'Nice to meet you!',
				'Not linear!',
				'Not on steam!',
				'Notch <3 ez!',
				'Now in 3D!',
				'Now supports åäö!',
				'Now with difficulty!',
				'Now with extra hugs!',
				'NP is not in P!',
				'Octagonal!',
				'Oh man!',
				'Oh, ok, Pigmen!',
				'OICU812!',
				'Omnipotent!',
				'One of a kind!',
				'OpenGL 1.2!',
				'PC gaming since 1873!',
				'Peter Griffin!',
				'Phobos anomaly!',
				'Pixels!',
				'Place ALL the blocks!',
				'Play him off, keyboard cat!',
				'Play Minecraft, Watch Topgear, Get Pig!',
				'Played by cowboys!',
				'Plz reply to my tweet!',
				'Pneumatic!',
				'Polynomial!',
				'Pretty!',
				'Pretty scary!',
				'Pumpa kungen!',
				'Pumpkinhead!',
				'Punching wood!',
				'Put that cookie down!',
				'Random splash!',
				'Read more books!',
				'Reference implementation!',
				'Regional resources!',
				'Representing Edsbyn!',
				'Reticulating splines!',
				'Ride the pig!',
				'Rita is the new top dog!',
				'Scary!',
				'Scientific!',
				'See you next Friday or so!',
				'Seecret Friday update!',
				'Sensational!',
				'Sexy!',
				'Singleplayer!',
				'Slow acting portals!',
				'So fresh, so clean!',
				'SOPA means LOSER in Swedish!',
				'Spiders everywhere!',
				'sqrt(-1) love you!',
				'Stay a while, stay forever!',
				'Stay a while and listen!',
				'Stop, hammertime!',
				'Sublime!',
				'Supercalifragilisticexpialidocious!',
				'Survive!',
				'Switches and ores!',
				'SWM forever!',
				'Swords for everyone!',
				'Synecdoche!',
				'Take frequent breaks!',
				'Take her pillow!',
				'Technically good!',
				'Technologic!',
				'Teetsuuuuoooo!',
				'Tell your friends!',
				'Terrestrial!',
				'Testificates!',
				'That\'s no moon!',
				'That\'s super!',
				'The bee\'s knees!',
				'The creeper is a spy!',
				'The sky is the limit!',
				'The sum of its parts!',
				'The Work of Notch!',
				'Thematic!',
				'This is my true form!',
				'This message will never appear on the splash screen, isn\'t that weird?',
				'This text is hard to read if you play the game at the default resolution, but at 1080p it\'s fine!',
				'Thousands of colors!',
				'Tip your waiter!',
				'Totally forgot about Dre!',
				'Treatment for your rash!',
				'Try it!',
				'Try the mushroom stew!',
				'Try the Nether!',
				'Twittered about!',
				'Turing complete!',
				'Tyrion would love it!',
				'Ultimate edition!',
				'umop-apisdn!',
				'Undefeated!',
				'Undocumented!',
				'Une baguette!',
				'Uninflammable!',
				'Uses LWJGL!',
				'Verlet intregration!',
				'Very fun!',
				'Vote for net neutrality!',
				'Water proof!',
				'Welcome to your Doom!',
				'What\'s up, Doc?',
				'Who put it there?',
				'Whoa, dude!',
				'Woah.',
				'Woo, /v/!',
				'Woo, facepunch!',
				'Woo, minecraftforum!',
				'Woo, reddit!',
				'Woo, 2pp!',
				'Woo, somethingawful!',
				'Woo, tigsource!',
				'Woo, worldofminecraft!',
				'Wow!',
				'Yaaay!',
				'Yes, sir!',
				'You can\'t explain that!',
				'You\'ve got a brand new key!'];

	        var randNo = Math.floor(rText.length*Math.random());
	        
	        var ytt = document.getElementById('yellowtextthing');

	        ytt.innerHTML = rText[randNo];
}
