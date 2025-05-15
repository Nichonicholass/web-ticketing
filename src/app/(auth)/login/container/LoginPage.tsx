"use client";

import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import withAuth from "@/components/hoc/withAuth";
import UnstyledLink from "@/components/links/UnstyledLink";
import { REG_EMAIL, REG_PASSWORD } from "@/constant/regex";
import { LoginRequest } from "@/types/login";
import { FormProvider, useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/mutation";

export default withAuth(LoginPage, "public");
function LoginPage() {
  //#region //*=========== Form ===========
  const methods = useForm<LoginRequest>({
    mode: "onTouched",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region //*=========== Submit Handler ===========
  const { mutate, isPending } = useLoginMutation();
  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };
  //#endregion  //*======== Submit Handler ===========

  return (
    <main className="w-full h-full md:h-screen flex flex-wrap bg-typo-main justify-around p-5 max-md:p-3 md:overflow-hidden">
      <section className="w-full md:w-[55%] min-h-[50vh] md:h-screen flex flex-1 flex-col justify-center items-center px-0 py-1 md:py-10">
        <div className="w-full md:px-[18%] backdrop-blur-md py-6 px-3 rounded-2xl">
          <div className="mb-4 text-left flex justify-start flex-col gap-2 md:gap-1">
            <Typography
              font="ArgentumSans"
              weight="semibold"
              variant="h4"
              className="text-slate-900 text-4xl"
            >
              LOGIN
            </Typography>
            <Typography
              variant="c1"
              font="ArgentumSans"
              weight="regular"
              className="text-slate-900 text-sm"
            >
              Silakan Masuk Dengan Akun Anda
            </Typography>
          </div>
          <FormProvider {...methods}>
            <form
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="email"
                    label="Email"
                    labelTextClassName="text-slate-900"
                    placeholder="Masukan alamat email"
                    className="bg-transparent text-slate-900 caret-white"
                    helperText="Format email: example@gmail.com"
                    helperTextClassName="text-slate-900"
                    validation={{
                      required: "Email tidak boleh kosong!",
                      pattern: {
                        value: REG_EMAIL,
                        message: "Masukkan email yang valid!",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  labelTextClassName="text-slate-900"
                  className="bg-transparent text-slate-900 caret-white focus:bg-transparent ring-white"
                  placeholder="Masukan password"
                  validation={{
                    required: "Password tidak boleh kosong!",
                    pattern: {
                      value: REG_PASSWORD,
                      message:
                        "Kata sandi harus mengandung minimal 8 karakter yang terdiri atas kombinasi huruf besar, huruf kecil, dan angka",
                    },
                  }}
                />
                <UnstyledLink
                  href="/forgot-password"
                  className="text-sm text-reeva-main transition-colors w-full flex justify-end pt-3"
                >
                  Lupa password?
                </UnstyledLink>
              </div>
              <Button
                type="submit"
                variant="slate"
                disabled={!isValid}
                isLoading={isPending}
                className="rounded-md font-medium mt-4 shadow-lg text-slate-900"
              >
                Masuk
              </Button>
              <div className="mt-6 text-center">
                <Typography variant="c1" className="text-slate-900">
                  Belum Punya Akun?{" "}
                  <UnstyledLink
                    href="/register"
                    className="text-reeva-main font-bold"
                  >
                    Daftar
                  </UnstyledLink>
                </Typography>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
}
