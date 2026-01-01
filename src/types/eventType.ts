export type EventData = {
  id: string
  eventName: string;
  image: string | null;
  backgroundImage: string | null;
  phone: string;
  dateTime: string;
  location: string;
  cost: string;
  description: string;
  capacity?: string | null;
  links: string[];
  createdAt: string;
};