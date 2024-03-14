export function convertType(type: string | undefined) {
  switch (type) {
    case 'NIGHTMARE':
      return ' nightmare';
    case 'NOT_NIGHTMARE':
      return null;
    default:
      return null;
  }
}
