const EVENT_TYPES = {
    click: 1,
    scroll: 2,
    hover: 3,
    page_load: 4,
    form_submit: 5,
};


export const trackEvent = async (eventType: keyof typeof EVENT_TYPES, additionalData: Record<string, any>) => {
    const eventId = EVENT_TYPES[eventType];
    if (!eventId) {
        console.error(`Unknown event type: ${eventType}`);
        return;
    }


    const sessionId = localStorage.getItem('session_id') || 'unknown';
    const userAgent = navigator.userAgent;


    const payload = {
        event_id: eventId,
        session_id: sessionId,
        timestamp: Date.now(),
        page_url: window.location.href,
        user_agent: userAgent,
        event_data: additionalData,
    };


    try {
        await fetch(`${process.env.REACT_APP_API_URL}/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error('Ошибка отправки аналитики:', error);
    }
};
