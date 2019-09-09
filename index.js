const express = require('express')
const spawn = require('cross-spawn');

const app = express()
const port = 7512

function shutdown() {
    const child = spawn('sdn');
}

function hibernate() {
    const child = spawn.sync('sudo', ["-A", "systemctl", "suspend"], { stdio: 'inherit' });
}

function turnOffDisplays() {
    const child = spawn('xset', ['dpms', 'force', 'off'], { stdio: 'inherit' });
}

function changeVolume(type) {
    const child = spawn.sync('pulsemixer', ['--change-volume', `${type}5`], { stdio: 'inherit' });
}

function getVolume() {
    return spawn.sync('pulsemixer', ['--get-volume']).stdout.toString();
}

app.get('/offDisplays', (req, res) => {
    turnOffDisplays();
    res.send('Done!')
}
)

app.get('/power/:type', (req, res) => {
    switch (req.params.type) {
        case 'hibernate':
            hibernate();
            break;
        case 'sdn':
            shutdown();
            break;
        default:
            break;
    }
    res.send('Done!')
}
)

app.get('/volume/:type?', (req, res) => {
    if (req.params.type) {
        changeVolume(req.params.type);
    }
    const volume = getVolume();
    res.send(volume.split(' ')[0]);
}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))