export interface Analytic {
    id: number;
    user_id: number;
    product_id: number;
    event_id: number;
    event_data: Record<string, any>;
    page_url: string;
    timestamp: Date;
    geolocation: string;
    // browser: string;
    // session_id: number;
    // device_type: string;
    duration: Date;
    // tech_metrics: string; //забыл че значит))
    user_agent: string;
}

export interface Event {
    id: number;
    event_type: string;
}

export interface CreateAnalyticDto {
    user_id: number;
    product_id: number;
    event_id: number;
    event_data?: Record<string, any>; //нужна ли здесь??
    page_url?: string;
    timestamp?: Date; //?
    geolocation?: string;
    browser?: string;
    session_id?: number;
    device_type?: string;
    duration?: Date;
    tech_metrics?: string;
}

export interface UpdateAnalyticDto {
    id: number;
    user_id: number;
    product_id: number;
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