const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export function formatDate(dateProp: string) {
  const date = new Date(dateProp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${day} ${months[month]} ${year} ${hours}:${minutes}`;
}

export function formatDateWithoutTime(dateProp: string) {
  const date = new Date(dateProp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[month]} ${year}`;
}

export function formatDayWithoutTime(date: Date) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${days[date.getDay()]}, ${day} ${months[month]} ${year}`;
}

export function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff} detik lalu`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} menit lalu`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} jam lalu`;
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} hari lalu`;
  } else if (diff < 2629800) {
    const weeks = Math.floor(diff / 604800);
    return `${weeks} minggu lalu`;
  } else if (diff < 31557600) {
    const months = Math.floor(diff / 2629800);
    return `${months} bulan lalu`;
  } else {
    const years = Math.floor(diff / 31557600);
    return `${years} tahun lalu`;
  }
}
