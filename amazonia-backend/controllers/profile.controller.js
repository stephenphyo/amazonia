const profileCtrl = {
    ChangePfp: (req, res) => {
        console.log(req.body);
        console.log(req.files);
        res.status(201).send("OK");
    }
}

module.exports = profileCtrl;