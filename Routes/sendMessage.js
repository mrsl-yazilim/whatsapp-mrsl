const { MessageType } = require("@adiwajshing/baileys")
const router = require('express').Router()
const InstanceKeyVerification = require("../Middleware/keyVerify")
const InstanceLoginVerification = require("../Middleware/loginVerify")

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, inMemory: true }).single('file')

router.post('/sendText', InstanceKeyVerification, InstanceLoginVerification, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendTextMessage(
        req.body.msg_data.id,
        req.body.msg_data.message
    );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data
    });
})

router.post('/sendImage', InstanceKeyVerification, InstanceLoginVerification,  upload, async (req, res) => {
    // console.log(req.file)
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendMediaFile(
        req.query.id,
        req.query.caption,
        MessageType.image,
        req.file
    );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})


router.post('/sendVideo', InstanceKeyVerification, InstanceLoginVerification, upload, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendMediaFile(
        req.query.id,
        req.query.caption,
        MessageType.video,
        req.file
    );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

router.post('/sendAudio', InstanceKeyVerification, InstanceLoginVerification, upload, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendMediaFile(
        req.query.id,
        "",
        MessageType.audio,
        req.file
        );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

router.post('/sendDocument', InstanceKeyVerification, InstanceLoginVerification, upload, async (req, res) => {
    // console.log(req.files.document.name)
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendDocument(
        req.query.id, 
        MessageType.document, 
        req.file
        );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

router.post('/sendLocation', InstanceKeyVerification, InstanceLoginVerification, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendLocationMessage(
        req.body.msg_data.id,
        req.body.msg_data.coordinates.lat,
        req.body.msg_data.coordinates.long
    );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

router.post('/sendVCard', InstanceKeyVerification, InstanceLoginVerification, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendVCardMessage(req.body.msg_data.id, req.body.msg_data);
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

router.post('/sendButton', InstanceKeyVerification, InstanceLoginVerification, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendButtonMessage(req.body.msg_data.id, req.body.msg_data);
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

router.post('/isonwhatsapp', InstanceKeyVerification, InstanceLoginVerification, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const number = req.query.number
    const data = await instance.isOnWhatsApp(number);
    if(!data.exists) return res.status(401).json({error: true, data})
    res.status(201).json({
        error: false,
        data,
    });
})

router.post('/sendMediaUrl', InstanceKeyVerification, InstanceLoginVerification, async (req, res) => {
    const instance = WhatsAppInstances[req.query.key];
    const data = await instance.sendMediaURL(
        req.body.msg_data.id,
        req.body.msg_data.msgtype,
        req.body.msg_data.caption,
        req.body.msg_data.fileurl
    );
    if(data.error) return res.status(404).json(data)
    res.status(201).json({
        error: false,
        data: data,
    });
})

module.exports = router;