
const sendAnalytics = async (eventData: Record<string, any>) => {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...eventData,
                timestamp: Date.now(),
                session_id: localStorage.getItem('session_id') || generateSessionId(),
            }),
        });
    } catch (error) {
        console.error('Ошибка отправки аналитики:', error);
    }
};


// рандом или автозаполнение, подумать
const generateSessionId = (): string => {
    const sessionId = Math.random().toString(36).substring(2);
    localStorage.setItem('session_id', sessionId);
    return sessionId;
};


export default sendAnalytics;
