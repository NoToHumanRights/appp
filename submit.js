const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, skibidi, sigma } = req.body;

    const correctAnswers = {
        skibidi: 'A type of meme involving a toilet with human head',
        sigma: 'A man who chooses to live independently and work alone'
    };

    let score = 0;
    const totalQuestions = 2;

    if (skibidi.trim().toLowerCase() === correctAnswers.skibidi.trim().toLowerCase()) {
        score += 1;
    }

    if (sigma.trim().toLowerCase() === correctAnswers.sigma.trim().toLowerCase()) {
        score += 1;
    }

    const percentage = (score / totalQuestions) * 100;

    const webhookUrl = 'https://discord.com/api/webhooks/1253464203876896909/DJf9Qsf1K79MbkEXSq2-gvQdJkyjbR6Y-jz1Aey8fJCTJSpWalQxQ9-gThq-IuwaND-a';

    let message;

    if (percentage >= 70) {
        message = `${username} your application was approved!`;
    } else {
        message = `${username} your application was denied! Your score: ${percentage}%`;
    }

    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
        }),
    });

    return res.status(200).json({ message: `Your score is ${percentage}%. ${message}` });
};
