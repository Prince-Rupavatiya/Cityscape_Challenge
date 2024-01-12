const speed = 10;
let map = document.getElementById("map");
let camera = document.getElementById("camera");
let player = document.getElementById("player");
let message = document.getElementById("msg");
let messageContainer = document.getElementById("massegeContainer");
let gameMessage = document.getElementById("message");
let energyScore = document.getElementById("energyScore");
let lifeScore = document.getElementById("lifeScore");
let coinScore = document.getElementById("coinScore");
let startButton = document.getElementById("startButton");
let settingButton = document.getElementById("settingButton");
let aboutButton = document.getElementById("aboutButton");
let SoundSettingDiv = document.getElementById("SoundSettingDiv");
let settingCloseButton = document.getElementById("settingCloseButton");
let settingMuteButton = document.getElementById("settingMuteButton");
let settingPlayButton = document.getElementById("settingPlayButton");
let storyPage = document.getElementById("storyPage");
let storyVideo = document.getElementById("storyVideo");
let skipButton = document.getElementById("skipButton");
let main_keys = document.getElementById("main_keys");
let buttonDiv = document.getElementById("buttonDiv");
let aboutDiv = document.getElementById("aboutDiv");
let howToPlayButton = document.getElementById("howToPlayButton");
let howToPlayDiv = document.getElementById("howToPlayDiv");
let howToPlayCloseButton = document.getElementById("howToPlayCloseButton");
let loading = document.getElementById("loading");
let mapIcon = document.getElementById("mapIcon");
let cityMap = document.getElementById("cityMap");
let cityMapIcon = document.getElementById("cityMapIcon");
let cityMapCloseImage = document.getElementById("cityMapCloseImage");
let popUpPage = document.getElementById("popUpPage");
let endVideoDiv = document.getElementById("endVideoDiv");
let endVideo = document.getElementById("endVideo");
let messageKey = document.getElementById("messageKey");
let submitButton = document.getElementById("submitButton");
let chara = document.getElementById("character");
let videoTimeOut;
let timeOutID1;
let carCollisionInterval;
let hitSound = new Audio("component/carHitSound.mp3");
let soundPlay = true;
let mapUpdateEvent;
let objects;

let gameStatus = {
    energy: 100,
    life: 3,
    coin: 0,
    level: 1
}

//All Missions
let mission = {
    one: "In the heart of learning, where minds convene, a quiet abode for those unseen. Find the tale that whispers in the domain, where breaks are taken, and knowledge may reign.",
    two: "In Ridhhi's Cozy Haven, where meals find repose, investigate the cool sanctuary where freshness bestows. Open the door where chilling airs sway, discover the clue where goodies hold sway.",
    three: "Amidst the shelves of crunchy delights, where sweet memories take their flights, explore the aisle where tea-time dreams align, and discover a hidden gem, a delight to find.",
    four: "In the quiet halls where healing is sought, a guardian stands, wise and thought. Seek the presence where serenity blends, in a corner where grace quietly extends.",
    five: "A dedicated space of a unique person for knowledge to unfold, with a flat surface for ideas to take hold. Pens, paper, and focus align, where the quest for wisdom is truly divine.",
    six: "Hunt where authority resides, in a fortress of law and order. Find the metallic defender where duty's holster meets duty's border.",
    seven: "Where financial transactions find their rest, in the realm of currencies, at their best. Seek the discarded secrets where old papers go to rest.",
    eight: "Amid bureaucracy's hum, where paperwork's dance begins,In corners obscure, the silent whisper of ink within.",
    nine: "Amidst nature's canvas, a resting place emerges. Carved from earth's embrace, this silent companion invites repose. A tableau of tranquility, where flora and foliage frame moments of respite.",
    ten: "In the realm of letters and parcels arrayed, where stamps tell stories and journeys are weighed, seek the electronic companion, silent and grand, where the post meets the digital, in a quiet land.",
    eleven: "Beneath the culinary orchestra's flare, where sizzles and whispers blend,In the heart of gastronomy's dance, where flames and secrets transcend.",
    twelve: "In the realm of flickering dreams and whispers of the screen,Among rows of velvet, where kernels gleam, a golden treat unseen.",
    thirteen: "In the domain where courage dons its armor of heat and blaze,Within the realm of safety's embrace, find what shields hands from fiery maze.",
    fourteen: "Amidst the blossoms and beneath the open sky, find the furry guardian. A loyal companion in the outdoor haven, it frolics in the green expanse, a living emblem of joy and playfulness.",
    fifteen: "In the dwelling's silent nook, where shadows and wood align,Seek the keeper of secrets, where forgotten corners intertwine."
}

