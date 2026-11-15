import {
  parseContactRequest,
  sendContactMail,
  type ContactMailResponse,
} from "@/features/send-mail/server";

const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const INVALID_REQUEST_MESSAGE =
  "요청 형식이 올바르지 않아요. 페이지를 새로고침한 뒤 다시 보내 주세요.";
const SEND_FAILED_MESSAGE =
  "메일을 보내지 못했어요. 잠시 후 다시 시도하거나 eunoia0235@gmail.com으로 직접 보내 주세요.";

function respond(body: ContactMailResponse, status?: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error("문의 메일 요청을 읽지 못했어요.", error);
    return respond({ ok: false, message: INVALID_REQUEST_MESSAGE }, HTTP_BAD_REQUEST);
  }

  const parsed = parseContactRequest(formData);
  // 봇에게는 걸렸다는 걸 알리지 않도록 정상 전송과 같은 응답을 주고 버린다
  if (parsed.kind === "bot") return respond({ ok: true });
  if (parsed.kind === "invalid") {
    return respond({ ok: false, message: parsed.message }, HTTP_BAD_REQUEST);
  }

  try {
    await sendContactMail(parsed);
  } catch (error) {
    console.error("문의 메일 전송에 실패했어요.", error);
    return respond(
      { ok: false, message: SEND_FAILED_MESSAGE },
      HTTP_INTERNAL_SERVER_ERROR,
    );
  }

  return respond({ ok: true });
}
