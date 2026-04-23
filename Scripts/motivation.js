let quotes=[
"Success doesn't come from what you do occasionally. It comes from what you do consistently.",
"Discipline is choosing between what you want now and what you want most.",
"Small progress each day adds up to big results.",
"Your future is created by what you do today.",
"Push yourself because no one else is going to do it for you.",
"Dream big. Start small. Act now.",
"Do something today your future self will thank you for.",
"Focus on the goal, not the obstacle.",
"The pain of discipline is better than the pain of regret.",
"You are capable of more than you know."
];

window.onload=function(){
    generateQuote();
}

function generateQuote(){
    let random=Math.floor(Math.random()*quotes.length);

    document.getElementById("quoteText").innerText=quotes[random];
}