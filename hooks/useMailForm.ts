// バリデーションと送信処理をまとめたカスタムフック

import { useForm } from "react-hook-form"
import { formSchema } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react";

export const useMailForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      subject: "",
      email: "",
      content: "",
    },
  });

  const onSubmit = useCallback((values: any) => {
    console.log(values)
  },[]);  // 第2引数が配列になる

  // const onSubmit = (values: {
  //   username: string;
  //   subject: string;
  //   email: string;
  //   content: string;
  //   }) => {
  //   console.log("送信成功", values);
  // }

  return { form, onSubmit };
}

