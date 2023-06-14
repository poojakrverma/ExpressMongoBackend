import express from "express";

const router = express.Router();

router.get('/GetLocalIpAddress', (req, res) => {
    const localIpAdress = req.ip;
    const remoteIpAddress = req.connection.remoteAddress;
    console.log('local ip address : ' + localIpAdress);
    console.log('remote ip address : ' + remoteIpAddress)
    res.send({
        "local Ip Address": localIpAdress,
        "remote Ip Address": remoteIpAddress
    })
})



export default router;