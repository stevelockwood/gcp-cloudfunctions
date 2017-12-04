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

  const request = {
    source: {
      imageUri: `gs://${file.bucket}/${file.name}`
    }
  };

  // Performs label detection on the gcs file
  vision.labelDetection(request)
    .then((results) => {
      const labels = results[0].labelAnnotations;
      //console.log("Labels found for " + file.name + JSON.stringify(labels));
      const filename = file.name;
      labels.forEach((label) => console.log(filename + ", Label: " + label.description + ", Score: " + label.score));
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  
  callback();
};