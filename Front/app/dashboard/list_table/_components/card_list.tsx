"use client"

import { useState, useMemo } from 'react'
import { Plus, Check, X, Eye, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Pedido = {
  id: number
  mesa: string
  item: string
  status: 'pendente' | 'concluído' | 'cancelado'
  detalhes?: string
}

export default function CardList(){
  const [pedidos, setPedidos] = useState<Pedido[]>([
    { id: 1, mesa: '1', item: 'Pizza Margherita', status: 'pendente', detalhes: 'Sem cebola' },
    { id: 2, mesa: '2', item: 'Hambúrguer', status: 'pendente', detalhes: 'Ponto médio' },
    { id: 3, mesa: '1', item: 'Salada Caesar', status: 'concluído', detalhes: 'Sem croutons' },
    { id: 4, mesa: '3', item: 'Spaghetti Carbonara', status: 'pendente', detalhes: 'Extra bacon' },
  ])
  const [novaMesa, setNovaMesa] = useState('')
  const [novoItem, setNovoItem] = useState('')
  const [filtroMesa, setFiltroMesa] = useState('')

  const adicionarPedido = () => {
    if (novaMesa && novoItem) {
      const novoPedido: Pedido = {
        id: pedidos.length + 1,
        mesa: novaMesa,
        item: novoItem,
        status: 'pendente'
      }
      setPedidos([...pedidos, novoPedido])
      setNovaMesa('')
      setNovoItem('')
    }
  }

  const atualizarStatus = (id: number, novoStatus: 'concluído' | 'cancelado') => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, status: novoStatus } : pedido
    ))
  }

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => 
      pedido.mesa.toLowerCase().includes(filtroMesa.toLowerCase())
    )
  }, [pedidos, filtroMesa])

  return(
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
              placeholder="Item"
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
              <p className="mb-2 text-sm truncate">{pedido.item}</p>
              <div className="flex justify-between items-center mb-2">
                <Badge
                  variant={pedido.status === 'pendente' ? 'outline' : 
                           pedido.status === 'concluído' ? 'default' : 'destructive'}
                >
                  {pedido.status}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" /> Detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalhes do Pedido #{pedido.id}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p><strong>Mesa:</strong> {pedido.mesa}</p>
                      <p><strong>Item:</strong> {pedido.item}</p>
                      <p><strong>Status:</strong> {pedido.status}</p>
                      <p><strong>Detalhes:</strong> {pedido.detalhes || 'Nenhum detalhe adicional'}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {pedido.status === 'pendente' && (
                <div className="flex justify-between space-x-2">
                  <Button size="sm" className="flex-1" onClick={() => atualizarStatus(pedido.id, 'concluído')}>
                    <Check className="mr-2 h-4 w-4" /> Concluir
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => atualizarStatus(pedido.id, 'cancelado')}>
                    <X className="mr-2 h-4 w-4" /> Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}