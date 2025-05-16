"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateWorkspaceMutatiton } from "./hook/useWorkspaceMutation";

export type WorkspaceRequest = {
  name: string;
};

export default function AuthLayout() {
  //#region  //*=========== Form ===========
  const methods = useForm<WorkspaceRequest>({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  //#endregion //*======== Form ===========

  //#region  //*=========== Submit Handler ===========
  const { mutate: mutateRegister, isPending } = useCreateWorkspaceMutatiton();
  const onSubmit = (data: WorkspaceRequest) => {
    const payload = {
      ...data,
    };
    mutateRegister(payload);
    // console.log(data);
  };
  return (
    <main className="md:flex min-h-screen w-full">
      <section className="w-full md:w-[50%] lg:w-[47%] h-[50vh] md:h-screen relative flex items-center justify-center p-6">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
          <NextImage
            src="/register/auth-img.png"
            alt="Artwork Background"
            width={705}
            height={992}
            className="absolute inset-0 md:top-[10%] xl:top-0 object-cover w-full h-full rounded-2xl"
          />
        </div>
      </section>

      <section className="absolute right-0 h-max lg:h-full w-full overflow-y-auto md:w-1/2 lg:w-[53%]">
        <section className="relative flex h-max md:min-h-screen md:items-center justify-center">
          <section className="z-10 mx-8 py-10 md:ml-6 md:mr-12 lg:me-16 md:py-20 w-full lg:w-[65%] fLex flex-col items-center justify-center">
            <div className="mb-3 fLex flex-col items-center justify-center">
              <Typography
                as="h1"
                variant="h4"
                font="Poppins"
                weight="bold"
                className="text-3xl fLex items-center justify-center"
              >
                WORKSPACE
              </Typography>
              <Typography
                as="h1"
                variant="h6"
                font="Poppins"
                weight="semibold"
                className="text-3xl fLex items-center justify-center"
              >
                Buat Workspace
              </Typography>
            </div>
            <section className="rounded-t-2xl">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    id="name"
                    placeholder="Masukan nama Workspace"
                    validation={{
                      required: "Nama Workspace harus diisi",
                    }}
                  />

                  <Button
                    type="submit"
                    variant="slate"
                    size="lg"
                    className="w-full"
                    isLoading={isPending}
                  >
                    <Typography
                      as="p"
                      variant="btn"
                      weight="medium"
                      className="text-base text-white"
                    >
                      Buat Workspace Baru
                    </Typography>
                  </Button>
                </form>
              </FormProvider>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}
