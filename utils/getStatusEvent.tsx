export function getStatusEvent(start: Date, end: Date): string {
  const now = new Date();

  return now < start ? "Belum dibuka" : now <= end ? "Dibuka" : "Ditutup";
}
