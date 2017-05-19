const Storage = require('@google-cloud/storage');
const Vision = require('@google-cloud/vision');

/**
 * Triggered from a message on a Cloud Storage bucket.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
exports.processFile = function(event, callback) {
  const file = event.data;
  console.log('Processing file: ' + file.bucket + "/" + file.name);  
  
  // Instantiates a Vision and Storage client
  const vision = Vision();
  const storage = Storage();

  var options = {
    verbose: true
  };

  vision.detectLabels(storage.bucket(file.bucket).file(file.name), options, function(err, labels, apiResponse) {

    if (err) {
      console.log('Cloud Vision Error: ' + err);
    } else {
      // Log the JSON output of the Vision API
      console.log("Detect labels response: " + JSON.stringify(labels));
    }
  });
    
  
  callback();
};