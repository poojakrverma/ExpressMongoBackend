import express from "express";

const router = express.Router();

router.get('/GetIPDetails', (req, res) => {
    const clientIpAddress = req.ip;
    const remoteIpAddress = req.connection.remoteAddress;
    const serverIpAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || remoteIpAddress;
    const socketIpAddress = req.socket.localAddress;
    const hostIpAddress = req.headers.host.split(':');
    //const remoteIpAddress = req.connection.remoteAddress;
    console.log('clientIpAddress : ' + clientIpAddress);
    console.log('remote ip address : ' + remoteIpAddress);
    console.log('serverIpAddress :' + serverIpAddress);
    res.send({
        "clientIpAddress": clientIpAddress,
        "remoteIpAddress": remoteIpAddress,
        "serverIpAddress": serverIpAddress,
        "socketIpAddress": socketIpAddress,
        "hostIpAddress": hostIpAddress
    })
})

router.get('/GetServerDetails', (req, res) => {

})



export default router;