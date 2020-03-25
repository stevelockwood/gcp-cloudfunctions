//NodeJS 8

'use strict';

const vision = require('@google-cloud/vision');

/**
 * Triggered from a message on a Cloud Storage bucket.
 * Parameters changed in Nodejs 8
 */
exports.processFile = (data, context, callback) => {
  const file = 'gs://' + data.bucket + '/' + data.name;
  console.log('Processing file: ' + file);  
  
  // Instantiates a Vision and Storage client
  const vision_client = new vision.ImageAnnotatorClient();

  // Performs label detection on the gcs file
  return vision_client.labelDetection(file)
    .then((results) => {
      const labels = results[0].labelAnnotations;
      labels.forEach((label) => console.log(file + ", Label: " + label.description + ", Score: " + label.score));
    })
    .catch((err) => {
      console.error('ERROR processing image: ', err);
    });
  
  };
