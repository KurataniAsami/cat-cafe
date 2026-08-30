'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/lib/formSchema"

export default function MailForm() {
  const form = useForm({resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      subject: "",
      email: "",
      content: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <form
        onSubmit={() => {
          form.handleSubmit(onsubmit)
        }}
      >
        <FieldSet>
        <FieldLegend>お問い合わせ</FieldLegend>

        <FieldDescription>
          お問い合わせ内容を入力してください。
        </FieldDescription>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">
              お名前
            </FieldLabel>

            <Input
              id="username"
              {...form.register("username")}
              placeholder="お名前を入力してください"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">
              メールアドレス
            </FieldLabel>

            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="example@example.com"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="subject">
              タイトル
            </FieldLabel>

            <Input
              id="subject"
              {...form.register("subject")}
              placeholder="タイトルを入力してください"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="content">
              本文
            </FieldLabel>

            <Input
              id="content"
              {...form.register("content")}
              placeholder="本文を入力してください"
            />
          </Field>

          <Button type="submit">
            送信
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
    </div>
  )
}