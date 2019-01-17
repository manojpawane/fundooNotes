const LabelNote = require('../services/label.service')

class Label_Controller {
    constructor() {

    }
    
   AddLabel(req, res) {
        try {
            var labelService = new LabelNote();
            req.assert('name', 'Name cannot be blank.').notEmpty();
            req.assert('userId','User Id not found').notEmpty();
        
            var errors = req.validationErrors();
            if (errors) {
                return res.status(400).send(errors);
            }
            else {
                labelService.AddLabelForUser(req, res);
            }

        } catch (error) {
            console.log(error);
            res.status(400).send(errors)
        }
    }
}

module.exports.Label_Controller = Label_Controller
