export function isNewProduct(createdAt: string) {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInTime = now.getTime() - createdDate.getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  return diffInDays <= 7;
}
