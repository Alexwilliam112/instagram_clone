
export default function timestamp(date) {
  const now = new Date();
  const givenDate = new Date(date);
  const diffInMs = now - givenDate;
  const diffInMinutes = Math.round(diffInMs / 60000); // 1 minute = 60000 ms
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else {
    const diffInHours = Math.round(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
}