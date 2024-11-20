export interface Analytic {
    id: number;
    user_id: number;
    product_id: number;
    event_id: number;
    // event_type: string;
    event_data: Record<string, any>;
    page_url: string;
    timestamp: Date;
    geolocation: string;
    session_id: number;
    user_agent: string;
    duration: Date;
    // tech_metrics: string; //забыл че значит))
}

//ua.id, user_id, product_id, event_id, event_type, event_data, page_url, "timestamp", geolocation, session_id, user_agent, duration, tech_metrics

export interface Event {
    id: number;
    event_type: string;
}

export interface CreateAnalyticDto {
    user_id?: number;
    product_id?: number;
    event_id?: number;
    // event_type: string; подумать надо ли
    event_data?: Record<string, any>;
    page_url?: string;
    timestamp?: Date;
    geolocation?: string;
    browser?: string;
    session_id?: number;
    device_type?: string;
    duration?: Date;
    tech_metrics?: string;
}

export interface UpdateAnalyticDto {
    id: number;
    user_id?: number;
    product_id?: number;
    event_id?: number;
    event_data?: Record<string, any>;
    page_url?: string;
    timestamp?: Date;
    geolocation?: string;
    browser?: string;
    session_id?: number;
    device_type?: string;
    duration?: Date;
    tech_metrics?: string;
}