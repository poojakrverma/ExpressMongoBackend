import express from "express";

const router = express.Router();

router.get('/GetLocalIpAddress', (req, res) => {
    const remoteIpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const localIpAdress = req.ip;
    const localAddress = req.connection.localAddress;
    const address = req.connection.address();
    //const remoteIpAddress = req.connection.remoteAddress;
    console.log('local ip address : ' + localIpAdress);
    console.log('remote ip address : ' + remoteIpAddress)
    res.send({
        "local Ip Address": localIpAdress,
        "remote Ip Address": remoteIpAddress,
        "address": address,
    })
})



export default router;