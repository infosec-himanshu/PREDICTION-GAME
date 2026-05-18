// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PredictionArena {

    /* -------------------- OWNER & STORAGE -------------------- */

    address public owner;
    address payable public storageWallet;

    constructor(address payable _storageWallet) {
        owner = msg.sender;
        storageWallet = _storageWallet;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function updateStorageWallet(address payable newWallet) external onlyOwner {
        storageWallet = newWallet;
    }

    /* -------------------- GAME 1: LOOT RARITY -------------------- */

    enum LootChoice {
        COMMON,
        RARE,
        EPIC,
        HARMFUL
    }

    event LootPlayed(
        address indexed user,
        LootChoice choice,
        LootChoice result,
        uint256 amount,
        bool won
    );

    function playLootGame(LootChoice choice) external payable {
        require(msg.value > 0, "Stake required");

        LootChoice result = LootChoice.RARE; // FIXED RESULT
        bool won = (choice == result);

        if (won) {
            payable(msg.sender).transfer(msg.value);
        } else {
            storageWallet.transfer(msg.value);
        }

        emit LootPlayed(msg.sender, choice, result, msg.value, won);
    }

    /* -------------------- GAME 2: DUNGEON FIGHT -------------------- */

    enum FightSide {
        PLAYER,
        AI
    }

    uint256 public totalPlayerStakes;
    uint256 public totalAIStakes;

    event DungeonPlayed(
        address indexed user,
        FightSide side,
        FightSide winner,
        uint256 amount,
        bool won
    );

    function playDungeonGame(FightSide side) external payable {
        require(msg.value > 0, "Stake required");

        if (side == FightSide.PLAYER) {
            totalPlayerStakes += msg.value;
        } else {
            totalAIStakes += msg.value;
        }

        FightSide winner = FightSide.PLAYER; // FIXED WINNER
        bool won = (side == winner);

        if (won) {
            payable(msg.sender).transfer(msg.value);
        } else {
            storageWallet.transfer(msg.value);
        }

        emit DungeonPlayed(msg.sender, side, winner, msg.value, won);
    }

    /* -------------------- GAME 3: MARKET PREDICTION -------------------- */

    enum MarketDirection {
        UP,
        DOWN
    }

    enum TimeFrame {
        MIN_5,
        MIN_15,
        MIN_60
    }

    event MarketPlayed(
        address indexed user,
        MarketDirection direction,
        TimeFrame timeframe,
        MarketDirection result,
        uint256 amount,
        bool won
    );

    function playMarketGame(
        MarketDirection direction,
        TimeFrame timeframe
    ) external payable {
        require(msg.value > 0, "Stake required");

        MarketDirection result = MarketDirection.UP; // FIXED RESULT
        bool won = (direction == result);

        if (won) {
            payable(msg.sender).transfer(msg.value);
        } else {
            storageWallet.transfer(msg.value);
        }

        emit MarketPlayed(
            msg.sender,
            direction,
            timeframe,
            result,
            msg.value,
            won
        );
    }

    /* -------------------- VIEW HELPERS -------------------- */

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
