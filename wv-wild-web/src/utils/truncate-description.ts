/**
 * Word-boundary-aware text truncation for meta descriptions.
 * Truncates at the last space or punctuation mark within maxLength,
 * appending "..." only when truncation occurs.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 150)
 * @returns Truncated text with "..." if needed, or original if short enough
 */
export function truncateDescription(text: string, maxLength = 150): string {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const lastPunctuation = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf(','),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );
  const breakPoint = Math.max(lastSpace, lastPunctuation);

  return (breakPoint > 0 ? truncated.slice(0, breakPoint) : truncated).trim() + '...';
}
