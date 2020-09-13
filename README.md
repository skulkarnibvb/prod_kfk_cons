# prod_kfk_cons
docker run --name zookeeper -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest
From <https://github.com/bitnami/bitnami-docker-zookeeper/issues/22> 
docker exec -it <container name> /bin/bash
---
- docker-compose up
- docker-compose exec broker kafka-topics --create --bootstrap-server localhost:29092 --replication-factor 1 --partitions 1 --topic kafka-example-topic

From <https://docs.confluent.io/current/quickstart/cos-docker-quickstart.html> 

--
https://ksqldb.io/quickstart.html
docker exec -it ksqldb-cli ksql http://ksqldb-server:8088
CREATE STREAM kafkaexamplestream (messageId VARCHAR, status VARCHAR, type VARCHAR) WITH (kafka_topic='kafka-example-topic', value_format='json');
--
excercise via cli;
Run zookeeper: docker run -p 2181:2181 --name zookeeper --privileged -v C:\Users\h393956\docker\zk -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest

Run Kafka: docker run -p 9092:9092 --name kafka --env KAFKA_CFG_ZOOKEEPER_CONNECT=host.docker.internal:2181 --privileged -v C:\Users\h393956\docker\kafka -e ALLOW_PLAINTEXT_LISTENER=yes bitnami/kafka:latest

Create topic: bin/kafka-topics.sh --create --zookeeper host.docker.internal:2181 --replication-factor 1 --partitions 1 --topic kafka-example-topic

List topic: bin/kafka-topics.sh --list --zookeeper host.docker.internal:2181

// Produce to topic
kafka-console-producer.sh --broker-list host.docker.internal:9092 --topic kafka-example-topic

// consume from topic
kafka-console-consumer.sh --bootstrap-server host.docker.internal:9092 --topic kafka-example-topic --from-beginning
---
ksql commands;
---
to delete ctas: terminate <name>
to create ctas: create table <name> with(partitions=2) as select * from <table_name> emit changes;
to create table: CREATE TABLE <table_name> (messageId varchar primary key, status varchar, type varchar) with (kafka_topic=<topic>, value_format='JSON');
-----------------------------------------------------------------------------------------
run cassandra: cassandra
run cli: cqlsh
import keyspace: source 'cql file path'
------------------------------------------------------------------------------------------
Nifi - details;

kafka consumer processor -> ConsumerKafka_1_0
config details;
kafka brokers: list of known/running broker/kafka host:port (broker:29092,localhost:29092)
sec protocol: PLAINTEXT
provide topic name, group id (anything), attribute encoding (utf8)
Under settings tab: automatically terminate relationships

cassandra updater -> PutCassandraRecord
Under Settings: automatically terminate relationships
Under properties;
cassandra contact points: where db is running (localhost:9042)
provide keyspace, table names
statement type: insert/whatever is the requirement
- create a recordreader: (in my case i created a JsonTreeReader)

Join the flow between the processors