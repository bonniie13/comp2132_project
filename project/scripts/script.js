/* 
author:  bonnie cheng
date:    06/18/2024
version: 1.0
notes:   scss for project
*/
$(document).ready(function() {
    let playerScore   = 0;
    let computerScore = 0;
    let rounds        = 0;

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function calculateScore(dice1, dice2) {
        if (dice1 === 1 || dice2 === 1) {
            return 0;
        }
        else if (dice1 === dice2) {
            return (dice1 + dice2) * 2;
        }
        else {
            return dice1 + dice2;
        }
    }

    function updateScores() {
        $("#player-total-score").text(`Total Score: ${playerScore}`);
        $("#computer-total-score").text(`Total Score: ${computerScore}`);
    }

    $("#roll-dice").click(function() {
        if (rounds < 3) {
            let playerDice1   = rollDice();
            let playerDice2   = rollDice();
            let computerDice1 = rollDice();
            let computerDice2 = rollDice();

            $("#player-dice img").eq(0).attr("src", `../images/dice-${playerDice1}.png`);
            $("#player-dice img").eq(1).attr("src", `../images/dice-${playerDice2}.png`);
            $("#computer-dice img").eq(0).attr("src", `../images/dice-${computerDice1}.png`);
            $("#computer-dice img").eq(1).attr("src", `../images/dice-${computerDice2}.png`);

            let playerRoundScore   = calculateScore(playerDice1, playerDice2);
            let computerRoundScore = calculateScore(computerDice1, computerDice2);

            playerScore   += playerRoundScore;
            computerScore += computerRoundScore;

            $("#player-round-score").text(`Round Score: ${playerRoundScore}`);
            $("#computer-round-score").text(`Round Score: ${computerRoundScore}`);
            
            updateScores();

            rounds++;

            if (rounds === 3) {
                let resultMessage = playerScore > computerScore ? "Player Wins!" : (playerScore < computerScore ? "Computer Wins!" : "It\'s a Tie!");
                $("#result").text(resultMessage).fadeIn();
            }
        }
    });

    $("#reset-game").click(function() {
        playerScore   = 0;
        computerScore = 0;
        rounds        = 0;
        $("#player-dice img").attr("src", "../images/dice-1.png");
        $("#computer-dice img").attr("src", "../images/dice-1.png");
        $("#player-round-score").text("Round Score: 0");
        $("#computer-round-score").text("Round Score: 0");
        updateScores();
        $("#result").text("").fadeOut();
    });
});
