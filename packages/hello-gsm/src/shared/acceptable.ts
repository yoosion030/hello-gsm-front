// 10월 16일 9시부터 10월 19일 17시 까지
// 원서 접수 및 증빙서류 제출 날짜
const acceptable =
  new Date() >= new Date('2023/10/16 9:00:00') &&
  new Date() <= new Date('2023/10/19 17:00:00');

export default acceptable;
