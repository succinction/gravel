<script>
    const name = "Monty Hall Paradox";
    let score;
    try {
        let savedScore = localStorage.getItem("score") || false;
        score = savedScore
            ? JSON.parse(savedScore)
            : {
                  stay: { win: 0, loss: 0 },
                  switch: { win: 0, loss: 0 },
              };
    } catch (e) {
        score = {
            stay: { win: 0, loss: 0 },
            switch: { win: 0, loss: 0 },
        };
    }
    let path = ""; // "stay" | "switch"
    let gamePhase = 0;
    let userSelection = null;
    let zonkRevealed = null;
    let gameResult = "";
    function selectPrizeDoor() {
        return Math.floor(Math.random() * 3);
    }
    let prizeDoor = selectPrizeDoor();
    const doorColor = {
        close: "grey",
        empty: "red",
        full: "yellowgreen",
    };
    let bgColor = [];
    function initialize() {
        gamePhase = 0;
        gameResult = "";
        prizeDoor = selectPrizeDoor();
        userSelection = null;
        bgColor[0] = doorColor.close;
        bgColor[1] = doorColor.close;
        bgColor[2] = doorColor.close;
    }
    initialize();
    function openDoor(doorNumber) {
        bgColor[doorNumber] =
            prizeDoor === doorNumber ? doorColor.full : doorColor.empty;
    }
    function selectDoor(doorNumber) {
        if (gamePhase === 0) {
            userSelection = doorNumber;
        }
    }
    function restartGame() {
        initialize();
    }
    function revealZonk() {
        if (gamePhase === 0 && userSelection !== null) {
            gamePhase = 1;
            if (userSelection === prizeDoor) {
                const doors = [0, 1, 2];
                doors.splice(userSelection, 1);
                let randomBinary = new Date();
                randomBinary = randomBinary.getMilliseconds() % 2;
                console.log("randomBinary", randomBinary);
                zonkRevealed = doors[randomBinary];
            } else {
                zonkRevealed = 3 - userSelection - prizeDoor;
                // 3 - 0 - 1 - 2 = 0
                // 3 - 0 - 1 = 2
                // 3 - 0 - 2 = 1
                // 3 - 1 - 2 = 0
            }
            openDoor(zonkRevealed);
        }
    }
    function userStay() {
        if (gamePhase === 1) {
            gamePhase = 2;
            path = "stay";
        }
    }
    function userSwitch() {
        if (gamePhase === 1) {
            userSelection = 3 - userSelection - zonkRevealed;
            gamePhase = 2;
            path = "switch";
        }
    }
    function revealAll() {
        if (gamePhase === 2) {
            gamePhase = 3;
            openDoor(0);
            openDoor(1);
            openDoor(2);
            gameResult = userSelection === prizeDoor ? "WIN" : "LOSE";
            score[path][["loss", "win"][Number(userSelection === prizeDoor)]]++;
            localStorage.setItem("score", JSON.stringify(score));
        }
    }
</script>

