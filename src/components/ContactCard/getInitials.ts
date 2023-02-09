export function getInitials(fullName: string) {
  return fullName.split(' ').map(getFirstLetterAsUppercase).join('');
}

function getFirstLetterAsUppercase(word: string) {
  return word.slice(0, 1).toUpperCase();
}
