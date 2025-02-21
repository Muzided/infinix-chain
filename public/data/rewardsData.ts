import { title } from "process";
import task1 from "../images/task1.png";
import task2 from "../images/task2.png";
import task3 from "../images/task3.png";
import task4 from "../images/task4.png";
import task5 from "../images/task5.png";
import task6 from "../images/task6.png";
import task7 from "../images/task7.png";
import moneybag from "../images/money-bag.png";
import goldmedal from "../images/gold-medal.png";


export const rewardsData = [
    {
        id: 1,
        type: "task",
        title: "Join Our Social Media Channels",
        image: task1,
        task: "Follow us on Twitter, join our Telegram group, and like our Facebook page.",
        rewardPool: 100000,
        winners: 10,
        prizePerWinner: 10000
    },
    {
        id: 2,
        type: "task",
        title: "Stay Active Daily in Our Telegram Group",
        image: task2,
        task: "Chat, ask questions, and actively contribute to the community in our Telegram group.",
        rewardPool: 100000,
        winners: 10,
        prizePerWinner: 10000
    },
    {
        id: 3,
        type: "task",
        title: "Like, Comment, and Retweet All Our Posts",
        image: task3,
        task: "Interact with all posts on our social media accounts by liking, commenting, and retweeting.",
        rewardPool: 100000,
        winners: 10,
        prizePerWinner: 10000
    },
    {
        id: 4,
        type: "task",
        title: "Vote for Us on Coin Sniper",
        image: task4,
        task: "Cast your vote for InfinixChain on Coin Sniper and help us climb the rankings.",
        rewardPool: 100000,
        winners: 10,
        prizePerWinner: 10000
    },
    {
        id: 5,
        type: "task",
        title: "Refer Your Friends to Join the Presale",
        image: task5,
        task: "Use your unique referral link to invite friends to participate in the InfinixChain Presale.",
        rewardPool: 100000,
        winners: 10,
        prizePerWinner: 10000
    }

];

export const grandReward = 
    {
        id: 1,
        title: "Grand Prize: $500,000",
        image: goldmedal,
        eligibility: "Complete all tasks to automatically enter the grand prize draw.",
        detail: "One Lucky Winner: Takes home the grand prize of $500,000!",
        rewardPool: 1000000,
        winners: "50 winners (10 winners per task, $10,000 each)",
        grandPrize: 500000
    };