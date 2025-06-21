"use client";

import { useState } from "react";

import { ModalLogin } from "../modal-cadastro";
import ModalSenha from "../modal-senha";


export default function ModalContainer() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);

  const handleNext = (data) => {
    setUserData(data);
    setStep(2);
  };

  return (
    <>
      {step === 1 && <ModalLogin onNext={handleNext} />}
      {step === 2 && <ModalSenha userData={userData} />}
    </>
  );
}
