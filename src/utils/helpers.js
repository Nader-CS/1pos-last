export const convertEnglishNumbersToArabic = (number, locale) => {
  return number !== null && (number || number === 0) && locale === 'ar'
    ? number
        .toString()
        .replace(/[0-9]/g, c => String.fromCharCode(parseInt(c) + 1632))
    : number;
};
