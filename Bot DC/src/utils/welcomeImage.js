const { createCanvas, loadImage } = require('canvas');
const path = require('path');

module.exports = async (member) => {

    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');

    const background = await loadImage(
        path.join(__dirname, '../assets/background.jpg')
    );

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await loadImage(
        member.user.displayAvatarURL({ extension: 'png' })
    );

    ctx.save();
    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 100, 100, 200, 200);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px sans-serif';
    ctx.fillText('WELCOME', 350, 160);

    ctx.font = '40px sans-serif';
    ctx.fillText(member.user.username, 350, 230);

    return canvas.toBuffer();
};
