import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnetItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Register() {
  const router = useRouter();
  const session = useSession();
  const isSingedIn = session.status === "authenticated";

  const hasAuthError = !!router.query.error;

  async function handleConnectCalendar() {
    await signIn("google");
  }

  async function handleNavigateToNextStep() {
    await router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo title="Conecte a sua agenda Google | Call-me" noindex />
      <Container>
        <Header>
          <Heading as="strong">Bem vindo ao Call-me</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
          <ConnectBox>
            <ConnetItem>
              <Text>Google Calendar</Text>
              {isSingedIn ? (
                <Button size="sm" disabled>
                  Conectado
                  <Check />
                </Button>
              ) : (
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={() => handleConnectCalendar()}
                >
                  Conectar
                  <ArrowRight />
                </Button>
              )}
            </ConnetItem>
            {hasAuthError && (
              <AuthError>
                Falha ao se conectar ao Google, verifique se você habilitou as
                permissões de acesso ao Google Calendar.
              </AuthError>
            )}
            <Button
              onClick={handleNavigateToNextStep}
              type="submit"
              disabled={!isSingedIn}
            >
              Proximo passo
              <ArrowRight />
            </Button>
          </ConnectBox>
        </Header>
      </Container>
    </>
  );
}
