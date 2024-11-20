export interface CreateAnalyticDao {
    user_id?: number;
    product_id?: number;
    event_id?: number;
    event_data?: Record<string, any>;
    page_url?: string;
    timestamp?: Date;
    geolocation?: string;
    session_id?: number;
    user_agent?: string;
    duration?: Date;
    tech_metrics?: string;
}

export interface UpdateAnalyticDao {
    id: number;
    user_id?: number;
    product_id?: number;
    event_id?: number;
    event_data?: Record<string, any>;
    page_url?: string;
    timestamp?: Date;
    geolocation?: string;
    session_id?: number;
    user_agent?: string;
    duration?: Date;
    tech_metrics?: string;
}