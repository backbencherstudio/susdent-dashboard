export default function useGetDifference(data: string): string {
  const targetDate = new Date(data);
  const now = new Date();

  const diffMs = targetDate.getTime() - now.getTime();
  const absMs = Math.abs(diffMs);

  const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));

  const suffix = diffMs < 0 ? "ago" : "left";

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ${hours}h ${suffix}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes}m ${suffix}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ${suffix}`;
  }
  return "just now";
}
