"use client";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

export default function EditProfileModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get("/accounts/profile/edit/");
        setFormData((prev) => ({
          ...prev,
          full_name: res.data.full_name || "",
          email: res.data.email || "",
          birth_date: res.data.birth_date || "",
        }));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    fetchProfile();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { ...formData };
      if (!formData.password) delete payload.password;

      await api.put("/accounts/profile/edit/", payload);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#5b708366] flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-[600px] h-[90vh] sm:h-auto bg-black rounded-2xl overflow-y-auto">
        {/* Header */}
        <header className="h-[53px] w-full px-[16px] flex items-center justify-center relative">
          <button
            className="absolute left-[16px] p-1 rounded-full hover:bg-[#ffffff20]"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <IoMdClose className="text-[#E7E9EA] text-[28px]" />
          </button>
          <FaXTwitter className="text-[#E7E9EA] text-[28px]" />
        </header>

        {/* Form */}
        <div className="w-full px-6 sm:px-[80px]">
          <h2 className="text-[#E7E9EA] font-bold text-[26px] sm:text-[31px] mt-[20px] text-center">
            Editar perfil
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-5 pb-6">
            {[
              { label: "Nome completo", name: "full_name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Data de nascimento", name: "birth_date", type: "date" },
              { label: "Nova senha (opcional)", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <div className="relative w-full" key={name}>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder=" "
                  className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] bg-transparent border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
                />
                <label
                  htmlFor={name}
                  className="absolute left-3 top-2 text-sm text-gray-500 transition-all
                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500
                    peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1 cursor-text"
                >
                  {label}
                </label>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[50px] bg-[#1D9BF0] text-white font-bold rounded-full mt-4 hover:bg-[#1A8CD8] transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
