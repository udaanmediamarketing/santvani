// lib/slugify.ts
export function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFKD')               // normalize unicode
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // keep ALL letters (Marathi included)
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('mr-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}