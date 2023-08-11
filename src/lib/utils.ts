import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(timestamp: Date): string {
  const currentTime = new Date();
  const previousTime = new Date(timestamp);
  const timeDifference = currentTime.getTime() - previousTime.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  switch (true) {
    case days > 0:
      return `${days}d`;
    case hours > 0:
      return `${hours}h`;
    case minutes > 0:
      return `${minutes}m`;
    default:
      return `${seconds}s`;
  }
}
