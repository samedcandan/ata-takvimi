import { HALK_TAKVIMI_EVENTS, DAILY_TARIM_PROVERBS } from '../data/halk-takvimi';

export function getTurkishDateFormatted(date = new Date()) {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  const days = [
    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"
  ];

  return {
    dayNumber: date.getDate(),
    monthName: months[date.getMonth()],
    monthIndex: date.getMonth() + 1,
    year: date.getFullYear(),
    dayName: days[date.getDay()],
    fullString: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${days[date.getDay()]}`
  };
}

export function getHalkTakvimiEventForDate(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const exactEvent = HALK_TAKVIMI_EVENTS.find(e => e.month === month && e.day === day);
  if (exactEvent) return exactEvent;

  // Find nearest upcoming event in the current month
  const upcomingEvent = HALK_TAKVIMI_EVENTS.find(e => e.month === month && e.day >= day);
  if (upcomingEvent) {
    const diffDays = upcomingEvent.day - day;
    return {
      ...upcomingEvent,
      isUpcoming: true,
      diffDays,
      displayNote: `${upcomingEvent.title} (${diffDays === 0 ? 'Bugün' : diffDays + ' gün kaldı'})`
    };
  }

  // Fallback to general seasonal event
  return {
    title: "Normal Tarım ve Bakım Günü",
    category: "genel",
    desc: "Toprak ve mahsul kontrollerini aksatmayın. Ay safhasına göre sulama ve çapayı ayarlayın.",
    icon: "🌱"
  };
}

export function getRandomProverb(date = new Date()) {
  const index = (date.getFullYear() + date.getMonth() + date.getDate()) % DAILY_TARIM_PROVERBS.length;
  return DAILY_TARIM_PROVERBS[index];
}
