"use client";

import { motion } from "framer-motion";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import withAuth from "@/components/hoc/withAuth";
import { LoginRequest } from "@/types/login";
import { useLoginMutation } from "../hooks/mutation";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";

export default withAuth(LoginPage, "public");
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeInput, setActiveInput] = useState<"email" | "password" | null>(
    null
  );

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Right Side - Login Form */}
      <div className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto md:ml-15 lg:ml-25" // Ubah dari md:ml-8 lg:ml-16 menjadi md:ml-12 lg:ml-24
        >
          {/* Mobile-only header */}
          <motion.div
            variants={itemVariants}
            className="md:hidden mb-6 text-center"
          >
            <h1 className="text-3xl font-bold text-[#000a2a]">FRSPLAN</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Planning FRS mu, Dengan FRSPLAN!
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl p-6 sm:p-8 space-y-4 sm:space-y-6 border border-gray-100"
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#000a2a]">
                Login
              </h1>
              <p className="text-muted-foreground text-sm">
                Gunakan Akun Kamu!
              </p>
            </motion.div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <LabelText htmlFor="email">Email</LabelText>
                  <motion.div
                    animate={{
                      borderColor:
                        activeInput === "email" ? "#000a2a" : "#e5e7eb",
                    }}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan Email"
                      onFocus={() => setActiveInput("email")}
                      onBlur={() => setActiveInput(null)}
                      className="text-base sm:text-sm transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <LabelText htmlFor="password">Password</LabelText>
                  <motion.div
                    animate={{
                      borderColor:
                        activeInput === "password" ? "#000a2a" : "#e5e7eb",
                    }}
                    className="relative"
                  >
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan Password"
                      onFocus={() => setActiveInput("password")}
                      onBlur={() => setActiveInput(null)}
                      className="text-base sm:text-sm transition-all duration-300 pr-10"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      whileTap={{ scale: 0.9 }}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    ></motion.button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-[#000a2a] hover:bg-[#000a2a]/90 transition-all"
                    disabled={!isValid || isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Masuk
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-1"
                >
                  <p className="text-sm text-muted-foreground">
                    Belum Punya Akun?
                  </p>
                  <motion.a
                    href="/register"
                    className="text-sm text-primary hover:underline font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Daftar
                  </motion.a>
                </motion.div>
              </form>
            </FormProvider>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