//Start game
startButton.onclick = function () {
    frontPage.style.display = 'none';
    storyPage.style.display = 'block';
    storyVideo.currentTime = 0;
    storyVideo.play();

    setTimeout(function () {
        skipButton.style.display = 'block';
    }, 7000);

    videoTimeOut = setTimeout(() => {
        storyVideo.pause();
        gameStart();
    }, 32000);

    skipButton.onclick = function () {
        clearTimeout(videoTimeOut);
        storyVideo.pause();
        gameStart();
    };
}

//For Setting 
settingButton.onclick = function () {
    SoundSettingDiv.style.display = 'block';
    buttonDiv.style.display = 'none';
}
settingCloseButton.onclick = function () {
    SoundSettingDiv.style.display = 'none';
    buttonDiv.style.display = 'block';
}
settingMuteButton.onclick = function () {
    settingMuteButton.style.border = "4px solid Black";
    settingMuteButton.style.borderRadius = "10px";
    settingPlayButton.style.border = 'none';
    soundPlay = false;
}
settingPlayButton.onclick = function () {
    settingPlayButton.style.border = "4px solid Black";
    settingPlayButton.style.borderRadius = "10px";
    settingMuteButton.style.border = 'none';
    soundPlay = true;
}

//For About
aboutButton.onclick = function () {
    aboutDiv.style.display = 'block';
    buttonDiv.style.display = 'none';
}
aboutCloseButton.onclick = function () {
    aboutDiv.style.display = 'none';
    buttonDiv.style.display = 'block';
}

//For How To Play
howToPlayButton.onclick = function () {
    howToPlayDiv.style.display = 'block';
    buttonDiv.style.display = 'none';
}
howToPlayCloseButton.onclick = function () {
    howToPlayDiv.style.display = 'none';
    buttonDiv.style.display = 'block';
}

cityMapIcon.onclick = () => {
    cityMap.style.display = 'block';
    camera.style.display = 'none';
    map.style.display = 'none';
    player.style.display = 'none';
}
cityMapCloseImage.onclick = () => {
    cityMap.style.display = 'none';
    camera.style.display = 'block';
    map.style.display = 'block';
    player.style.display = 'block';
}


//Starting The Game
function gameStart() {

    storyPage.style.display = 'none';
    loading.style.display = 'block';

    setTimeout(() => {
        camera.style.display = "block";
        mapIcon.style.display = "block";
        player.style.display = "block";
        map.style.display = "block";
        loading.style.display = "none";
        main_keys.style.display = 'block';

        mapUpdate(map, objects);
        keyButtons(map);
        playerupdate();
        let status = JSON.parse(localStorage.getItem('cityscapeChallenges'));
        if (status == null) {
            localStorage.setItem('cityscapeChallenges', JSON.stringify(gameStatus));
        }
        else {
            gameStatus.energy = status.energy;
            gameStatus.life = status.life;
            gameStatus.coin = status.coin;
            gameStatus.level = status.level;
        }

        displayGameStatus();
    }, 3000);
}

