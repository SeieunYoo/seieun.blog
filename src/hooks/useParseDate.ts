function useParseDate(dateNumber: number) {
  const dateString = dateNumber.toString();
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10);
  const day = parseInt(dateString.slice(6, 8), 10);

  return { year, month, day };
}

export default useParseDate;
