export const useFormatter = () => {
  /**
   * Ubah tanggal seperti 2026-07-01 13:08:32.824740 menjadi 1 Juli 2026
   * @param {Date} date
   * @returns
   */
  const dateFormatterLong = (date) => {
    const fullDate = new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return fullDate;
  };

  /**
   *
   * @param {String} params
   * @returns {String}
   *
   * format tanggal 'YYYY-MM-DD' menjadi 'DD BULAN_Short YYYY' dalam bahasa Indonesia
   */
  const dateFormatterShort = (params) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agus",
      "Sept",
      "Okt",
      "Nov",
      "Des",
    ];

    let current_datetime = new Date(params);
    let formatted_date =
      current_datetime.getDate() +
      " " +
      months[current_datetime.getMonth()] +
      " " +
      current_datetime.getFullYear();
    return formatted_date;
  };

  /**
   * Ubah tanggal seperti 2026-07-01 13:08:32.824740 menjadi 1 Juli 2026 • 13:08
   * @param {Date} date
   * @returns
   */
  const formateDateLongAndTime = (date) => {
    const fullDate = dateFormatterLong(date);
    const time = new Date(date);

    return `${fullDate} • ${time.getHours()}:${time.getMinutes()}`;
  };

  /**
   * Ubah angka seperti 50000 menjadi Rp50.000
   * @param {number} value
   */
  const formatNumberToMoney = (value) => {
    if (isNaN(value)) return "Rp0";

    return `Rp${value.toLocaleString("id-ID")}`;
  };

  /**
   * Ubah angka jadi format bahasa indonesia
   * @param {number} number
   */
  const formatNumberToLocale = (number) => {
    if (isNaN(number)) return "0";

    return number.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    });
  };

  /**
   * ubah angka sehingga memiliki akhiran seperti K atau M
   * 1000 > 1K
   * 1000000 > 1M
   * @param {number} number
   * @returns
   */
  const formatShortNumber = (number) => {
    if (number === null) return 0;

    const absForm = Math.round(Math.abs(number));

    if (absForm < 1000) {
      return formatNumberToLocale(absForm);
    } else if (1000 < absForm && absForm <= 999999) {
      return formatNumberToLocale(absForm / 1000) + "K";
    } else {
      return formatNumberToLocale((absForm / 1000000).toFixed(1)) + "M";
    }
  };

  return {
    dateFormatterShort,
    dateFormatterLong,
    formateDateLongAndTime,
    formatNumberToMoney,
    formatNumberToLocale,
    formatShortNumber,
  };
};
