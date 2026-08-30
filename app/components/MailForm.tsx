'use client'

import { useForm } from "react-hook-form"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MailForm() {

  const form = useForm();

  return (
    <div>
      <form onSubmit={(value: any) => {}} >
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
              id="name"
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
              placeholder="example@example.com"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="message">
              お問い合わせ内容
            </FieldLabel>
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