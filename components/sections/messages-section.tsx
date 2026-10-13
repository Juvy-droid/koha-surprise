"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Play,
  Pause,
  Image as ImageIcon,
  X,
  Video,
} from "lucide-react";
import { useState, useRef } from "react";

interface Message {
  id: number;
  name: string;
  avatar: string;
  message: string;
  audio?: string;
  image?: string;
  video?: string;
}

const messages: Message[] = [
  {
    id: 1,
    name: "KOHA",
    image:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1495944027688800356/Congrat_s_SOAPDAX.png?ex=69e8beb1&is=69e76d31&hm=d74d7777ecd9d09b61a000813e568fe660f4ef358a26aef1c4220bcb71c24a73&animated=true",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1495944228449161226/Commission4.png?ex=69e81621&is=69e6c4a1&hm=fdb06b3dbf4acc881bec5e29b8de0f86ad347c5610211a2a68bf4fd6a1e5beea&animated=true",
    message:
      "Heyy Soapdax, Congrats to ur Affliate Anniversary! You came a very long way and u did amazing! Im happy we met almost 3 years ! You are a wonderful person , its alway fun to play with you or watch you stream. I love ur vibe and energy and its hard to find people like you online hehehehe! Im very excited to see the rest of ur journey. Much love Koohaaruuu!! smirk!",
  },
  {
    id: 2,
    name: "KISARO",
    avatar:
      "https://images-ext-1.discordapp.net/external/7uKL8KRNxOEC6o1elRvoH3RjGrzFtg1JXD1oz2Ec_QA/%3Fsize%3D256/https/cdn.discordapp.com/avatars/192442480661102592/ab9b3f65bd80eea3201242a0ccc56e73.png?format=webp&quality=lossless",
    message:
      "HAPPY AFFILIATE ANNIVERSARY SOAPDAXINGTON!!!! I just want to say keep up the good work and that I am honored to be a part of such a great community. I may not be there often (darn time zones) but I genuinely always wish you the best! I know I have only been here for about a year-ish but you're honestly doing great things and only going up from here surely. Much love! -Kisaro",
  },
  {
    id: 3,
    name: "JUVY",
    avatar:
      "https://images-ext-1.discordapp.net/external/g0jeZjGLOKPLhUvNPegLivf3uwv4vkgtczuy7BTz5k4/%3Fsize%3D256/https/cdn.discordapp.com/avatars/446586744998068224/885816b6d672fa2bc5336622e7fd969e.png?format=webp&quality=lossless",
    message:
      "Hi soapdax, happy affiliate anniversary!! I think we know each other for like 2 years now. And I'm glad to have joined your muck stream with your sister. We have shared a lot of fun memories, especially in Rotterdam! (I miss it ;w;) Thank you for being my friend and to many more years of being friends! I will see you IRL in november again. Can't wait!!!!",
  },
  {
    id: 4,
    name: "JUNY",
    avatar:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1495975061012873367/Soap.png?ex=69e832d8&is=69e6e158&hm=4569fdd742d2575122d5f790fb96fcea5e6123026338e58d060237f4a9589d82&animated=true",
    message:
      "Happy Affiliate! I'm happy to have been apart of this community. From our first collab on a raft. Unbelievable how long its been. I want to see you reach partner one day. Keep it up",
  },
  {
    id: 5,
    name: "BlueDeathMage",
    avatar:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1495920986443350108/329172245_1242213749984825_2695362268266509587_n.jpg?ex=69e8007c&is=69e6aefc&hm=e167e1a6fa459cb7d5cedc8d0eb37eb833baa21d2d0ddd4762762a8d883d4bae&animated=true",
    message:
      "Happy Affiliate Anniversary! I know I haven't been the most active but I still wanted to celebrate with you guys. It's been amazing seeing you and your community grow over the years and I'm thankful that I have been part of it. You've done so many things over the past few years and I'm sure that you will continue to push yourself to greater heights. Thank you for letting us witness your journey and I hope you have a wonderful anniversary,",
  },
  {
    id: 6,
    name: "CREAMEDBAGEL",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1495913061662457956/silentbageltransparent_-_Copy.png?ex=69e7f91a&is=69e6a79a&hm=8aaba75bfd8bae85716aa9bb6951acd7de42881e28a131e925de964fea3a6395&animated=true",
    message:
      "Happy Affiliate Anniversary Soapdax! Congrats on everything you achieved this past year and thank you for everything! Here are a few words and phrases that remind me of what I enjoyed about stream and the community: apex, filipino, rhythm games, singer, 04 GANG, her friends are kinda funny, her friends are kinda scary, I wish I was ephy's keypad, puzzle, im so excited to sleep for 3 hours and then join an apex tourney, erika may elminate me if i choose a song in pjsk, british, filipino, banger cover fr, what did the pizza do, thats a cute dog",
  },
  {
    id: 7,
    name: "MCFLURRY",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1495912171672961224/a73eb45ccffaacdba8dcf89869495730.webp?ex=69e7f846&is=69e6a6c6&hm=4742512cdfa60818e6cd284211d89a9a9c18d17ee87b064c033ecdfb92ee0a55&animated=true",
    message:
      "Hey Soap, It's honestly been amazing seeing how far you've come, from scuffed Valorant streams with a handful of us hanging out to building a whole community on Twitch and Discord. It's crazy to see how far you've come and I'm still supporting you even if I'm a little quiet. Thanks for trusting me (forcing me to become a cleaning product) and I'm super excited to see where you end up. Really glad to have seen part of the journey, hope this next chapter is even bigger. Happy affiliate anniversary! mcflurry/Mr Clean",
  },
  {
    id: 8,
    name: "MARTY",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1495907995480100966/20260401_143335.jpg?ex=69e7f462&is=69e6a2e2&hm=a94b3b325a0eea317cca1011c11c4bc0f10bf9e7564847bbbb35afcdcc798b70&animated=true&width=1342&height=1789",
    message: "Hello soap",
  },
  {
    id: 9,
    name: "AMROTH",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1495904793145905262/DarkBlu.png?ex=69e7f167&is=69e69fe7&hm=848ec1db0d31c9d3c3f360af76b3b01435cb3a0cc63b928ec48469ffb35557b7&animated=true&width=1549&height=1549",
    message:
      "Happy Affiliate Anniversary! Life has pulled me in a few directions lately, between work and chasing photos, so I haven't been around as much as I'd like. But even from a distance, I've been rooting for you. The fact that you've kept going, kept building, and reached this milestone says everything about the kind of creator you are. I am proud to be part of your community, even when I'm quiet in the void. Cheers, for the next chapter to be captured in time! ~Amroth (LudvigK)",
  },
  {
    id: 10,
    name: "NOAH",
    avatar:
      "https://i.pinimg.com/474x/9c/0c/76/9c0c764aa9649ee19fa67e9d6d0f7a48.jpg",
    message:
      "ive thought long and hard but theres nothing i could do or say to express how much ive loved being a part of the community and how much i appreciate what ive been through",
  },
  {
    id: 11,
    name: "TheEnglishFolk",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "CONGRATS ON A YEAR OF AFFILIATE SOAP!!!!!! There is no stream I'd rather tune into and lurk occasionally while chilling after a long day! Here's to another year with your amazing community and one of the STINKEST streamer ik (even despite the name you'd think you'd be less stinky)!",
  },
  {
    id: 12,
    name: "ANDY",
    image:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1495874638230720804/image0.jpg?ex=69e87e11&is=69e72c91&hm=679ab065d0ed2cc76483dd01751f111e69440508c8af9fefb671646c3cd39aac&animated=true",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "Heyyyyyy soap Congrats on the affiliate anniversary!!! I don't have anything to celebrate with you right now but, I'm sure there are only many memories and plans to come in the future. I hope the streams are doing you good and I look forward to seeing you on the next stream or whenever I can get on! From the anderdingus",
  },
  {
    id: 13,
    name: "TOKA",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "CONGRATS ON UR AFFILIATE ANNIVERSARY SOAPDAX!!! Thanku for building such an amazing community and being THE BEST streamer on the internet! You are genuinely one of the most entertaining streamers out there and never fail to put a smile on my face. I look forward to another amazing year with u as my OSHI (kill me). NEVER SAY U ARE GRADUATING I WILL FIND U!!!! LOVES U SOAPDAX <33333",
  },
  {
    id: 14,
    name: "CRAVY",
    image:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1495870758285476003/Screenshot_2025-08-01_003744.png?ex=69e87a74&is=69e728f4&hm=aabeb37f842e022eceb298e6829ccea839ec0991f8988bc34debe6c36c9bcf31&animated=true",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1496180803590426806/IMG_0063.png?ex=69e8f275&is=69e7a0f5&hm=7318a19bbc770df0219eaf34011c5e67e07fd8439ae030b14d4394a6afee546a&animated=true",
    message:
      "Dear Soapdax, congratulations on the Affliate Anniversary!!! oh gosh time really flew by aha.. anyways I remember when you were just a little girl and I took you under my wing, made you into what you are today.. strong, independent, gay. I remember the first day I groomed you infact, it was so lovely seeing you grow in my basement all these years but as a reward for all your hard work I have decided to free you from my basement and let you roam the streets all alone.. goodjob Soapdax may your future be just as good to you as my basement has. Amen",
  },
  {
    id: 15,
    name: "Fumimi",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message: "アフィリエイト記念おめでとう！ 無理せず自分のペースで楽しんでね♪. Congratulations on joining the affiliate program! Take it easy and enjoy it at your own pace♪",
  },
  {
    id: 16,
    name: "CODEDELEMENT",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "Hi Soap. It's crazy that it's been over three years since we met and you're now celebrating 3 years of being an affiliate. I've seen your channel grow from all the hard work you've put in and I'm so happy to have witnessed you go through your ups and downs, steadily growing both as a streamer and a person. Girl you used to be so shy to do anything new and now look at you! You've even done a face reveal! Congratulations on everything Soap. Not just the anniversary but the whole process that you went through to get where you are right now. While I do sometimes miss the long conversations we'd have in your chat since I'd be the only one there, I love that you now have a community that's always there for you, appreciates you, and supports you wholeheartedly. Alright now all that's outta the way pls gimme my Ubel cosplay with matching armpit poses. Thanks",
  },
  {
    id: 17,
    name: "LevVimi",
    image:
      "https://media.discordapp.net/attachments/1495832983859368037/1496012933069668482/soapp.png?ex=69e8561d&is=69e7049d&hm=50e0c455aac981d2c4e1e33cd3e67ff45592b20471606ed1295cb644a8d22d52&animated=true",
    avatar:
      "https://cdn.discordapp.com/attachments/1495832983859368037/1495944424902103131/Cry1.png?ex=69e81650&is=69e6c4d0&hm=c415a30897fa98aa8986f0af21918b601302077e7815449c8edd4a43d00a3c47&animated=true",
    message:
      "Hello Soap! HAPPY AFFILIATE ANNIVERSARYY! Hoping you have a great time on this special day! I'm glad I get to met you from lomi during the magma collab before! It was also my first time doing magma that time which was really a fun experience joining y'all! And the song covers you produce IS SO GOODDD! LOVE IT! Hoping this day become really fun day for you and everyone! Thank you Soap and happy affiliate anniversary!",
  },
  {
    id: 18,
    name: "Lily",
    avatar:
      "https://cdn.discordapp.com/attachments/1475541760599003208/1496031567598977154/image-1.png?ex=69e86778&is=69e715f8&hm=6011b1c2182e2e85b3f07996d4147ddf1d278927e7b775394bfc67af704f305d&animated=true",
    message:
      "Happy anniversary Soap! It's been so wonderful to see you gain confidence in just the time I've been a part of your community. It's always a lovely time talking with you and those around you. Thank you for having cultivated a community of so many lovely entertaining people. You have done an amazing thing <3.",
  },
  {
    id: 19,
    name: "Kochiii",
    avatar:
      "https://media.discordapp.net/attachments/1495838290652168382/1495908451178778684/IMG_2351.png?ex=69e7f4cf&is=69e6a34f&hm=b7b51a93600ef5f2219fd533c17ba93a4d479e7ac3d45fac7c376b1b12bc336f&animated=true",
    message:
      "HI SOAPPP, Happy Affiliate Anniversary! You're genuinely such a sweet and entertaining person every time i come into your chat, its been nothing but a pleasure to watch you and chat to you!! it was crazy meeting you in that random Valorant swiftplay and now we just come into eachothers chat from time to time!! VERY PROUD OF YOU AND HOW FAR YOUVE COME !! - from Kochiii da Frog :3",
  },
  {
    id: 20,
    name: "Lomi",
    avatar:
      "https://i.redd.it/these-stupid-ass-hamster-that-i-keep-seeing-on-tiktok-v0-2p47szoq84yf1.jpg?width=1320&format=pjpg&auto=webp&s=6319845ee39b769d5486163ac624deb13c0415d3",
    message:
      "heyaaa soapp!! Happy Affiliate Anniversarry! Congrats on getting this far in your streaming journey! I know you're very passionate about streaming so I'm very proud on where you are, although our time knowing each other isn't that long, I still am glad that I got to know you gang Cheers to more streaming and our friendship gang! keep up the good work homie :DD much love ! -lomi",
  },
  {
    id: 21,
    name: "Gilnic",
    audio: "audio/gilnic.m4a",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "Hey husband! Still can't believe you managed to lose your one ok rock shirt... Ok now that you've caught a random stray time for the real message; Thanks for a year of fun streams, even though my attendance has been lacking lately due to real life keeping me busy I'm still rooting for you, and am glad you're still going strong. Who'd have thought the random e-girl i bullied in some japanese dudes stream would turn out to be one of my favourite streamers, as well as among my most watched streams of the year? Youve done great this past year, keep up the great work, Love, your wife GilNic.",
  },
  {
    id: 22,
    name: "KarmaNMG",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "Hi Soap! Happy Affiliate Anniversary! Thank you for providing everyone with many hours of amazing content. Your streams helped our boredom by giving us professional level gameplay and funny moments to watch. I might not be able to catch your stream much with how busy stuff can get but I know that whenever I am able to tune in and watch your streams that I will have a lot of fun and enjoy my time watching your content. I wish that you keep enjoying streaming and keep everyone in chat excited to get your stream start notifications. Love the cozy community you have built up and the many amazing hours of entertainment you gave to us! Keep up the cool stuff you do You're a wonderful person to hang out with and the best smooth brain vtuber to watch. We all appreciate your dedication and work that you put to keep us addicted and watching your streams. If I cannot catch the stream live because of exam prep let me still wish you to have an amazing rest of your stream. -Karma",
  },
  {
    id: 23,
    name: "Giiwuu",
    avatar:
      "https://www.shutterstock.com/image-photo/portrait-dog-wearing-headphones-600nw-2415938633.jpg",
    message:
      "Wsggg soap, yo third leg steward here.. idk how I stumbled into your stream but I'm glad I did.. your stream was actually the first time I enjoyed chatting, you built a very fun community! Happy affiliate anniversary and to many more! Shoutout Bruno and Snorlax, W goats..",
  },
  {
    id: 24,
    name: "Asura",
    avatar:
      "https://t3.ftcdn.net/jpg/02/74/25/68/360_F_274256881_WSeCn3Iw8yFIU8T6z71aDjXHfAdtc5iy.jpg",
    message:
      "alloooo soap crazy how long I've been seeing you streaming for now, keep it up and don't stop working hard o7 look forward to seeing and hanging out a lot more in the future years ^^",
  },
  {
    id: 25,
    name: "Vakie",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "Happy Affiliate Anniversary!!! Congrats on everything you've achieved it's honestly so cool to see how far you've come. Thank you for all the fun streams and the great vibes you always bring. I can't wait to see what you get up to next",
  },
  {
    id: 26,
    name: "Okami",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message:
      "Happy Anniversary Soap MY GOAT! it has been my pleasure meeting you and interacting with you, you have been nothing but kind to me and thank you for that ^^ still remember the time when we drew in your magma stream and that was my first impression of you and you to me, couldn't ever replace such a fun core memory! I hope that your Anniversary will bring you more motivation towards more streams and more engagement with your community, YOU ARE DOING SO WELL, keep holding on to that community for as long as you could because you have one strong bond with yours. HAPPY ANNIVERSARY AND HAVE A GREAT DAY GOAT!",
  },
  {
    id: 27,
    name: "GonzoGonzo",
    avatar:
      "https://cdn.discordapp.com/attachments/1495841457297162444/1496008767119167558/GONZO_thumbs_up.png?ex=69e8523c&is=69e700bc&hm=059dc2c4aa5405dbb395e0b58be5984e6088046f2ddc1eedc11ec3b6de92e274",
    message:
      "Hey Soap! Happy Twitch Affiliate Anniversary! It's been awesome watching you grow, build your community, and stay consistent with what you love. You've created such a fun and welcoming space for others to be a part of! Here's to even more success, great streams, and unforgettable moments ahead!",
  },
  {
    id: 28,
    name: "Bizcui",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message: "",
    audio: "/audio/bizcui.mp3",
  },
  {
    id: 29,
    name: "Binbon",
    avatar:
      "https://preview.redd.it/idk-theres-something-peaceful-about-dogs-with-headphones-v0-nan8chdvexae1.jpg?width=500&format=pjpg&auto=webp&s=4953f30a44d1bc41865f2ac7e1c15c9d2b02154b",
    message: "",
    video: "/clips/binbon.mp4",
  },
  {
    id: 30,
    name: "Katz",
    avatar:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/7bef2b7e-dff4-420c-8ea0-afbe3f800cf9-profile_image-300x300.png",
    message: "",
    video: "/clips/katz.mp4",
  },
  {
    id: 31,
    name: "Kaitou",
    avatar:
      "https://cdn.discordapp.com/attachments/1447646549277675603/1496117018393579591/ca6889c01563e181.jpg?ex=69e8b70d&is=69e7658d&hm=ff583eec7deb151f5b0108c503d886e8f7a850866ebbada8df62ea53d4576eac&animated=true",
    message:
      "Happy Streaming Anniversary!! 🎉 3 years!? Sheeeesh! I may not have been there for your entire journey, but from what Ive seen, its clear youve been doing incredibly well and growing so much in your career. I'm usually just lurking and listening in the background during your streams Im too shy to type, sorry 😭, but your stream is honestly one of the few places where I feel comfortable enough to even send a message in chat. Your streams are so chill, and I enjoy being there even though I dont even play the games you stream xdd Wishing you continued success in everything youre pursuing, your streaming, your singing career, and as a teacher (give me free mentoring when you succeed I CANT SIGHT READ! 😆). You truly deserve it, and Im excited to see how far youll go from here! ps. dont forget us when you get famous hehe!",
  },
  {
    id: 32,
    name: "Twin",
    avatar:
      "https://cdn.discordapp.com/attachments/1465132600602657034/1496027715369697300/png.png?ex=69e863e2&is=69e71262&hm=89c1df6dfd5c781c469e6282a0910657a6779514e66db5aff354977f5f48ccc6&animated=true",
    message:
      "To SabonDax, Its always a treat showing up on stream, Watching, talking, chilling while you win an Apex match, clutch in Valorant or even taking your eye exams in Osu. I hope that you continue what you love to do both on and off stream. And heres to another year with you and the community you built.",
  },
  {
    id: 33,
    name: "Big P",
    avatar:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1496069133090033775/hapy.avif?ex=69e88a74&is=69e738f4&hm=11e39adc34c6fd3400e4193943dc7d6963599bae473fe5d791eed0f57c340114&animated=true",
    message:
      "Hello big Soapdax. I am a man of many names. Pingpoo is what I've been called most of my time here. I first watched your stream a year ago and quickly started interacting with this community, making my first really good online friends, Ephy and Mario el Chavo. Since then I have had the honour to properly get to know you and this community and I am proud to call you all my friends. Nowadays I go by many names. Mr. Poo, Big P, Chefpoo, Sexypoo(real). These are all names invented (and ruined) by the precious friends that I have made here. You, The Dax, have created something truly special that I will forever treasure. My time spent here has had me feeling happier than ever and I will be forever grateful to you. These feelings will probably never change, even if you become bald.  \nThank you for still doing this after three whole years because your persistence is what birthed the Soapdaxverse. \nMuch love and many thanks, \nBig P",
  },
  {
    id: 34,
    name: "Dylan",
    avatar:
      "https://i.pinimg.com/236x/5d/ce/35/5dce35d88b3f39374a894ddeae658916.jpg",
    message:
      "It is awesome seeing how far you have come over the years, you have done such an amazing job streaming so consistently and entertaining us all all the time with your wholesome and happy personality. So proud of you and proud to say that you are my favourite streamer and a great friend too. I hope you continue to grow and enjoy doing this and getting the support from all the cool people in chat. Keep it up :) Dylan <3",
  },
  {
    id: 35,
    name: "Peepers",
    avatar:
      "https://media.discordapp.net/attachments/1414033172953432135/1496069329425272936/IMG_4434.jpg?ex=69e88aa3&is=69e73923&hm=551c8cd63c7ee736cb1cfc8346b2426f38da5d33a9085e3279ec7b4c454b767f&animated=true",
    message:
      "Happy Affiliate Anniversary, Sophia! Even when I'm not around much, I still check in from time to time, and it's always really cool seeing the time, effort, and consistency you've put into your channel—building something like that doesn't happen overnight. You've created a space people genuinely enjoy being part of, and that says a lot. I'm really proud of how far you've come, and I hope you keep growing—excited to see where the journey will take you next! -Peepers",
  },
  {
    id: 36,
    name: "Kaos",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQKrIlLOcx_kngBF1h7iRCgaek-nH-tiaAA&s",
    message:
      "Sophia soapdax you are a goated streamer, thank you for all the amazing streams you’ve done this year and congrats on all you’ve achieved, im very grateful for our friendship and the friends ive made because of ur existence, you will always be my goat and someone im forever grateful i dont know where i would be without joining that server on that random night its kinda crazy to think about that our friendship has come so far just from that, meeting you in london then the rotterdam trip then manchester some of the best days and nights of my life, hope you have another good year broski much love",
  },
  {
    id: 37,
    name: "Shiddies",
    avatar:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1496069480311160923/Wintershiddiesmuteidle.gif?ex=69e88ac7&is=69e73947&hm=0847203d8722f040bdbc0acdc033c0cd54eb86399a4093a93bbb90604130de45&animated=true",
    message:
      "OKAY, sorry my shit got busy 😅 But let's see, Soap, Wild year buds. I'm glad I got to be there for some of those big milestones! The subathons, the Apex tourneys, the face reveal, graduation from uni, karaoke with Erika, and so many more events! The list can go on forever. We got the opportunity to watch you frick this year up and develop! It's been fun watching you this past year; excited to see what this next one has for you. ~ Shibbies",
  },
  {
    id: 38,
    name: "Ivan",
    avatar:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1496077394090393610/IMG_0450.jpg?ex=69e89226&is=69e740a6&hm=9344b8200cddcc760ac6e83eb3f5b51fd908b57685bfe612526d0fac98603b9f&animated=true",
    message:
      "Hey giirrrlll.. heard you were affiliateeee!! slaaay!! i sweaarrr one day you'll have like 4 thousand followers and make sooo much money like mr yeast (because of your yeast infection) skskskk clock it!! anyways girll, just know ill always be your BFF even 3 years down the road and i would never harass you in any capacity!! luv ya! that was 3 years ago. you and me are much different people than we used to be. i had a family of four and they were all struck by an 18 wheeler while we were out on a picnic. im the sole survivor and have never been the same since. all i do is drink and do hard drugs to forget it all, but nothing i do mitigates the grief and numbs the pain of the loss. there is one exception, however. the sole exception of a SOAPDAX STREAMMM!! whenever i watch your stream i say fuck them kids and get put in a trance from your little cutie wutie vtuber!! ok in all seriousness thank you for everything. i don't think i've ever sat down and told you how much youve really meant to me over the last 4 years. we've been through ups and downs, have had times where we were too busy to speak to each other, and times where we probably hated each other. but through it all, we're still friends after all this time. you're one of the closest people to me despite me knowing you only online, but ive gone to you for all the problems and feelings i couldnt speak about to anyone else. you deserve to be where you are right now on twitch because of how great you are as a person. thank you for always being yourself and happy affiliate anniversary",
  },
  {
    id: 39,
    name: "Cyno",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtNOaIOjc1CUINCbUAKTTJsufA0QUWvsCvQ&s",
    message: "",
    video: "/clips/cyno.mp4",
  },
  {
    id: 40,
    name: "Shade",
    avatar: "/shade.jpg",
    message:
      "„Me, papa shade shall send his best wishes to the looser who's got her affiliate anniversary, may my blessing be with you as with it, you shall surely keep succeeding, amen.",
  },
  {
    id: 41,
    name: "Chinnie",
    avatar:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/bf5273e7-fd87-465a-879d-16966dfa7734-profile_image-300x300.png",
    message:
      "Thank you soapdax for being an amazing person and personally being an inspiration for me to start streaming again! Happy affiliate anniversary! - Chinnie Vasectomy the 3rd",
  },
  {
    id: 42,
    name: "Chiza",
    avatar:
      "https://cdn.discordapp.com/attachments/1414033172953432135/1496213100318298182/ChizaRawrStill.png?ex=69e91089&is=69e7bf09&hm=9f2d86ba8e346bb9f17473bd912fa57f0a8c576eea216f5dec993b349f758a38&animated=true",
    message:
      "Soaaapp, my dearest bubble of cutiefulness 🩵 Congratulations on hitting such a big milestone! 🎉🎉 Although I have no idea what all this streaming lingo means, I think anyone with eyes can tell you've built up such a wonderful community - just look at all these beautiful connections and memories... ✨ Everyone here is so warm and welcoming, and I believe it's because you lead by example, and attracted so many lovely people. Honestly, you're so smart and considerate and funny, like bruhh, leave something for the rest of us...? I know we haven't known each other for long, nor am I a particularly active member of the community, but please know I am eternally proud of everything you achieve. Your hard-work and talents are so admirable, please keep it up, I'll always support you as best I can! Thank you for investing your time and energy and efforts into everything you do, I hope your journey and development stay forever rewarding. Wishing you the best of luck with future endeavours, wherever your path leads you~ 🍀(Okayy stopping here before I'm d*e of mushyness and embarrassment hmpf) Can't wait to hang out irl again hehe, but until then, I'll be lurking around should you ever need me for anythingg Lots of love! MWAHH 💕 Chiza",
  },
  {
    id: 43,
    name: "Izosaki",
    avatar:
      "https://i.redd.it/these-stupid-ass-hamster-that-i-keep-seeing-on-tiktok-v0-2p47szoq84yf1.jpg?width=1320&format=pjpg&auto=webp&s=6319845ee39b769d5486163ac624deb13c0415d3",
    message:
      "Happy Affiliate Anniversary Soap! It hasn't been very long since we first met, and i'm so happy to be a friend of yours! I can tell that you're a very TALENTED streamer and I'm so proud of you :) I can't write as much because we haven't talked a lot, but I would love to talk w you even more and interact with your lovely community that you built from the ground up! Also, don't undermine your singing. Your singing is by far one of the most unique voices i've heard, and I genuinely, from the bottom of my heart, think that you have MASSIVE potential.  Congratulations! I hope you reach higher and higher from here~ -IZOSAKI (이조사키 | いぞさき) ",
  },
  {
    id: 44,
    name: "Hicky",
    avatar:
      "https://i.pinimg.com/236x/f5/67/ae/f567aef58b788e531f842d82db0968a2.jpg",
    message:
      "Happy Affiliate Anniversary Soap!! Lurking your stream became my routine in the best way!! I will be fully going back to Japan this October but for sure I will still lurk!! Cograts!!",
  },
  {
    id: 45,
    name: "復活の下着",
    avatar:
      "https://tr.rbxcdn.com/180DAY-2f24210da0be6d49778b1115e4dca6f4/420/420/ShoulderAccessory/Webp/noFilter",
    message: "ソープ！他と比べて出会いこそは短いが、俺が数少なく参加した配信は実に面白く楽しかった。殆どロムになるが、横が面で聞こえてくる配信は面白そうで遂にやにやしちゃうw　多言語を喋るのは俺だけなのに、わざわざ翻訳のボットを付けてくれる優しさも素晴らしく思う！ソープの周りはクリエイティブで友達思いな人ばかりで、日ごろの行いの良さが伝わってくるし、いつだって明るくて元気かつ謙遜なふるまいは本当に尊敬ができて好きだよ！日常でソープと出会える人達がとてもうらやましい。俺をオメガと呼ぶソープは俺の名前の意味は分からないかもしれないけど、俺は誇り高き下着の仙人。そんな仙人から知恵ある言葉を許されるのなら、ソープに授けたい : 「ダイアじゃない宝石の良さは、ダイアであろうとしないことだ」　心配はないだろうけど、この世界の人は皆、自分の道しるべを作らないと終点へたどり着けないのだ。ソープなりの道しるべを見失わないことを常ごろ祝うよ！あふぃおめでとう！！！ Dear Soap- My days of knowing you are shorter than everyone else, but the few streams I've watched were always fun and amusing. I mostly lurk, but the streams I hear from my side screen always sound fun and amusing, they make me smile. The kindness you demonstrate by turning on translations, despite it only being me speaking Japanese, is amazingly radiant. The way you are surrounded by such creative and kind people are proof that your are a good person, and your outgoing bright demeanor are something that i appreciate and really like about you. I'm jealous of the people who get to meet someone like you in real life. If you would allow, I would like to share some wise words of someone I know: The beauty of gems that aren't diamonds, are the fact that they don't try to be diamonds. Everyone has their own path, and hope you will never lose sight of yours. Congratulations Affiliate!",
  },
];

