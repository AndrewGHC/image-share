import _ from 'lodash';
import Image from '../models/images.js';
import base64 from 'base64-js';

export function upload (req, res) {
    // Check if image already exists
    Image.findOne({title:req.body.title}, (err, docs) => {
        if (err) throw err;
        // Image with given title exists
        if (docs) {
            // do sth
        }
        // Image is new
        else {
            let newImage = new Image();
            newImage.user = req.user.email;
            newImage.title = req.body.title;
            newImage.image.data = base64.fromByteArray(req.file.buffer);
            newImage.image.mimeType = req.file.mimetype;

            newImage.save(err => {
                if (err) throw err;
            });
        }
    });
}

export function retrieve (req, res) {
    if (req.hasOwnProperty('user')) {
      Image.find({}, {_id:0, __v:0}, (err, docs) => {
          if (err) throw err;
          res.send({
              data: docs,
              user: req.user.email
          });
      });
    }

    else {
      res.send({
          data: [],
          user: ''
      });
    }
}

export function deleteImage (req, res) {
    // Verify user is authenticated --- prevent non auth reqs
    if (req.user) {
      // look up img in question & delete
      Image.findOne({'title': req.body.title, 'user': req.user.email}, {_id:0, __v:0}).remove().exec();
    }
    // req is not authenticated, so ignore
}

export default {
  upload,
  retrieve,
  deleteImage
};
