'use client'

import { LoginFormValues } from "./types/login-form-values";
import Form from "@/src/components/logic/form";
import { loginSchema } from "./schemas/login.schema";
import { Box, Input, Button, Center, VStack } from "@chakra-ui/react";
import { Field } from "@/src/components/ui/field";
import { useAPI } from "@/src/hooks/api";
import { useState } from "react";
import { toaster } from "@/src/components/ui/toaster";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "@/src/constants/token";

export default function Login() {

  const [login, setLogin] = useState(false);

  const { apiPost } = useAPI();
  const { push } = useRouter();

  const handleLogin = (payload: LoginFormValues) => {
    const endPoint = "/auth";
    toaster.promise(
      apiPost<LoginFormValues, { token: string }>({ endPoint, payload }).then((response) => {
        console.log("Login Success: ", response.data.token);
        Cookies.set(TOKEN_KEY, response.data.token, { expires: 1, path: "/" });
        push("/home/notes");
      }),
      {
        loading: { title: "Realizando Operação...", description: "Aguarde" },
        success: {
          title: "Sucesso!",
          description: "Login Realizado com sucesso!",
        },
        error: {
          title: "Erro!",
          description: "Email ou Senha Errados!",
        },
      }
    );
  };

  const handleRegister = (payload: LoginFormValues) => {
    const endPoint = "/user";
    toaster.promise(
      apiPost<LoginFormValues, void>({ endPoint, payload }),
      {
        loading: { title: "Criando Conta...", description: "Aguarde" },
        success: {
          title: "Sucesso!",
          description: "Conta criada com sucesso!",
        },
        error: {
          title: "Erro!",
          description: "Email já em uso.",
        },
      }
    );
  };

  return (
    <Center height="100vh">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        width="100%"
        maxWidth="400px"
      >
        <Form<LoginFormValues>
          schema={loginSchema}
          onSubmit={login ? handleLogin : handleRegister}
        >
          {({ register, errors }) => (
            <VStack p={4} align="stretch">
              <Field label="Email" errorText={errors.email?.message} invalid={!!errors.email}>
                <Input
                  placeholder="Email"
                  variant="outline"
                  {...register("email")}
                  required
                />
              </Field>

              <Field label="Senha" errorText={errors.password?.message} invalid={!!errors.password}>
                <Input
                  placeholder="Senha"
                  variant="outline"
                  type="password"
                  {...register("password")}
                  required
                />
              </Field>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                mt={4}
              >
                {login ? "Entrar" : "Criar Conta"}
              </Button>

              <Button
                colorScheme="blue"
                variant="outline"
                size="lg"
                mt={4}
                onClick={() => setLogin(!login)}
              >
                { login ? "Não possui uma conta? Crie uma." : "Já Possui uma conta? Entre nela."}
              </Button>
            </VStack>
          )}
        </Form>
      </Box>
    </Center>
  );
}