<main>
    <h1>{name}</h1>
    <div class="statistics">
        <table>
            <tr>
                <th>Games</th>
                <th class="statbox-win">Win</th>
                <th class="statbox-loss">Loss</th>
            </tr>
            <tr>
                <td>Stay:</td>
                <td class="statbox-div">{score.stay.win}</td>
                <td>{score.stay.loss}</td>
                <td
                    >{Math.round(
                        (score.stay.win / (score.stay.win + score.stay.loss)) *
                            100
                    ) || 0}%</td
                >
            </tr>
            <tr>
                <td>Switch:</td>
                <td class="statbox-div">{score.switch.win}</td>
                <td>{score.switch.loss}</td>
                <td
                    >{Math.round(
                        (score.switch.win /
                            (score.switch.win + score.switch.loss)) *
                            100
                    ) || 0}%</td
                >
            </tr>
        </table>
    </div>
    <div>
        <hr />
        <button class="btn btn-primary" on:click={restartGame}>New Game</button>
    </div>
    <div
        class="phase"
        style={`background-color:${
            gamePhase === 0 && userSelection === null
                ? "#ccffcc99"
                : "#ffffff33"
        }`}
    >
        <p>Step1: Select a Door:</p>
        <div class="doors">
            <div
                class="door"
                on:click={() => selectDoor(0)}
                style={`
                    background-color:${bgColor[0]}; 
                    border: solid 5px ${
                        userSelection === 0 ? "orange" : "#ffffff33"
                    };
                    ${bgColor[0] === "grey"
                            ? "background-image: url(https://image.made-in-china.com/2f0j00SwPaCDMHZLzb/2019-New-Design-Steel-Security-Door-for-Room-Door.jpg);"
                            : ""
                    }
                    background-size: 100% auto;
                `}
            >
                Door 1
            </div>
            <div
                class="door"
                on:click={() => selectDoor(1)}
                style={`
                    background-color:${bgColor[1]}; 
                    border: solid 5px ${
                        userSelection === 1 ? "orange" : "#ffffff33"
                    };
                    ${bgColor[1] === "grey"
                            ? "background-image: url(https://image.made-in-china.com/2f0j00SwPaCDMHZLzb/2019-New-Design-Steel-Security-Door-for-Room-Door.jpg);"
                            : ""
                    }
                    background-size: 100% auto;
                `}
            >
                Door 2
            </div>
            <div
                class="door"
                on:click={() => selectDoor(2)}
                style={`
                    background-color:${bgColor[2]}; 
                    border: solid 5px ${
                        userSelection === 2 ? "orange" : "#ffffff33"
                    };
                    ${bgColor[2] === "grey"
                            ? "background-image: url(https://image.made-in-china.com/2f0j00SwPaCDMHZLzb/2019-New-Design-Steel-Security-Door-for-Room-Door.jpg);"
                            : ""
                    }
                    background-size: 100% auto;
                `}
            >
                Door 3
            </div>
        </div>
    </div>
    <div
        class="phase"
        style={`background-color:${
            gamePhase === 0 && userSelection !== null
                ? "#ccffcc99"
                : "#ffffff33"
        }`}
    >
        <p>Step2: Reveal Zonk</p>
        <button class="btn btn-primary" on:click={revealZonk}
            >Reveal Zonk</button
        >
    </div>
    <div
        class="phase"
        style={`background-color:${
            gamePhase === 1 ? "#ccffcc99" : "#ffffff33"
        }`}
    >
        <p>Step3: Choose to Stay or Switch</p>
        <button class="btn btn-primary" on:click={userStay}>Stay</button>
        <button class="btn btn-primary" on:click={userSwitch}>Switch</button>
    </div>
    <div
        class="phase"
        style={`background-color:${
            gamePhase === 2 ? "#ccffcc99" : "#ffffff33"
        }`}
    >
        <p>Step4: Reveal Selected Door</p>
        {gameResult} &nbsp;
        <button class="btn btn-primary" on:click={revealAll}>Reveal</button>
        &nbsp;
        {gameResult}
    </div>
    {#if gameResult}
        <div
            class="phase"
            style={`background-color:${
                gamePhase === 2 ? "#ccffcc99" : "#ffffff33"
            }`}
        >
            {gameResult}
            {gameResult}
            {gameResult}
        </div>
        <div>
            <button class="btn btn-primary" on:click={restartGame}
                >New Game</button
            >
        </div>
    {/if}
</main>

<style>
    td {
        padding: 8px;
    }
    .statbox-win {
        width: 80px;
        border-right: solid 1px white;
        border-bottom: solid 1px white;
    }
    .statbox-loss {
        width: 80px;
        border-bottom: solid 1px white;
    }
    .statbox-div {
        border-right: solid 1px white;
    }
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    .doors {
        display: flex;
        justify-content: center;
        margin: 5px;
    }
    .door {
        border: solid 1px;
        width: 80px;
        height: 160px;
        margin: 5px;
        padding: 10px;
    }
    .statistics {
        display: flex;
        justify-content: center;
        margin: 32px;
    }
    .phase {
        /* border-radius: 25%; */
        border-radius: 15px 30px 15px 30px;
        margin: 7px;
        padding: 9px;
    }
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    p {
        color: #ff3e00;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
