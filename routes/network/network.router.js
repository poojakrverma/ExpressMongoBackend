import express from "express";

const router = express.Router();

router.get('/GetLocalIpAddress', (req, res) => {
    const remoteIpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const clientIpAddress = req.ip;
    const serverIpAddress = req.connection.localAddress;
    const address = req.connection.address();
    //const remoteIpAddress = req.connection.remoteAddress;
    console.log('clientIpAddress : ' + clientIpAddress);
    console.log('remote ip address : ' + remoteIpAddress);
    console.log('serverIpAddress :' + serverIpAddress);
    res.send({
        "clientIpAddress": clientIpAddress,
        "remote Ip Address": remoteIpAddress,
        "serverIpAddress": serverIpAddress
    })
})

router.get('/GetServerDetails', (req, res) => {

})



export default router;