export function getInitials(fullName: string) {
  const nameParts = fullName.split(' ');
  const firstPart = nameParts[0];
  const lastPart = nameParts[nameParts.length - 1];

  return [firstPart, lastPart].map(getFirstLetterAsUppercase).join('');
}

function getFirstLetterAsUppercase(word: string) {
  return word.slice(0, 1).toUpperCase();
}
