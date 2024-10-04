"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Cart from "./components/cart";

const steps = [
  { id: 1, title: "Carrinho" }, // Você pode substituir por ícones de SVG reais
  { id: 2, title: "Entrega" },
  { id: 3, title: "Pagamento" },
];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="flex flex-col w-full items-center min-h-screen bg-muted">
      <div className="flex items-center w-full bg-[#ECECEC] ">
        <div className="flex w-full max-w-[900px] items-center justify-between mx-auto py-2">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex-1 text-center">
              {/* Circulo do ícone */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mx-auto",
                  currentStep === step.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300 text-gray-400"
                )}
              >
                <span className="text-xl">{step.id}</span>
              </div>

              {/* Título do passo */}
              <div
                className={cn(
                  "mt-2 font-semibold",
                  currentStep === step.id ? "text-orange-500" : "text-gray-400"
                )}
              >
                {step.title}
              </div>

              {/* Linha de conexão entre os círculos */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-7 left-full w-[9.1875rem] h-1 bg-gray-300 "
                  )}
                  style={{
                    width: "calc(100% - 150px)",
                    left: "calc(50% + 70px)",
                  }} // Ajusta o posicionamento
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Cart />
    </main>
  );
}
