import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import Produto from "@/assets/image-food.jpg";
import QuantitySelector from "@/components/Quantity-Selector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Pagination } from "swiper/modules";

export default function Cart() {
  const [cupom, setCupom] = useState("");
  const produtos = 2435.8;
  const desconto = 365.37;
  const total = produtos - desconto;

  const aplicarCupom = () => {
    // Função para aplicar o cupom
    console.log("Cupom aplicado:", cupom);
  };
  return (
    <article className="flex flex-col md:flex-row w-full max-w-[1440px] gap-6 justify-center">
      <div className="w-full pb-[170px] flex flex-col p-2 md:p-6 gap-2 bg-white">
        <p className="font-medium text-lg py-2">Seu pedido</p>
        <ScrollArea className="w-full gap-2 h-[425px]">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="w-full p-2.5 h-[100px] flex justify-between"
              >
                <CardContent className="flex items-start p-0 gap-2">
                  <Image
                    className="w-[4.375rem] h-full md:w-16 md:h-16 rounded"
                    src={Produto}
                    alt="product"
                  />
                  <div className="flex flex-col w-full">
                    <p className="text-base md:text-lg font-medium text-ellipsis overflow-hidden line-clamp-1">
                      Hamburguer de Sirí
                    </p>
                    <span className="text-gray-500 text-sm">descriao</span>
                    <span className="underline mt-3 text-sm font-semibold cursor-pointer text-orange-500">
                      Editar
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col p-0 justify-between items-end">
                  <span className="text-gray-500 text-sm">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(produtos)}
                  </span>
                  <QuantitySelector />
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <p className="font-medium text-lg py-2">Aproveite e peça</p>
        <div className="w-full">
          <Swiper
            slidesPerView={3}
            spaceBetween={8}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col w-[128px] p-1 border"
              >
                <Image src={Produto} alt="prd" />
                <div>
                  <span>Produto</span>
                  <div>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(produtos)}
                  </div>
                  <Button className="w-full mt-3">Adicionar</Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* desktop */}
      <Card className="max-w-[320px] hidden md:flex md:flex-col h-auto">
        <CardHeader>
          <CardTitle className="text-lg">Resumo da compra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Produtos (2)</span>
              <span>R$ {produtos.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-red-500">
              <span className="flex items-center">
                <span className="mr-2">Cupons (1)</span>
              </span>
              <span className="text-green-600">-R$ {desconto.toFixed(2)}</span>
            </div>
            <div>
              <Input
                placeholder="Insira seu cupom"
                value={cupom}
                onChange={(e) => setCupom(e.target.value)}
              />
              <Button
                className="mt-2 w-full"
                variant="outline"
                onClick={aplicarCupom}
              >
                Aplicar
              </Button>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Button className="w-full">Continuar a compra</Button>
              <Button variant="outline" className="w-full">
                Adicionar mais produtos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* mobile */}
      <Card className="w-full z-20 h-[150px] py-3 fixed bottom-0 shadow-2xl bg-white border-t-0 flex md:hidden">
        <CardContent className="w-full gap-2.5">
          <div className="flex justify-between text-sm">
            <span>Produtos (2)</span>
            <span>R$ {produtos.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-red-500">
            <span className="flex items-center">
              <span className="mr-2">Cupons (1)</span>
            </span>
            <span className="text-green-600">-R$ {desconto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-3">Continuar a compra</Button>
        </CardContent>
      </Card>
    </article>
  );
}
