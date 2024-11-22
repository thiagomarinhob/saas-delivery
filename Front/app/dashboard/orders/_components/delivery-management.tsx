'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClipboardList, Utensils, Truck, CheckCircle, Package, Clock, MapPin, User, DollarSign } from 'lucide-react'

type Order = {
  id: string
  customerName: string
  address: string
  items: string[]
  total: number
  status: 'new' | 'preparing' | 'delivering' | 'delivered'
}

type Column = {
  id: 'new' | 'preparing' | 'delivering' | 'delivered'
  title: string
  icon: React.ReactNode
}


export default function DeliveryManagement() {

  const [orders, setOrders] = useState<Order[]>([
    { id: '1', customerName: 'João Silva', address: 'Rua A, 123', items: ['Pizza Margherita', 'Refrigerante'], total: 45.90, status: 'new' },
    { id: '2', customerName: 'Maria Santos', address: 'Av. B, 456', items: ['Hambúrguer', 'Batata Frita', 'Milkshake'], total: 62.50, status: 'preparing' },
    { id: '3', customerName: 'Pedro Oliveira', address: 'Praça C, 789', items: ['Salada Caesar', 'Suco Natural'], total: 38.00, status: 'delivering' },
    { id: '4', customerName: 'Ana Rodrigues', address: 'Rua D, 1011', items: ['Yakisoba', 'Rolinho Primavera'], total: 55.80, status: 'delivered' },
  ])

  // Definição das colunas
  const columns: Column[] = [
    { id: 'new', title: 'Novos', icon: <ClipboardList className="h-5 w-5" /> },
    { id: 'preparing', title: 'Em Preparação', icon: <Utensils className="h-5 w-5" /> },
    { id: 'delivering', title: 'Em Entrega', icon: <Truck className="h-5 w-5" /> },
    { id: 'delivered', title: 'Entregues', icon: <CheckCircle className="h-5 w-5" /> },
  ]

  // Função para lidar com o fim do arrasto
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newOrders = Array.from(orders)
    const movedOrder = newOrders.find(order => order.id === draggableId)

    if (movedOrder) {
      movedOrder.status = destination.droppableId as Order['status']
      setOrders(newOrders)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Pedidos</h1>
      </header>
      <main className="flex-1 p-4 bg-background">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {columns.map(column => (
              <div key={column.id} className="flex flex-col h-full">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  {column.icon}
                  {column.title}
                </h2>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <ScrollArea className="flex-1 border rounded-md p-2" {...provided.droppableProps} ref={provided.innerRef}>
                      {orders.filter(order => order.status === column.id).map((order, index) => (
                        <Draggable key={order.id} draggableId={order.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2"
                            >
                              <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium">{order.customerName}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3 pt-0">
                                <p className="text-sm text-muted-foreground mb-2">{order.items.join(', ')}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-semibold">R$ {order.total.toFixed(2)}</span>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">Detalhes</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Detalhes do Pedido</DialogTitle>
                                        <DialogDescription>
                                          Informações completas sobre o pedido de {order.customerName}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="flex items-center gap-2">
                                          <User className="h-4 w-4" />
                                          <span>{order.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="h-4 w-4" />
                                          <span>{order.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Package className="h-4 w-4" />
                                          <span>{order.items.join(', ')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <DollarSign className="h-4 w-4" />
                                          <span>R$ {order.total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Clock className="h-4 w-4" />
                                          <span>Status: {column.title}</span>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ScrollArea>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  )
}