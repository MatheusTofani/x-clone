"use client";
import React, { useState } from "react";
import axios from "@/app/services/api"; // autenticado
import axiosPublic from "@/app/services/axiosPublic"; // público
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/store/useRegisterStore";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import InputCount from "./input-count";
import DateSelect from "./input-date";

export default function RegisterModal() {
  const { isOpen, close } = useRegisterModal();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    const { full_name, email, birth_date } = formData;
    const errors = {
      full_name: "",
      email: "",
      birth_date: "",
    };

    if (!full_name.trim()) {
      errors.full_name = "O nome completo é obrigatório.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Formato de e-mail inválido.";
    }

    if (!birth_date) {
      errors.birth_date = "A data de nascimento é obrigatória.";
    } else {
      const birth = new Date(birth_date);
      const ageDifMs = Date.now() - birth.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        errors.birth_date = "Você deve ter pelo menos 18 anos.";
      }
    }

    if (errors.full_name || errors.email || errors.birth_date) {
      setFieldErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    setFieldErrors({});
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({ ...fieldErrors, username: "", password: "" });

    try {
      // Registro (sem token)
      await axiosPublic.post("accounts/register/", formData);

      // Login (com token)
      const loginRes = await axios.post("accounts/login/", {
        username: formData.username,
        password: formData.password,
      });

      const { access, refresh } = loginRes.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      router.push("/feed");
    } catch (err) {
      const response = err.response?.data;

      const updatedErrors = {
        username: response?.username?.[0] || "",
        password: response?.password?.[0] || "",
      };

      setFieldErrors((prev) => ({ ...prev, ...updatedErrors }));
      setError("Erro ao registrar ou fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full top-0 h-screen bg-[#5b708366] fixed flex justify-center items-center z-50 px-4">
      <div className="w-full max-w-[600px] h-[90vh] sm:h-[650px] bg-black rounded-2xl overflow-y-auto">
        <header className="h-[53px] w-full px-[16px] flex items-center justify-center relative">
          <button
            className="absolute left-[16px] cursor-pointer p-1 rounded-full hover:bg-[#ffffff20] transition duration-300"
            onClick={() => {
              setStep(1);
              close();
            }}
            aria-label="Fechar modal"
          >
            <IoMdClose className="text-[#E7E9EA] text-[28px]" />
          </button>
          <FaXTwitter className="text-[#E7E9EA] text-[28px]" />
        </header>

        <div className="w-full px-6 sm:px-[80px]">
          <h2 className="text-[#E7E9EA] font-bold text-[26px] sm:text-[31px] mt-[20px]">
            {step === 1 ? "Criar sua conta" : "Você precisará de uma senha"}
          </h2>

          {step === 2 && (
            <p className="text-gray-500 text-[14px]">
              É preciso ter 8 caracteres ou mais.
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col mt-6 min-h-[440px] justify-between">
            {step === 1 && (
              <>
                <InputCount
                  value={formData.full_name}
                  onChange={handleChange}
                />
                {fieldErrors.full_name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.full_name}</p>
                )}

                <div className="relative w-full mt-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all
                      peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500
                      peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
                  >
                    E-mail
                  </label>
                </div>
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                )}

                <div>
                  <h2 className="text-[15px] font-bold mt-6 text-[#E7E9EA]">
                    Data de nascimento
                  </h2>
                  <p className="text-[14px] mt-2 text-[#71767b]">
                    Isso não será exibido publicamente. Confirme sua própria
                    idade, mesmo se esta conta for de empresa, de um animal de
                    estimação ou outros.
                  </p>
                </div>

                <DateSelect
                  value={formData.birth_date}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, birth_date: date }))
                  }
                />
                {fieldErrors.birth_date && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.birth_date}</p>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className={`w-full h-[50px] bg-[#E7E9EA] text-black font-bold rounded-full mt-6 cursor-pointer hover:bg-[#71767b] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  Avançar
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="relative w-full mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
                  >
                    Senha
                  </label>
                </div>
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
                )}

                <div className="relative w-full mt-6">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder=" "
                    value={formData.username}
                    onChange={handleChange}
                    className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
                    required
                  />
                  <label
                    htmlFor="username"
                    className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
                  >
                    Usuário
                  </label>
                </div>
                {fieldErrors.username && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.username}</p>
                )}

                <div>
                  <p className="text-gray-500 text-[13px]">
                    Ao se inscrever, você concorda com nossos Termos, com a Política de
                    Privacidade e com o Uso de Cookies...
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-[50px] bg-[#E7E9EA] text-black font-bold rounded-full mt-6 cursor-pointer hover:bg-[#71767b] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {loading ? "Cadastrando..." : "Registrar"}
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[#1A8CD8] font-semibold text-sm hover:underline mb-2 cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              </>
            )}
            {error && (
              <p className="text-red-600 text-center mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
