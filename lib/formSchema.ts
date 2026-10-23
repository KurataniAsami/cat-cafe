import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください"}),

  subject: z
    .string()
    .min(2, {
    message: "タイトルは2文字以上で入力してください"
  }),

  email: z
    .string()
    .email ({ message: "適切なメールアドレスを入力してください" }),

  content: z
    .string()
    .min(10, { message: "本文は10文字以上で入力してください" })
    .max(160, { message: "本文は160文字以内で入力してください" }),


  // ファイルが選択されていない時 
  file: z
    .custom<FileList>()
    .refine((files) => files?.length !== 0, "ファイル画像が必要です")
    .refine((files) => files?.[0].size <= 5 * 1024 * 1024),  // サイズは24MBまで
});

//  npm install zod
// npm i @hookform/resolvers