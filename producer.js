const Kafka = require('kafka-node');
const config  = require('./config');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({kafkaHost: "localhost:29092"});
const producer = new Producer(client,  {requireAcks: 0, partitionerType: 2});



const pushDataToKafka =(dataToPush) => {

  try {
  let payloadToKafkaTopic = [{topic: "deadend", messages: JSON.stringify(dataToPush) }];
  console.log(payloadToKafkaTopic);
  producer.on('ready', async function() {
    producer.send(payloadToKafkaTopic, (err, data) => {
          console.log('data: ', data);
  });

  producer.on('error', function(err) {
    //  handle error cases here
  })
  })
  }
catch(error) {
  console.log(error);
}

};


const jsonData = require('./app_json.js');

pushDataToKafka(jsonData);