//Check Item Overlap With Player
function check(item) {

    let itemPosition = item.getBoundingClientRect();
    let playerPosition = player.getBoundingClientRect();

    if (playerPosition.right > itemPosition.left && playerPosition.left < itemPosition.right && playerPosition.bottom > itemPosition.top && playerPosition.top < itemPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}

//For Display Game Status
function displayGameStatus() {

    if (gameStatus.energy <= 0 || gameStatus.life <= 0) {
        gameover();
    }
    else {
        localStorage.setItem('cityscapeChallenges', JSON.stringify(gameStatus));
        energyScore.innerText = gameStatus.energy;
        lifeScore.innerText = gameStatus.life;
        coinScore.innerText = gameStatus.coin;
    }
}

//For Map Movement
function mapUpdate(placeMap, objects) {

    let camera_width = parseInt(getComputedStyle(camera).width);
    let camera_height = parseInt(getComputedStyle(camera).height);
    let map_width = parseInt(getComputedStyle(placeMap).width);
    let map_height = parseInt(getComputedStyle(placeMap).height);
    let pos;
    addEventListener('keydown', mapUpdateEvent = e => {

        switch (e.key) {
            case 'w':
            case 'ArrowUp':

                pos = parseInt(getComputedStyle(placeMap).top);

                if (pos < 0) {
                    placeMap.style.top = pos + speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().top;
                        player.style.top = pos + speed + "px";
                    }
                }

                break;


            case 's':
            case 'ArrowDown':

                pos = parseInt(getComputedStyle(placeMap).top);

                if (Math.abs(pos) < (map_height - camera_height)) {
                    placeMap.style.top = pos - speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().top;
                        player.style.top = pos - speed + "px";
                    }
                }


                break;


            case 'a':
            case 'ArrowLeft':

                pos = parseInt(getComputedStyle(placeMap).left);

                if (pos < 0) {
                    placeMap.style.left = pos + speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().left;
                        player.style.left = pos + speed + "px";
                    }
                }

                break;


            case 'd':
            case 'ArrowRight':

                pos = parseInt(getComputedStyle(placeMap).left);

                if (Math.abs(pos) < (map_width - camera_width)) {
                    placeMap.style.left = pos - speed + "px";
                    if (objectOverlap(objects)) {
                        pos = player.getBoundingClientRect().left;
                        player.style.left = pos - speed + "px";
                    }
                }

                break;
        }

    });
}

//For Player Movement
function playerupdate() {


    let camera_width = parseInt(getComputedStyle(camera).width);
    let camera_height = parseInt(getComputedStyle(camera).height);
    let player_height = parseInt(getComputedStyle(player).height);
    let player_width = parseInt(getComputedStyle(player).width);
    let pos;


    addEventListener('keydown', e => {

        if (!objectOverlap(objects) || objects == undefined) {

            switch (e.key) {
                case 'w':
                case 'ArrowUp':

                    pos = parseInt(getComputedStyle(player).top);
                    chara.src = "component/sprite_up.png";
                    chara.classList.add("walk");

                    if (pos > 0) {
                        player.style.top = pos - speed + "px";
                        overlap();
                        displayMission();

                    }
                    break;


                case 's':
                case 'ArrowDown':

                    pos = parseInt(getComputedStyle(player).top);
                    chara.src = "component/sprite_down.png";
                    chara.classList.add("walk");

                    if (pos < Math.abs(player_height - camera_height)) {
                        player.style.top = pos + speed + "px";

                        overlap();
                        displayMission();
                    }
                    break;


                case 'a':
                case 'ArrowLeft':

                    pos = parseInt(getComputedStyle(player).left);
                    chara.src = "component/sprite_left.png";
                    chara.classList.add("walk");

                    if (pos > 0) {
                        player.style.left = pos - speed + "px";
                        overlap();
                        displayMission();
                    }
                    break;


                case 'd':
                case 'ArrowRight':

                    pos = parseInt(getComputedStyle(player).left);
                    chara.src = "component/sprite_right.png";
                    chara.classList.add("walk");

                    if (pos < Math.abs(player_width - camera_width)) {
                        player.style.left = pos + speed + "px";
                        overlap();
                        displayMission();
                    }
                    break;
            }


        }

    });

    addEventListener('keyup', e => {

        if (e.key == "w" || e.key == "a" || e.key == "s" || e.key == "d" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
            chara.classList.remove("walk");
            chara.src = "component/sprite_stand.png";
        }

    });


    main_Key_UP.onmouseout = () => {
        chara.classList.remove("walk");
        chara.src = "component/sprite_stand.png";
    }

    main_Key_Down.onmouseout = () => {
        chara.classList.remove("walk");
        chara.src = "component/sprite_stand.png";
    }

    main_Key_Left.onmouseout = () => {
        chara.classList.remove("walk");
        chara.src = "component/sprite_stand.png";
    }

    main_Key_Right.onmouseout = () => {
        chara.classList.remove("walk");
        chara.src = "component/sprite_stand.png";
    }
}

