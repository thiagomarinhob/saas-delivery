"use client"

import * as React from "react"
import { Plus, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

interface OrderDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderNumber: number
  tableNumber: number
  status: "pendente" | "concluído" | "cancelado"
  items: OrderItem[]
  onDeleteItem: (id: string) => void
  onSaveChanges: (items: OrderItem[]) => void
}

export function OrderDetailsDialog({
  open,
  onOpenChange,
  orderNumber,
  tableNumber,
  status,
  items: initialItems,
  onDeleteItem,
  onSaveChanges,
}: OrderDetailsProps) {
  const [items, setItems] = React.useState<OrderItem[]>(initialItems)
  const [newItemName, setNewItemName] = React.useState("")
  const [newItemQuantity, setNewItemQuantity] = React.useState(1)
  const [newItemPrice, setNewItemPrice] = React.useState("")
  const [newItemNotes, setNewItemNotes] = React.useState("")

  React.useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItemName && newItemQuantity > 0 && newItemPrice) {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        name: newItemName,
        quantity: newItemQuantity,
        price: parseFloat(newItemPrice),
        notes: newItemNotes,
      }
      setItems([...items, newItem])
      setNewItemName("")
      setNewItemQuantity(1)
      setNewItemPrice("")
      setNewItemNotes("")
    }
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSaveChanges = () => {
    onSaveChanges(items)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido #{orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mesa:</span>
              <span className="text-sm">{tableNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm">{status}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium">Items:</Label>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm py-2">
                    <span>
                      {item.name} (x{item.quantity}) - R$ {item.price.toFixed(2)}
                      {item.notes && (
                        <span className="ml-2 text-muted-foreground">- {item.notes}</span>
                      )}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <form onSubmit={handleAddItem} className="grid gap-2">
            <Label htmlFor="newItem" className="text-sm font-medium">
              Adicionar novo item:
            </Label>
            <div className="flex gap-2">
              <Input
                id="newItem"
                placeholder="Nome do item"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                min="1"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                className="w-20"
                placeholder="Qtd"
              />
              <Input
                type="number"
                min="0"
                step="0.01"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                className="w-24"
                placeholder="Preço"
              />
            </div>
            <Textarea
              placeholder="Observações (opcional)"
              value={newItemNotes}
              onChange={(e) => setNewItemNotes(e.target.value)}
              className="mt-2"
            />
            <Button type="submit" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </form>
        </div>
        <div className="flex justify-between gap-2">
          <Button 
            variant="destructive" 
            className="flex-1" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar Pedido
          </Button>
          <Button 
            variant="default" 
            className="flex-1" 
            onClick={handleSaveChanges}
            disabled={items.length === 0}
          >
            Concluir Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

