function InstanceLoginVerification(req, res, next) {

    const key = req.query["key"]?.toString()

    if (!key) {
        return res.status(403).send(({ error: true, message: 'anahtar sorgusu yok' }))
    }

    const instance = WhatsAppInstances[key];
    if (!instance.instance.conn?.phoneConnected) {
        return res.status(401).send(({ error: true, message: "telefon bağlı değil" }))
    }
    next()
}

module.exports = InstanceLoginVerification