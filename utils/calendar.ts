
export function createIcsFile(title: string, description: string, startTime: Date, endTime: Date): void {
    const formatTime = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Synapse//Synapse App//EN',
        'BEGIN:VEVENT',
        `UID:${crypto.randomUUID()}@synapse.app`,
        `DTSTAMP:${formatTime(new Date())}`,
        `DTSTART:${formatTime(startTime)}`,
        `DTEND:${formatTime(endTime)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
