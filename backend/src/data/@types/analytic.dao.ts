export interface CreateAnalyticDao {
    user_id: number;
    product_id: number;
    event_id: number;
    event_data?: JSON;
    page_url?: string;
    timestamp?: Date;
    geolocation?: string;
    browser?: string;
    session_id?: number;
    device_type?: string;
    duration?: Date;
    tech_metrics?: string;
}

export interface UpdateAnalyticDao {
    id: number;
    user_id: number;
    product_id: number;
    event_id?: number;
    event_data?: JSON;
    page_url?: string;
    timestamp?: Date;
    geolocation?: string;
    browser?: string;
    session_id?: number;
    device_type?: string;
    duration?: Date;
    tech_metrics?: string;
}