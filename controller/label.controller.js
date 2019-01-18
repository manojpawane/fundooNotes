const LabelNote = require('../services/label.service')

/**
 * 
 *
 * @class Label_Controller
 */
class Label_Controller {
    constructor() {

    }

   /**
    * add label 
    *
    * @param {*} req
    * @param {*} res
    * @returns
    * @memberof Label_Controller
    */
   AddLabel(req, res) {
        try {
            var labelService = new LabelNote();
            req.assert('name', 'Name cannot be blank.').notEmpty();
            req.assert('userId','User Id not found').notEmpty();
        
            let errors = req.validationErrors();
            if (errors) {
                return res.status(400).send(errors);
            }
            else {
                labelService.AddLabelForUser(req, res);
            }

        } catch (error) {
            res.status(400).send(errors)
        }
    }

    /**
     *get label
     *
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof Label_Controller
     */
    getLabel(req, res){
        try {
             var labelService = new LabelNote();
             req.assert('userId','User not valid').notEmpty();
             let errors = req.validationErrors();
             if(errors){
                 return res.status(400).send(errors);
             }
             else{
                 labelService.get(req, res);
             }
        } catch (error) {
            res.send(error);
        }
    }

    /**
     *update the label
     *
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof Label_Controller
     */
    updateLabel(req, res){
        try {
            var labelService = new LabelNote();
            req.assert('Id', 'Id is not valid').notEmpty();
            req.assert('userId', 'User is invalid').notEmpty();
            req.assert('name','Name of label is not valid').notEmpty();
            let errors = req.validationErrors();
            if(errors){
                return res.status(400).send(errors);
            }
            else{
                labelService.update(req, res);
            }
        } catch (error) {
            res.send(error)
        }
    }

    /**
     *delete the label
     *
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof Label_Controller
     */
    deleteLabel(req, res){
        try {
            var labelService = new LabelNote();
            req.assert('Id','Id is not valid').notEmpty();
            let errors = req.validationErrors();
            if(errors){
                return res.status(400).send(errors);
            }
            else{
                labelService.deleteLabel(req, res);
            }
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports.Label_Controller = Label_Controller
