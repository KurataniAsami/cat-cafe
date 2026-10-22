'use client'

import { useMailForm } from "@/hooks/useMailForm";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function MailForm() {
  const { form, onSubmit } = useMailForm();

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

            {/* usernameがエラーの場合 */}
            {form.formState.errors.username && (
              <FieldError>
                {form.formState.errors.username.message}
              </FieldError>
            )}
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

            {form.formState.errors.email && (
              <FieldError>
                {form.formState.errors.email.message}
              </FieldError>
            )}
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

            {form.formState.errors.subject && (
              <FieldError>
                {form.formState.errors.subject.message}
              </FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="content">
              本文
            </FieldLabel>

            <Textarea
              id="content"
              {...form.register("content")}
              placeholder="本文を入力してください"
            />

            {form.formState.errors.content && (
              <FieldError>
                {form.formState.errors.content.message}
              </FieldError>
            )}
          </Field>

            {/* 画像 */}
          <Field>
            <FieldLabel htmlFor="subject">
              タイトル
            </FieldLabel>

            <Input
              id="subject"
              {...form.register("subject")}
              placeholder="タイトルを入力してください"
            />

            {form.formState.errors.subject && (
              <FieldError>
                {form.formState.errors.subject.message}
              </FieldError>
            )}
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