let rightKeyEvent, leftKeyEvent, downKeyEvent, upKeyEvent;
let Key_UP = document.getElementById('main_Key_UP');
let Key_Down = document.getElementById("main_Key_Down");
let Key_Left = document.getElementById("main_Key_Left");
let Key_Right = document.getElementById("main_Key_Right");

// For Key Buttons
function keyButtons(placeMap) {
    let camera_width = parseInt(getComputedStyle(camera).width);
    let camera_height = parseInt(getComputedStyle(camera).height);
    let map_width = parseInt(getComputedStyle(placeMap).width);
    let map_height = parseInt(getComputedStyle(placeMap).height);
    let player_height = parseInt(getComputedStyle(player).height);
    let player_width = parseInt(getComputedStyle(player).width);

    Key_UP.addEventListener('click', upKeyEvent = () => {
        pos = parseInt(getComputedStyle(placeMap).top);

        if (pos < 0) {
            placeMap.style.top = pos + speed + "px";
            if (objectOverlap(objects)) {
                pos = player.getBoundingClientRect().top;
                player.style.top = pos + speed + "px";
            }
        }

        if (!objectOverlap(objects) || objects == undefined) {
            pos = parseInt(getComputedStyle(player).top);
            chara.src = "component/sprite_up.png";
            chara.classList.add("walk");

            if (pos > 0) {
                player.style.top = pos - speed + "px";
                overlap();
                displayMission();

            }
        }


    });



    Key_Down.addEventListener('click', downKeyEvent = () => {
        pos = parseInt(getComputedStyle(placeMap).top);

        if (Math.abs(pos) < (map_height - camera_height)) {
            placeMap.style.top = pos - speed + "px";
            if (objectOverlap(objects)) {
                pos = player.getBoundingClientRect().top;
                player.style.top = pos - speed + "px";
            }
        }

        if (!objectOverlap(objects) || objects == undefined) {
            pos = parseInt(getComputedStyle(player).top);
            chara.src = "component/sprite_down.png";
            chara.classList.add("walk");

            if (pos < Math.abs(player_height - camera_height)) {
                player.style.top = pos + speed + "px";

                overlap();
                displayMission();
            }
        }

    });

    Key_Left.addEventListener('click', leftKeyEvent = () => {
        pos = parseInt(getComputedStyle(placeMap).left);

        if (pos < 0) {
            placeMap.style.left = pos + speed + "px";
            if (objectOverlap(objects)) {
                pos = player.getBoundingClientRect().left;
                player.style.left = pos + speed + "px";
            }
        }
        if (!objectOverlap(objects) || objects == undefined) {
            pos = parseInt(getComputedStyle(player).left);
            chara.src = "component/sprite_left.png";
            chara.classList.add("walk");

            if (pos > 0) {
                player.style.left = pos - speed + "px";
                overlap();
                displayMission();
            }
        }

    });


    Key_Right.addEventListener('click', rightKeyEvent = () => {
        pos = parseInt(getComputedStyle(placeMap).left);

        if (Math.abs(pos) < (map_width - camera_width)) {
            placeMap.style.left = pos - speed + "px";
            if (objectOverlap(objects)) {
                pos = player.getBoundingClientRect().left;
                player.style.left = pos - speed + "px";
            }
        }
        if (!objectOverlap(objects) || objects == undefined) {
            pos = parseInt(getComputedStyle(player).left);
            chara.src = "component/sprite_right.png";
            chara.classList.add("walk");

            if (pos < Math.abs(player_width - camera_width)) {
                player.style.left = pos + speed + "px";
                overlap();
                displayMission();
            }
        }

    });

}

//Check All Object Of Particular Place
function objectOverlap(objects) {
    if (objects == undefined) {
        return false;
    }
    else {

        for (let i = 0; i < objects.length; i++) {
            if (check(objects[i])) {
                return true;
            }
        }
        return false;
    }

}

let flag = 0;

