const EVENT_TYPES = {
    click: 1,
    scroll: 2,
    hover: 3,
    page_load: 4,
    form_submit: 5,
};

interface AnalyticsPayload {
    event_id: number;
    session_id: string;
    timestamp: number;
    page_url: string;
    user_agent: string;
    event_data: Record<string, any>;
    geolocation?: string; // Геолокация, если доступна
}

export const trackEvent = async (
    eventType: keyof typeof EVENT_TYPES,
    additionalData: Record<string, any>
) => {
    const eventId = EVENT_TYPES[eventType];
    if (!eventId) {
        console.error(`Unknown event type: ${eventType}`);
        return;
    }

    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('session_id', sessionId);
    }

    const userAgent = navigator.userAgent;

    // переделать
    let geolocation = 'unknown';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                geolocation = `${position.coords.latitude},${position.coords.longitude}`;
            },
            (error) => console.warn('Геолокация недоступна:', error)
        );
    }

    const payload: AnalyticsPayload = {
        event_id: eventId,
        session_id: sessionId,
        timestamp: Date.now(),
        page_url: window.location.href,
        user_agent: userAgent,
        event_data: additionalData,
        geolocation,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Ошибка отправки аналитики:', await response.text());
        }
    } catch (error) {
        console.error('Ошибка отправки аналитики:', error);
    }
};
