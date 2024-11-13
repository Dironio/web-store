export interface UserAnalytic {
    id: number;
    userId: number;
    productId: number;
    eventId: number;
    event_data: JSON;
    page_url: string;
    timestamp: Date;
}

export interface Event {
    id: number;
    event_type: string;
}