CREATE KEYSPACE dlq 
WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};

use dlq;

CREATE TABLE "event_dlq" (
"message_id" varchar PRIMARY KEY,
"status" varchar,
"type" varchar
) WITH COMPRESSION = { 'sstable_compression' : 'DeflateCompressor', 'chunk_length_kb' : '128' };