// Custom Calendar Integration Solution
// This is a self-contained solution that doesn't require external libraries

class CalendarIntegration {
    constructor(eventDetails) {
        this.event = {
            title: eventDetails.title || "Event",
            description: eventDetails.description || "",
            location: eventDetails.location || "",
            startDate: eventDetails.startDate, // Format: "2025-12-02"
            startTime: eventDetails.startTime, // Format: "16:00"
            endTime: eventDetails.endTime,     // Format: "20:00"
            timezone: eventDetails.timezone || "Asia/Kolkata"
        };
    }

    // Convert date and time to required formats
    getFormattedDateTime(date, time, timezone) {
        const datetime = `${date}T${time}:00`;
        const dateObj = new Date(datetime);

        // Format for calendar URLs (YYYYMMDDTHHmmss)
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = time.split(':')[0];
        const minutes = time.split(':')[1];

        return `${year}${month}${day}T${hours}${minutes}00`;
    }

    // Generate Google Calendar URL
    getGoogleCalendarUrl() {
        const startDateTime = this.getFormattedDateTime(this.event.startDate, this.event.startTime);
        const endDateTime = this.getFormattedDateTime(this.event.startDate, this.event.endTime);

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: this.event.title,
            details: this.event.description,
            location: this.event.location,
            dates: `${startDateTime}/${endDateTime}`,
            ctz: this.event.timezone
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    // Generate Outlook Web Calendar URL
    getOutlookCalendarUrl() {
        const startDateTime = `${this.event.startDate}T${this.event.startTime}`;
        const endDateTime = `${this.event.startDate}T${this.event.endTime}`;

        const params = new URLSearchParams({
            path: '/calendar/action/compose',
            rru: 'addevent',
            subject: this.event.title,
            body: this.event.description,
            location: this.event.location,
            startdt: startDateTime,
            enddt: endDateTime
        });

        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
    }

    // Generate Yahoo Calendar URL
    getYahooCalendarUrl() {
        const startDateTime = this.getFormattedDateTime(this.event.startDate, this.event.startTime);
        const endDateTime = this.getFormattedDateTime(this.event.startDate, this.event.endTime);

        const params = new URLSearchParams({
            v: '60',
            title: this.event.title,
            desc: this.event.description,
            in_loc: this.event.location,
            st: startDateTime,
            et: endDateTime
        });

        return `https://calendar.yahoo.com/?${params.toString()}`;
    }

    // Generate .ics file content for Apple Calendar and others
    generateICSFile() {
        const startDateTime = this.getFormattedDateTime(this.event.startDate, this.event.startTime);
        const endDateTime = this.getFormattedDateTime(this.event.startDate, this.event.endTime);
        const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Your Organization//Your Product//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `UID:${timestamp}@yourdomain.com`,
            `DTSTAMP:${timestamp}`,
            `DTSTART;TZID=${this.event.timezone}:${startDateTime}`,
            `DTEND;TZID=${this.event.timezone}:${endDateTime}`,
            `SUMMARY:${this.event.title}`,
            `DESCRIPTION:${this.event.description.replace(/\n/g, '\\n')}`,
            `LOCATION:${this.event.location}`,
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        return icsContent;
    }

    // Download .ics file for Apple Calendar
    downloadICSFile(filename = 'event.ics') {
        const icsContent = this.generateICSFile();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }

    // Open calendar based on provider
    openCalendar(provider) {
        switch(provider) {
            case 'google':
                window.open(this.getGoogleCalendarUrl(), '_blank');
                break;
            case 'outlook':
                window.open(this.getOutlookCalendarUrl(), '_blank');
                break;
            case 'yahoo':
                window.open(this.getYahooCalendarUrl(), '_blank');
                break;
            case 'apple':
            case 'ical':
                this.downloadICSFile(`${this.event.title.replace(/\s+/g, '-').toLowerCase()}.ics`);
                break;
            default:
                console.error('Unsupported calendar provider');
        }
    }

    // Create a dropdown button UI
    createDropdownButton(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found');
            return;
        }

        // Create button and dropdown HTML
        const dropdownHTML = `
            <div class="calendar-dropdown" style="position: relative; display: inline-block;">
                <button id="calendar-btn" class="calendar-button" style="
                    background: linear-gradient(to right, #f9fafb, #f8fafc);
                    color: #475569;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    padding: 0.75rem 1.25rem;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    transition: all 0.2s;
                ">
                    <span>Add to Calendar</span>
                </button>
                <div id="calendar-options" class="calendar-options" style="
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    margin-top: 0.5rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    min-width: 200px;
                    z-index: 1000;
                ">
                    <button onclick="calendarIntegration.openCalendar('apple')" style="
                        display: block;
                        width: 100%;
                        padding: 0.75rem 1rem;
                        text-align: left;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #475569;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='none'">
                        🍎 Apple Calendar
                    </button>
                    <button onclick="calendarIntegration.openCalendar('google')" style="
                        display: block;
                        width: 100%;
                        padding: 0.75rem 1rem;
                        text-align: left;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #475569;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='none'">
                        📅 Google Calendar
                    </button>
                    <button onclick="calendarIntegration.openCalendar('outlook')" style="
                        display: block;
                        width: 100%;
                        padding: 0.75rem 1rem;
                        text-align: left;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #475569;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='none'">
                        📧 Outlook
                    </button>
                    <button onclick="calendarIntegration.openCalendar('ical')" style="
                        display: block;
                        width: 100%;
                        padding: 0.75rem 1rem;
                        text-align: left;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #475569;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='none'">
                        📄 Download .ics
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = dropdownHTML;

        // Add click handler for dropdown toggle
        const btn = document.getElementById('calendar-btn');
        const options = document.getElementById('calendar-options');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            options.style.display = options.style.display === 'none' ? 'block' : 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            options.style.display = 'none';
        });
    }
}

// Example usage:
// const calendar = new CalendarIntegration({
//     title: "Sandip & Anokhi's Wedding",
//     description: "Join us as we celebrate our wedding!",
//     location: "Turf Club Garden, Camp, Pune, Maharashtra, India",
//     startDate: "2025-12-02",
//     startTime: "16:00",
//     endTime: "20:00",
//     timezone: "Asia/Kolkata"
// });
// calendar.createDropdownButton('calendar-container');