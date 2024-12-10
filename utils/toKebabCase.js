export const toKebabCase = (str) => {
  // Si c'est une clé de traduction (contient un point), prendre la dernière partie
  const text = str.includes('.') ? str.split('.').pop() : str;
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr)
    .replace(/^-+|-+$/g, '');
};
