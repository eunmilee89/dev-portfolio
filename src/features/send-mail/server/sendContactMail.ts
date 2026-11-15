import nodemailer from "nodemailer";
import type { ContactFormValues } from "../model/validation";

const GMAIL_SERVICE = "gmail";
const SUBJECT_PREFIX = "[포트폴리오]";

interface SendContactMailParams {
  values: ContactFormValues;
  files: File[];
}

function getMailCredentials() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_USER, GMAIL_APP_PASSWORD 환경 변수를 설정해 주세요.");
  }
  return { user, pass };
}

function buildMailText({ name, email, message }: ContactFormValues) {
  return [`보낸 사람: ${name}`, `이메일: ${email}`, "", message].join("\n");
}

async function toMailAttachments(files: File[]) {
  return Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    })),
  );
}

/**
 * 방문자 주소를 from에 넣으면 Gmail이 사칭으로 보고 막으므로,
 * 내 계정에서 나에게 보내고 답장은 replyTo로 방문자에게 가게 한다.
 * 본문은 방문자 입력을 그대로 담기 때문에 HTML 없이 text로만 보낸다.
 */
export async function sendContactMail({ values, files }: SendContactMailParams) {
  const { user, pass } = getMailCredentials();
  const transporter = nodemailer.createTransport({
    service: GMAIL_SERVICE,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: { name: values.name, address: user },
    to: user,
    replyTo: { name: values.name, address: values.email },
    subject: `${SUBJECT_PREFIX} ${values.subject}`,
    text: buildMailText(values),
    attachments: await toMailAttachments(files),
  });
}
