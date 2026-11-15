// 서버 전용 코드(Nodemailer, 환경 변수)가 클라이언트 번들에 섞이지 않도록 ../index.ts와 진입점을 나눈다
export { parseContactRequest } from "./parseContactRequest";
export { sendContactMail } from "./sendContactMail";
export type { ContactMailResponse } from "../model/contactResponse";
