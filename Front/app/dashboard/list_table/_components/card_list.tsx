"use client";

import { useState, useMemo } from "react";
import { Plus, Check, X, Eye, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderDetailsDialog } from "./order-details-dialog";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
};

type Pedido = {
  id: number;
  mesa: string;
  itens: OrderItem[];
  status: "pendente" | "concluído" | "cancelado";
};

export default function CardList() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      mesa: "1",
      itens: [
        { id: "1", name: "Pizza Margherita", quantity: 1, price: 25.00, notes: "Sem cebola" }
      ],
      status: "pendente",
    },
    {
      id: 2,
      mesa: "2",
      itens: [
        { id: "2", name: "Hambúrguer", quantity: 1, price: 15.00, notes: "Ponto médio" }
      ],
      status: "pendente",
    },
    {
      id: 3,
      mesa: "1",
      itens: [
        { id: "3", name: "Salada Caesar", quantity: 1, price: 12.00, notes: "Sem croutons" }
      ],
      status: "concluído",
    },
    {
      id: 4,
      mesa: "3",
      itens: [
        { id: "4", name: "Spaghetti Carbonara", quantity: 1, price: 18.00, notes: "Extra bacon" }
      ],
      status: "pendente",
    },
  ]);
  const [novaMesa, setNovaMesa] = useState("");
  const [novoItem, setNovoItem] = useState("");
  const [filtroMesa, setFiltroMesa] = useState("");
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const adicionarPedido = () => {
    if (novaMesa && novoItem) {
      const itensSeparados = novoItem
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      const novoPedido: Pedido = {
        id: pedidos.length + 1,
        mesa: novaMesa,
        itens: itensSeparados.map((item, index) => ({
          id: `${pedidos.length + 1}-${index + 1}`,
          name: item,
          quantity: 1,
          price: 0, 
        })),
        status: "pendente",
      };
      setPedidos([...pedidos, novoPedido]);
      setNovaMesa("");
      setNovoItem("");
    }
  };

  const atualizarStatus = (
    id: number,
    novoStatus: "concluído" | "cancelado"
  ) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    );
  };

  const handleSaveChanges = (pedidoId: number, newItems: OrderItem[]) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === pedidoId ? { ...pedido, itens: newItems } : pedido
    ));
  };

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((pedido) =>
      pedido.mesa.toLowerCase().includes(filtroMesa.toLowerCase())
    );
  }, [pedidos, filtroMesa]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Pedidos</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Novo Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Mesa"
              value={novaMesa}
              onChange={(e) => setNovaMesa(e.target.value)}
              className="w-24"
            />
            <Input
              placeholder="Itens (separados por vírgula)"
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={adicionarPedido}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Filtrar por mesa"
          value={filtroMesa}
          onChange={(e) => setFiltroMesa(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {pedidosFiltrados.map((pedido) => (
          <Card key={pedido.id} className="flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Mesa {pedido.mesa}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="mb-2 text-sm">
                {pedido.itens.map((item) => (
                  <li key={item.id}>- {item.name} (x{item.quantity})</li>
                ))}
              </ul>
              <div className="flex justify-between items-center mb-2">
                <Badge
                  variant={
                    pedido.status === "pendente"
                      ? "secondary"
                      : pedido.status === "concluído"
                      ? "default"
                      : "destructive"
                  }
                >
                  {pedido.status}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setOpenDialogId(pedido.id)}
                >
                  <Eye className="mr-2 h-4 w-4" /> Detalhes
                </Button>
              </div>
              {pedido.status === "pendente" && (
                <div className="flex justify-between space-x-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => atualizarStatus(pedido.id, "cancelado")}
                  >
                    <X className="mr-2 h-4 w-4" /> Cancelar
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => atualizarStatus(pedido.id, "concluído")}
                  >
                    <Check className="mr-2 h-4 w-4" /> Concluir
                  </Button>
                </div>
              )}
            </CardContent>
            <OrderDetailsDialog
              open={openDialogId === pedido.id}
              onOpenChange={(open) => {
                if (!open) setOpenDialogId(null);
              }}
              orderNumber={pedido.id}
              tableNumber={parseInt(pedido.mesa)}
              status={pedido.status}
              items={pedido.itens}
              onDeleteItem={() => {}} 
              onSaveChanges={(newItems) => handleSaveChanges(pedido.id, newItems)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

