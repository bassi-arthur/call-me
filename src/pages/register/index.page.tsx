import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/src/lib/axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O nome do usuario deve conter pelo menos 3 letras" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O nome do usuario deve conter apenas letras e hifens",
    })
    .transform((username: string) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: "O nome precisa de pelo menos 3 letras." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });
      await router.push("/register/connect-calendar");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte a sua agenda!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil. Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuario</Text>
          <TextInput
            prefix="callme.com/"
            placeholder="seu-usuario"
            {...register("username")}
            crossOrigin={undefined}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>
        <label>
          <Text size="sm">Nome de completo</Text>
          <TextInput
            placeholder="seu nome"
            {...register("name")}
            crossOrigin={undefined}
          />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Proximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
