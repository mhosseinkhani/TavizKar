export class StringHelper {
  convertNumbers2English(str) {
    str.replace(
      /([٠١٢٣٤٥٦٧٨٩])|([۰۱۲۳۴۵۶۷۸۹])/g,
      (m, $1) => m.charCodeAt(0) - ($1 ? 1632 : 1776)
    );
  }
}
