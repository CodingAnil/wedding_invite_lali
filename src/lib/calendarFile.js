function fold(line) {
  const parts = [];
  let remaining = line;
  parts.push(remaining.slice(0, 74));
  remaining = remaining.slice(74);
  while (remaining.length > 0) {
    parts.push(` ${remaining.slice(0, 73)}`);
    remaining = remaining.slice(73);
  }
  return parts.join("\r\n");
}

function escapeText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function stamp() {
  return new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function buildIcs(event) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Akash and Rimpi//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${stamp()}`,
    `DTSTART;VALUE=DATE:${event.startDate}`,
    `DTEND;VALUE=DATE:${event.endDate}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.location)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n");
}

export function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.startDate}/${event.endDate}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadCalendarFile(event) {
  try {
    const blob = new Blob([buildIcs(event)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "akash-rimpi-wedding.ics";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 2500);
    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "This browser could not create the calendar file. Use Google Calendar instead.",
    };
  }
}