// ─── Audio Player Hook ────────────────────────────────────────────────────────
function useAudioPlayer(src?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const ensureAudio = () => {
    if (!src) return null;
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.addEventListener("timeupdate", () => {
        const a = audioRef.current!;
        setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
      });
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }
    return audioRef.current;
  };

  const toggle = () => {
    const audio = ensureAudio();
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return { isPlaying, progress, toggle };
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────
function Lightbox({
  src,
  type,
  onClose,
}: {
  src: string;
  type: "image" | "video";
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {type === "image" ? (
            <img
              src={src}
              alt="Message attachment"
              className="w-full rounded-2xl object-contain max-h-[80vh]"
            />
          ) : (
            <video
              src={src}
              controls
              autoPlay
              className="w-full rounded-2xl max-h-[80vh]"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Video Thumbnail ──────────────────────────────────────────────────────────
function VideoThumbnail({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      onClick={onClick}
      className="relative w-full rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors group/video"
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-64 object-cover"
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          e.currentTarget.currentTime = 0.5;
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/video:bg-black/50 transition-colors">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm">
        <span className="text-white text-xs font-medium">VIDEO</span>
      </div>
    </button>
  );
}

// ─── Marty Flip Card ──────────────────────────────────────────────────────────
const MARTY_FLIP_IMAGE =
  "https://cdn.discordapp.com/attachments/1414033172953432135/1495909508604498131/image.png?ex=69e89e8b&is=69e74d0b&hm=b59fdccac37d7b6834dd362898272bdcf664a14a1c1973d72560c711a9bf3821&animated=true";

function MartyFlipCard({ message }: { message: Message }) {
  const [avatarError, setAvatarError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: 7 * 0.02 }}
      className="group z-10"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "160px",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="absolute inset-0 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              {!avatarError ? (
                <img
                  src={message.avatar}
                  alt={message.name}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="text-foreground font-semibold text-sm">
                  {message.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate">
                {message.name}
              </h4>
              <div className="flex items-center gap-1 text-primary">
                <Heart className="w-3 h-3 fill-current" />
                <span className="text-xs">Community Member</span>
              </div>
            </div>
          </div>
          <p className="text-foreground text-md leading-relaxed flex-1">
            {message.message}
          </p>
          <p className="text-xs text-muted-foreground italic text-center">
            hover to reveal more ✨
          </p>
        </div>

        {/* Back face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/30"
        >
          <img
            src={MARTY_FLIP_IMAGE}
            alt="Marty's surprise"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-semibold text-center">
              — MARTY 🎉
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Message Card ─────────────────────────────────────────────────────────────
type LightboxPayload = { src: string; type: "image" | "video" };

function MessageCard({
  message,
  index,
  onMediaClick,
}: {
  message: Message;
  index: number;
  onMediaClick: (payload: LightboxPayload) => void;
}) {
  const [avatarError, setAvatarError] = useState(false);
  const { isPlaying, progress, toggle } = useAudioPlayer(message.audio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group z-10"
    >
      <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
            {!avatarError ? (
              <img
                src={message.avatar}
                alt={message.name}
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="text-foreground font-semibold text-sm">
                {message.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-foreground truncate">
              {message.name}
            </h4>
            <div className="flex items-center gap-1 text-primary">
              <Heart className="w-3 h-3 fill-current" />
              <span className="text-xs">Community Member</span>
            </div>
          </div>

          {/* Icon badges */}
          <div className="flex items-center gap-1 shrink-0">
            {message.audio && (
              <span
                className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                title="Has voice message"
              >
                <Play className="w-2.5 h-2.5 text-primary fill-primary" />
              </span>
            )}
            {message.image && (
              <span
                className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                title="Has image"
              >
                <ImageIcon className="w-2.5 h-2.5 text-primary" />
              </span>
            )}
            {message.video && (
              <span
                className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                title="Has video"
              >
                <Video className="w-2.5 h-2.5 text-primary" />
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <p className="text-foreground text-md leading-relaxed flex-1">
          {message.message}
        </p>

        {/* Attached Image */}
        {message.image && (
          <button
            onClick={() => onMediaClick({ src: message.image!, type: "image" })}
            className="w-full rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors"
          >
            <img
              src={message.image}
              alt={`${message.name}'s attachment`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        )}

        {/* Attached Video */}
        {message.video && (
          <VideoThumbnail
            src={message.video}
            onClick={() => onMediaClick({ src: message.video!, type: "video" })}
          />
        )}

        {/* Audio Player */}
        {message.audio && (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-primary/5 border border-primary/10">
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary/80 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground" />
              ) : (
                <Play className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground ml-0.5" />
              )}
            </button>
            <div className="flex-1 h-1.5 rounded-full bg-primary/20 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              Voice msg
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function MessagesSection() {
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);

  return (
    <section id="messages" className="py-24 px-4 z-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Community Messages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Messages From The Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This is were the idea for this website was born, to be honest its
            heavily inspired by what Emmisu's community did for her birthday,
            and i though it would be a pretty cool idea to do the same and let
            the community comunicate their thoughts to you on this big milestone
            you accomplished.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {messages.map((message, index) => {
            if (message.name === "MARTY") {
              return <MartyFlipCard key={message.id} message={message} />;
            }
            return (
              <MessageCard
                key={message.id}
                message={message}
                index={index}
                onMediaClick={setLightbox}
              />
            );
          })}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          type={lightbox.type}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
