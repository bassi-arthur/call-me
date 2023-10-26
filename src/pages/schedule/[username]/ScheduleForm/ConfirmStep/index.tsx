import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { Clock } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa no mínimo de tres caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export default function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  function handleConfirmScheduling() {}
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>22 de setembro 2022</Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput
          placeholder="Seu nome"
          crossOrigin={undefined}
          {...register("name")}
        />
        {errors.name && (
          <FormError size={"sm"}>{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          placeholder="johndoe@example.com"
          crossOrigin={undefined}
          {...register("email")}
        />
        {errors.email && (
          <FormError size={"sm"}>{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register("observations")} />
      </label>
      <FormActions>
        <Button type="button" variant={"tertiary"}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
