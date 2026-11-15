const BYTES_PER_MB = 1024 * 1024;

/** Vercel 함수는 요청 본문이 4.5MB까지라, 텍스트와 multipart 여유분을 빼고 첨부 합계를 4MB로 둔다 */
export const MAX_TOTAL_FILE_SIZE_MB = 4;
export const MAX_TOTAL_FILE_SIZE_BYTES = MAX_TOTAL_FILE_SIZE_MB * BYTES_PER_MB;
export const MAX_FILE_COUNT = 3;

export const MAX_NAME_LENGTH = 50;
export const MAX_SUBJECT_LENGTH = 100;
export const MIN_MESSAGE_LENGTH = 10;
export const MAX_MESSAGE_LENGTH = 5000;
/** 스팸은 대부분 광고 링크를 여러 개 넣으므로 정상 문의에 필요한 정도만 허용한다 */
export const MAX_MESSAGE_LINK_COUNT = 2;

/** 클라이언트와 서버가 같은 이름으로 첨부를 주고받는다 */
export const ATTACHMENT_FIELD_NAME = "attachments";
