'use client';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('receipts')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [nameFilter, setNameFilter] = useState('')
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Client A', email: 'clienta@example.com', phone: '123-456-7890', type: 'customer' },
    { id: '2', name: 'Client B', email: 'clientb@example.com', phone: '234-567-8901', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '3', name: 'Client C', email: 'clientc@example.com', phone: '345-678-9012', type: 'customer' },
    { id: '4', name: 'Office Supplies Co', email: 'office@example.com', phone: '456-789-0123', type: 'vendor' },
    { id: '5', name: 'Rent LLC', email: 'rent@example.com', phone: '567-890-1234', type: 'vendor' },
    { id: '6', name: 'Cleaning Services', email: 'cleaning@example.com', phone: '678-901-2345', type: 'vendor' },
  ])
  const [newContactModalOpen, setNewContactModalOpen] = useState(false)

  // Mock data for receipts and payments
  const receipts = [
    { id: '1', date: '2023-12-01', amount: 1000, source: 'bank', name: 'Client A', notes: 'Project payment' },
    { id: '2', date: '2023-12-05', amount: 500, source: 'cash', name: 'Client B', notes: 'Consultation fee' },
    { id: '3', date: '2023-12-10', amount: 1500, source: 'bank', name: 'Client C', notes: 'Monthly retainer' },
  ]

  const payments = [
    { id: '1', date: '2023-12-02', amount: 200, source: 'bank', name: 'Office Supplies Co', notes: 'Stationery' },
    { id: '2', date: '2023-12-07', amount: 1000, source: 'bank', name: 'Rent LLC', notes: 'Office rent' },
    { id: '3', date: '2023-12-15', amount: 300, source: 'cash', name: 'Cleaning Services', notes: 'Monthly cleaning' },
  ]


  const filteredTransactions = (activeTab === 'receipts' ? receipts : payments).filter(transaction => 
    (!dateFilter || transaction.date.includes(dateFilter)) &&
    (sourceFilter === 'all' || !sourceFilter || transaction.source === sourceFilter) &&
    (!nameFilter || transaction.name.toLowerCase().includes(nameFilter.toLowerCase())))

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction)
    setEditModalOpen(true)
  }

  const handleDelete = (transaction) => {
    setSelectedTransaction(transaction)
    setDeleteDialogOpen(true)
  }

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction)
    setDetailsPanelOpen(true)
  }

  const handleConfirmDelete = () => {
    // Implement delete logic here
    console.log('Deleting transaction:', selectedTransaction)
    setDeleteDialogOpen(false)
  }

  const handleSaveEdit = (updatedTransaction) => {
    // Implement save logic here
    console.log('Saving updated transaction:', updatedTransaction)
    setEditModalOpen(false)
  }

  const handleAddNewContact = (newContact) => {
    const newContactWithId = {
      ...newContact,
      id: (contacts.length + 1).toString(),
    }
    setContacts(prevContacts => [...prevContacts, newContactWithId])
    setNewContactModalOpen(false)
  }

  const TransactionForm = ({
    type,
    initialData,
    onSubmit
  }) => {
    const [formData, setFormData] = useState(initialData || {
      id: '',
      date: '',
      amount: 0,
      source: '',
      name: '',
      notes: ''
    })
    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
      setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(formData)
    }

    const [searchQuery, setSearchQuery] = useState("");

    // Filter contacts based on the input value
    const filteredContacts = contacts.filter((contact) => 
      contact.type === (type === "Receipt" ? "customer" : "vendor") &&
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    return (
      (<form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount" />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="source">Source</Label>
          <Select
            value={formData.source}
            onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
            <SelectTrigger id="source">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="card">Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="name">{type === 'Receipt' ? 'Customer' : 'Vendor'} Name</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between">
                {formData.name || `Select ${type === 'Receipt' ? 'customer' : 'vendor'}...`}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
              <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input
      onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
      className=
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
       />
  </div>
                <CommandGroup>
                  {/* Filtered Command Group */}
      <div className="py-2">
        {filteredContacts.length > 0 ? (
          <div className="space-y-2  max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white">
            {filteredContacts.map((contact) => (
              <p
                key={contact.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={() => {
                  setFormData(prev => ({ ...prev, name: contact.name }))
                  setOpen(false)
                }} // Add your click handler here
              >
                {contact.name}
              </p>
            ))}
          </div>
        ) : (
          <p className="px-3 py-2 text-sm text-muted-foreground">No results found.</p>
        )}
      </div>
                </CommandGroup>
              </Command>
              <Button
                className="w-full mt-2"
                onClick={() => {
                  setOpen(false)
                  setNewContactModalOpen(true)
                }}>
                Add New {type === 'Receipt' ? 'Customer' : 'Vendor'}
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter notes" />
        </div>
        <Button type="submit" className="w-full">Submit {type}</Button>
      </form>)
    );
  }

  const NewContactForm = ({
    type,
    onSubmit
  }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      type: type
    })

    const handleChange = (e) => {
      setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(formData)
    }

    return (
      (<form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number" />
        </div>
        <Button type="submit" className="w-full">Add {type === 'customer' ? 'Customer' : 'Vendor'}</Button>
      </form>)
    );
  }

  return (
    (<div className="container mx-auto p-4 space-y-6 max-w-7xl">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Transactions</h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="receipts">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Receipts</h2>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Add Receipt</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Receipt</DialogTitle>
                    </DialogHeader>
                    <TransactionForm
                      type="Receipt"
                      onSubmit={(data) => {
                        console.log('New receipt:', data)
                        setIsModalOpen(false)
                      }} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="date-filter">Filter by Date</Label>
                  <Input
                    id="date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="source-filter">Filter by Source</Label>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger id="source-filter">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="name-filter">Filter by Customer</Label>
                  <Input
                    id="name-filter"
                    placeholder="Search customer..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)} />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>{transaction.source}</TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.notes}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(transaction)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(transaction)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetails(transaction)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Payments</h2>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Add Payment</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Payment</DialogTitle>
                    </DialogHeader>
                    <TransactionForm
                      type="Payment"
                      onSubmit={(data) => {
                        console.log('New payment:', data)
                        setIsModalOpen(false)
                      }} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="date-filter">Filter by Date</Label>
                  <Input
                    id="date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="source-filter">Filter by Source</Label>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger id="source-filter">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="name-filter">Filter by Vendor</Label>
                  <Input
                    id="name-filter"
                    placeholder="Search vendor..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)} />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>{transaction.source}</TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.notes}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(transaction)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(transaction)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetails(transaction)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {activeTab === 'receipts' ? 'Receipt' : 'Payment'}</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <TransactionForm
              type={activeTab === 'receipts' ? 'Receipt' : 'Payment'}
              initialData={selectedTransaction}
              onSubmit={handleSaveEdit} />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              {activeTab === 'receipts' ? ' receipt' : ' payment'} record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet open={detailsPanelOpen} onOpenChange={setDetailsPanelOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{activeTab === 'receipts' ? 'Receipt' : 'Payment'} Details</SheetTitle>
            <SheetDescription>
              View all details for this {activeTab === 'receipts' ? 'receipt' : 'payment'}.
            </SheetDescription>
          </SheetHeader>
          {selectedTransaction && (
            <div className="mt-4 space-y-4">
              <div>
                <Label>Date</Label>
                <div>{selectedTransaction.date}</div>
              </div>
              <div>
                <Label>Amount</Label>
                <div>${selectedTransaction.amount}</div>
              </div>
              <div>
                <Label>Source</Label>
                <div>{selectedTransaction.source}</div>
              </div>
              <div>
                <Label>{activeTab === 'receipts' ? 'Customer' : 'Vendor'}</Label>
                <div>{selectedTransaction.name}</div>
              </div>
              <div>
                <Label>Notes</Label>
                <div>{selectedTransaction.notes}</div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <Dialog open={newContactModalOpen} onOpenChange={setNewContactModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New {activeTab === 'receipts' ? 'Customer' : 'Vendor'}</DialogTitle>
          </DialogHeader>
          <NewContactForm
            type={activeTab === 'receipts' ? 'customer' : 'vendor'}
            onSubmit={handleAddNewContact} />
        </DialogContent>
      </Dialog>
    </div>)
  );
}

