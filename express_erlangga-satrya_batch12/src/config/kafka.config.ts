import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "book-service",
  brokers: ["localhost:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "notification-group" });

export const TOPICS = {
  BOOK_CHANGES: "book-changes",
  BOOK_DELETION_REQUESTS: "book-deletion-requests",
} as const;

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer connected");
  } catch (error) {
    console.error("Error connecting producer", error);
    throw error;
  }
};
