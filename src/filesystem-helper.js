function filesystemHelper(app) {

   var crypto = require('crypto');

   return {
      /**
      * streamToBuffer function
      * conver stream to buffer
      *
      * @return {Object} Buffer
      */
      streamToBuffer: function(stream, callback) {
         var mybuff = new Buffer(0);

         stream.on('error',function(e){
            callback(e);
         });

         stream.on('data', function(chunk) {
            mybuff = Buffer.concat([mybuff,chunk]);
         });

         stream.on('end', function() {
            callback(null, mybuff);
         });
      },

      /**
      * getRandomFilename function
      * replace file name by random file name
      *
      * @return {String} random filename
      */
      getRandomFilename: function(filename) {
         // regex for extension, see http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
         var re = /(?:\.([^.]+))?$/;
         var ext = re.exec(filename)[1];

         var randomFilename = crypto.randomBytes(20).toString('hex');
         if (ext)
            randomFilename += '.' + ext.toLowerCase();

         return randomFilename;
      }

   };
};

module.exports = filesystemHelper;