//For Checking Overlap With Place In OuterMap
function overlap() {
    let riddhihome = document.getElementById("riddhihome");
    let policestation = document.getElementById("policestation");
    let firestation = document.getElementById("firestation");
    let govtoffice = document.getElementById("govtoffice");
    let mall = document.getElementById("mall");
    let hospital = document.getElementById("hospital");
    let gamezone = document.getElementById("gamezone");
    let school = document.getElementById("school");
    let postoffice = document.getElementById("postoffice");
    let home = document.getElementById("home");
    let bank = document.getElementById("bank");
    let hotel = document.getElementById("hotel");
    let garden = document.getElementById("garden");
    let advikhome = document.getElementById("advikhome");
    let theater = document.getElementById("theater");

    let playerTop, playerLeft;
    if (check(riddhihome)) {
        let tempMap = document.getElementById("riddhihomeMap");
        objects = document.getElementsByClassName("riddhiHomeObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(policestation)) {
        let tempMap = document.getElementById("policestationMap");
        objects = document.getElementsByClassName("policeStationObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(firestation)) {
        let tempMap = document.getElementById("firestationMap");
        objects = document.getElementsByClassName("fireStationObject");
        mapIcon.style.display = 'none';
        playerTop = 40;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(govtoffice)) {
        let tempMap = document.getElementById("govtofficeMap");
        objects = document.getElementsByClassName("govOfficeObject");
        mapIcon.style.display = 'none';
        playerTop = 80;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(mall)) {
        let tempMap = document.getElementById("mallMap");
        objects = document.getElementsByClassName("mallObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(hospital)) {
        let tempMap = document.getElementById("hospitalMap");
        objects = document.getElementsByClassName("hospitalObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;

    }
    else if (check(gamezone)) {
        let tempMap = document.getElementById("gamezoneMap");
        let game_zone = document.getElementById("main_game_zone");
        flag = 1;
        let playerTop = player.getBoundingClientRect().top;
        let playerLeft = player.getBoundingClientRect().left;
        player.style.display = 'none';
        main_keys.style.display = 'none';
        mapIcon.style.display = 'none';
        goinside(tempMap, objects, playerTop, playerLeft);
        game_zone.style.display = 'block';

    }
    else if (check(school)) {
        let tempMap = document.getElementById("schoolMap");
        objects = document.getElementsByClassName("schoolObject");
        mapIcon.style.display = 'none';
        playerTop = 85;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(postoffice)) {
        let tempMap = document.getElementById("postofficeMap");
        objects = document.getElementsByClassName("postOfficeObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(home)) {
        let tempMap = document.getElementById("homeMap");
        objects = document.getElementsByClassName("homeObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 60;
        gameStatus.energy = 100;
        displayGameStatus();
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(bank)) {
        let tempMap = document.getElementById("bankMap");
        objects = document.getElementsByClassName("bankObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(hotel)) {
        let tempMap = document.getElementById("hotelMap");
        objects = document.getElementsByClassName("hotelObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 65;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(garden)) {
        let tempMap = document.getElementById("gardenMap");
        objects = document.getElementsByClassName("gardenObject");
        mapIcon.style.display = 'none';
        playerTop = 50;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(advikhome)) {
        let tempMap = document.getElementById("advikhomeMap");
        objects = document.getElementsByClassName("advikHomeObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
    else if (check(theater)) {
        let tempMap = document.getElementById("theaterMap");
        objects = document.getElementsByClassName("theaterObject");
        mapIcon.style.display = 'none';
        playerTop = 70;
        playerLeft = 50;
        goinside(tempMap, objects, playerTop, playerLeft);
        flag = 0;
    }
}

let exit_button = document.getElementById("exit_button");

//For Going Inside In Particular Places
function goinside(placeMap, objects, playerInsideTop, playerInsideLeft) {
    let mapTop = map.getBoundingClientRect().top;
    let mapLeft = map.getBoundingClientRect().left;
    let playerTop = player.getBoundingClientRect().top;
    let playerLeft = player.getBoundingClientRect().left;

    Key_Right.removeEventListener('click', rightKeyEvent);
    Key_Left.removeEventListener('click', leftKeyEvent);
    Key_Down.removeEventListener('click', downKeyEvent);
    Key_UP.removeEventListener('click', upKeyEvent);

    map.style.display = "none";
    placeMap.style.display = "block";
    placeMap.style.top = "0%";
    placeMap.style.left = "0%";
    player.style.top = playerInsideTop + "%";
    player.style.left = playerInsideLeft + "%";
    
    exit_button.style.display = "block";
    
    keyButtons(placeMap);
    mapUpdate(placeMap, objects);

    message.innerHTML = "Press ENTER to exit..";

    addEventListener("keypress", e => {
        if (e.code == "Enter") {
            map.style.display = 'block';
            main_keys.style.display = 'block';
            player.style.display = 'block';
            mapIcon.style.display = 'block';
            if (flag == 1) {
                player.style.top = playerInsideTop + "px";
                player.style.left = playerInsideLeft + "px";
            }
            else {
                player.style.top = playerTop + "px";
                player.style.left = playerLeft + "px";
            }

            map.style.top = mapTop + "px";
            map.style.left = mapLeft + "px";
            placeMap.style.display = "none";
            map.style.display = "block";
            message.innerHTML = "";
            removeEventListener('keydown', mapUpdateEvent);


        }
    })

    exit_button.onclick = () =>{

        exit_button.style.display = "none";
        map.style.display = 'block';
        main_keys.style.display = 'block';
        player.style.display = 'block';
        mapIcon.style.display = 'block';
        if(flag == 1)
        {
            player.style.top = playerInsideTop + "px";
            player.style.left = playerInsideLeft + "px";
        }
        else{
            player.style.top = playerTop + "px";
            player.style.left = playerLeft + "px";
        }
        
        map.style.top = mapTop + "px";
        map.style.left = mapLeft + "px";
        placeMap.style.display = "none";
        map.style.display = "block";
        message.innerHTML = "";
        removeEventListener('keydown', mapUpdateEvent);
    
    }


}

//For Car Collision Checking
function carCollision() {
    let cars = document.getElementsByClassName("car");
    let policecar1 = document.getElementById("policecar1");
    let policecar2 = document.getElementById("policecar2");
    let carStates = Array.from(cars).fill(false);
    carCollisionInterval = setInterval(() => {
        for (let i = 0; i < cars.length; i++) {
            if (check(cars[i])) {
                if (!carStates[i]) {

                    if (soundPlay) {
                        hitSound.play();
                    }
                    cars[i].style.animationPlayState = "paused";

                    if (policecar1 == cars[i] || policecar2 == cars[i]) {
                        gameStatus.life -= 1;
                    }

                    gameStatus.energy -= 5;
                    displayGameStatus();

                    setTimeout(() => {
                        cars[i].style.animationPlayState = "running";
                        carStates[i] = false;
                    }, 5000);

                    carStates[i] = true;
                }
            }
        }
    }, 50);
}
carCollision();

//For People Collision Checking
function cityPeople() {
    let cityPeople = document.getElementsByClassName("cityPeople");
    let peopleStates = Array.from(cityPeople).fill(false);
    cityPeopleInterval = setInterval(() => {
        for (let i = 0; i < cityPeople.length; i++) {
            if (check(cityPeople[i])) {
                if (!peopleStates[i]) {
                    if (soundPlay) {
                        hitSound.play();
                    }
                    cityPeople[i].style.animationPlayState = "paused";
                    displayGameStatus();

                    setTimeout(() => {
                        cityPeople[i].style.animationPlayState = "running";
                        peopleStates[i] = false;
                    }, 2000);

                    peopleStates[i] = true;
                }
            }
        }
    }, 50);
}
cityPeople();

//For Mission
function displayMission() {
    let missionPlace, codeNumber = 0, flag = 0, placeMap, timing = 1500;

    switch (gameStatus.level) {
        case 1:
            message.innerText = mission.one;
            missionPlace = document.getElementById("schoolStaffRoomTable");
            placeMap = document.getElementById("schoolMap");
            timing = 1500;
            break;
        case 2:
            message.innerText = mission.two;
            missionPlace = document.getElementById("riddhiHomeFridge");
            placeMap = document.getElementById("riddhihomeMap");
            timing = 1500;
            break;
        case 3:
            message.innerText = mission.three;
            missionPlace = document.getElementById("mallBiscuit01");
            placeMap = document.getElementById("mallMap");
            codeNumber = 1;
            timing = 4000;
            break;
        case 4:
            message.innerText = mission.four;
            missionPlace = document.getElementById("hospitalGanpatiMurti");
            placeMap = document.getElementById("hospitalMap");
            timing = 1500;
            break;
        case 5:
            message.innerText = mission.five;
            missionPlace = document.getElementById("advikHomeStudyTable");
            placeMap = document.getElementById("advikhomeMap");
            timing = 1500;
            break;
        case 6:
            message.innerText = mission.six;
            missionPlace = document.getElementById("policestationtable2");
            placeMap = document.getElementById("policestationMap");
            codeNumber = 23;
            timing = 4000;

            break;
        case 7:
            message.innerText = mission.seven;
            missionPlace = document.getElementById("bankDustbin4");
            placeMap = document.getElementById("bankMap");
            timing = 1500;
            break;
        case 8:
            message.innerText = mission.eight;
            missionPlace = document.getElementById("govofficezerox1");
            placeMap = document.getElementById("govtofficeMap");
            timing = 1500;
            break;
        case 9:
            missionPlace = document.getElementById("gardenBench1");
            message.innerText = mission.nine;
            placeMap = document.getElementById("gardenMap");
            codeNumber = 28;
            timing = 4000;

            break;
        case 10:
            message.innerText = mission.ten;
            missionPlace = document.getElementById("postOfficeOfficeTable");
            placeMap = document.getElementById("postofficeMap");
            timing = 1500;
            break;
        case 11:
            message.innerText = mission.eleven;
            missionPlace = document.getElementById("hotelKitchenHorizontal");
            placeMap = document.getElementById("hotelMap");
            timing = 1500;
            break;
        case 12:
            message.innerText = mission.twelve;
            missionPlace = document.getElementById("theaterFoodCounter");
            placeMap = document.getElementById("theaterMap");
            codeNumber = 26;
            timing = 4000;

            break;
        case 13:
            message.innerText = mission.thirteen;
            missionPlace = document.getElementById("firestationhandgloves1");
            placeMap = document.getElementById("firestationMap");
            timing = 1500;
            break;
        case 14:
            message.innerText = mission.fourteen;
            missionPlace = document.getElementById("gardenDog");
            placeMap = document.getElementById("gardenMap");
            timing = 1500;
            break;
        case 15:
            message.innerText = mission.fifteen;
            missionPlace = document.getElementById("homeLivingRoomCabinet");
            placeMap = document.getElementById("homeMap");
            codeNumber = 9;
            timing = 4000;

            flag = 1;
            break;
    }
    missionPlace.style.boxShadow = "0px 0px 10px blue";
    missionPlace.style.borderRadius = "10px";
    if (check(missionPlace)) {

        missionPlace.style.boxShadow = "none";

        if (codeNumber != 0) {
            gameMessage.innerHTML = "Mission Completed <br> Remember this number : " + codeNumber;
            codeNumber = 0;
        }
        else {
            gameMessage.innerText = "Mission Completed";
        }

        messageContainer.style.display = "flex";
        camera.style.display = "none";

        timeOutID1 = setTimeout(() => {
            messageContainer.style.display = "none";
            camera.style.display = "block";


            if (flag != 0) {

                clearTimeout(timeOutID1);
                popUpPage.style.display = "block";
                messageContainer.style.display = "none";
                camera.style.display = "none";
                mapIcon.style.display = "none";

                submitButton.onclick = function () {
                    if (messageKey.value == 150696) {
                        popUpPage.style.display = "none";
                        endVideoDiv.style.display = "block";
                        main_keys.style.display = 'none';
                        endVideo.play();
                    }
                    else {
                        window.alert("You enter wrong code");
                    }
                }
            }
            else {
                gameStatus.level = gameStatus.level + 1;
            }
        }, timing);

        gameStatus.coin = gameStatus.coin + 1000;
        displayGameStatus();
    }
}

//For Game Over
function gameover() {
    clearInterval(carCollisionInterval);
    clearInterval(cityPeopleInterval);
    localStorage.removeItem('cityscapeChallenges');
    gameMessage.innerText = "You died";
    camera.style.display = "none";
    main_keys.style.display = "none";
    mapIcon.style.display = "none";
    messageContainer.style.display = "flex";
}