import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { ErrorText, Form, FormAnnotation } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O nome do usuario deve conter pelo menos 3 letras" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O nome do usuario deve conter apenas letras e hifens",
    })
    .transform((username: string) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUserNameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUserNameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUserName(data: ClaimUsernameFormData) {
    console.log(data.username);
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUserName)}>
        <TextInput
          crossOrigin={undefined}
          size="sm"
          prefix="callme.com/"
          placeholder="seu-usuário"
          {...register("username")}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
        <FormAnnotation></FormAnnotation>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username ? (
            <ErrorText> {errors.username.message}</ErrorText>
          ) : (
            "Digite o nome do usuário desejado"
          )}
        </Text>
      </FormAnnotation>
    </>
  );
}
