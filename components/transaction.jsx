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
import { Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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

// Add this mock items data at the top level of your component
const mockItems = [
  { id: '1', name: 'Web Development', rate: 1000, type: 'service' },
  { id: '2', name: 'UI/UX Design', rate: 800, type: 'service' },
  { id: '3', name: 'Content Writing', rate: 200, type: 'service' },
  { id: '4', name: 'SEO Service', rate: 500, type: 'service' },
  { id: '5', name: 'Office Chair', rate: 150, type: 'product' },
  { id: '6', name: 'Desk', rate: 300, type: 'product' },
  { id: '7', name: 'Laptop', rate: 1200, type: 'product' },
  { id: '8', name: 'Monitor', rate: 400, type: 'product' },
];

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [selectedContact, setSelectedContact] = useState(null)

  // Mock data for receipts and payments
  const receipts = [
    {
      id: '1',
      date: '2023-12-01',
      amount: 1000,
      source: 'bank',
      name: 'Client A',
      notes: 'Project payment',
      items: [
        { description: 'Web Development', quantity: 1, rate: 1000, amount: 1000 }
      ]
    },
    { id: '2', date: '2023-12-05', amount: 500, source: 'cash', name: 'Client B', notes: 'Consultation fee', items: [] },
    { id: '3', date: '2023-12-10', amount: 1500, source: 'bank', name: 'Client C', notes: 'Monthly retainer', items: [] },
    { id: '4', date: '2023-12-12', amount: 2000, source: 'bank', name: 'Client D', notes: 'Website development', items: [] },
    { id: '5', date: '2023-12-15', amount: 750, source: 'card', name: 'Client E', notes: 'Design services', items: [] },
    { id: '6', date: '2023-12-18', amount: 1200, source: 'bank', name: 'Client F', notes: 'Marketing campaign', items: [] },
    { id: '7', date: '2023-12-20', amount: 300, source: 'cash', name: 'Client G', notes: 'Quick consultation', items: [] },
    { id: '8', date: '2023-12-22', amount: 1800, source: 'bank', name: 'Client H', notes: 'Annual subscription', items: [] },
    { id: '9', date: '2023-12-25', amount: 950, source: 'card', name: 'Client I', notes: 'Mobile app development', items: [] },
    { id: '10', date: '2023-12-28', amount: 1600, source: 'bank', name: 'Client J', notes: 'SEO services', items: [] }
  ]

  const payments = [
    {
      id: '1',
      date: '2023-12-02',
      amount: 200,
      source: 'bank',
      name: 'Office Supplies Co',
      notes: 'Stationery',
      items: [
        { description: 'Paper', quantity: 2, rate: 50, amount: 100 },
        { description: 'Pens', quantity: 10, rate: 10, amount: 100 }
      ]
    },
    { id: '2', date: '2023-12-07', amount: 1000, source: 'bank', name: 'Rent LLC', notes: 'Office rent', items: [] },
    { id: '3', date: '2023-12-15', amount: 300, source: 'cash', name: 'Cleaning Services', notes: 'Monthly cleaning', items: [] },
    { id: '4', date: '2023-12-08', amount: 450, source: 'card', name: 'Software Solutions', notes: 'Software licenses', items: [] },
    { id: '5', date: '2023-12-11', amount: 180, source: 'bank', name: 'Internet Provider', notes: 'Monthly internet', items: [] },
    { id: '6', date: '2023-12-14', amount: 250, source: 'card', name: 'Office Maintenance', notes: 'Repairs', items: [] },
    { id: '7', date: '2023-12-17', amount: 800, source: 'bank', name: 'Insurance Co', notes: 'Monthly insurance', items: [] },
    { id: '8', date: '2023-12-20', amount: 150, source: 'cash', name: 'Courier Service', notes: 'Delivery fees', items: [] },
    { id: '9', date: '2023-12-23', amount: 600, source: 'bank', name: 'Marketing Agency', notes: 'Ad campaign', items: [] },
    { id: '10', date: '2023-12-26', amount: 350, source: 'card', name: 'Utilities Corp', notes: 'Monthly utilities', items: [] }
  ]

  const filteredTransactions = (activeTab === 'receipts' ? receipts : payments).filter(transaction => 
    (!dateFilter || transaction.date.includes(dateFilter)) &&
    (sourceFilter === 'all' || !sourceFilter || transaction.source === sourceFilter) &&
    (!selectedContact || transaction.name === selectedContact.name)
  )

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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

  const TransactionForm = ({ type, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || {
      id: '',
      date: '',
      source: '',
      name: '',
      notes: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
    });
    
    const [contactPopoverOpen, setContactPopoverOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Get filtered contacts using the existing getFilteredContacts function
    const filteredContacts = getFilteredContacts(
      searchQuery, 
      type === 'Receipt' ? 'customer' : 'vendor'
    );

    const [itemSearchQueries, setItemSearchQueries] = useState(
      formData.items.map(() => "")
    );
    const [showItemSuggestions, setShowItemSuggestions] = useState(
      formData.items.map(() => false)
    );

    // Function to get filtered items based on search query
    const getFilteredItems = (query) => {
      return mockItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    };

    const handleItemChange = (index, field, value) => {
      const newItems = [...formData.items];
      newItems[index][field] = value;
      
      if (field === 'quantity' || field === 'rate') {
        newItems[index].amount = newItems[index].quantity * newItems[index].rate;
      }
      
      setFormData(prev => ({ ...prev, items: newItems }));
    };

    const handleItemSelect = (index, selectedItem) => {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        description: selectedItem.name,
        rate: selectedItem.rate,
        amount: selectedItem.rate * newItems[index].quantity
      };
      
      setFormData(prev => ({ ...prev, items: newItems }));
      
      // Clear search and hide suggestions
      const newQueries = [...itemSearchQueries];
      newQueries[index] = selectedItem.name;
      setItemSearchQueries(newQueries);
      
      const newShowSuggestions = [...showItemSuggestions];
      newShowSuggestions[index] = false;
      setShowItemSuggestions(newShowSuggestions);
    };

    const addItem = () => {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
      }));
      setItemSearchQueries(prev => [...prev, ""]);
      setShowItemSuggestions(prev => [...prev, false]);
    };

    const removeItem = (index) => {
      if (formData.items.length > 1) {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, items: newItems }));
        setItemSearchQueries(prev => prev.filter((_, i) => i !== index));
        setShowItemSuggestions(prev => prev.filter((_, i) => i !== index));
      }
    };

    // Add this calculation for netAmount
    const netAmount = formData.items.reduce((sum, item) => sum + (item.amount || 0), 0);

    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit({ ...formData, amount: netAmount })
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input 
            id="date" 
            type="date" 
            value={formData.date} 
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} 
          />
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
          <Popover open={contactPopoverOpen} onOpenChange={setContactPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={contactPopoverOpen}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={`Search ${type === 'Receipt' ? 'customer' : 'vendor'}...`}
                  />
                </div>
                <CommandGroup>
                  <div className="py-2">
                    {filteredContacts.length > 0 ? (
                      <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white">
                        {filteredContacts.map((contact) => (
                          <p
                            key={contact.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, name: contact.name }))
                              setContactPopoverOpen(false)
                            }}
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
                  setContactPopoverOpen(false)
                  setNewContactModalOpen(true)
                }}>
                Add New {type === 'Receipt' ? 'Customer' : 'Vendor'}
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Items Section - Updated with scrollable container */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Items</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addItem}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>

          {/* Scrollable Items Container */}
          <div className="max-h-[300px] overflow-y-auto border rounded-lg">
            {formData.items.map((item, index) => (
              <div key={index} className="space-y-4 p-4 border-b last:border-b-0 relative">
                {formData.items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeItem(index)}
                  >
                    ×
                  </Button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <Label>Description</Label>
                    <Input
                      value={itemSearchQueries[index]}
                      onChange={(e) => {
                        const newQueries = [...itemSearchQueries];
                        newQueries[index] = e.target.value;
                        setItemSearchQueries(newQueries);
                        
                        const newShowSuggestions = [...showItemSuggestions];
                        newShowSuggestions[index] = true;
                        setShowItemSuggestions(newShowSuggestions);
                        
                        handleItemChange(index, 'description', e.target.value);
                      }}
                      placeholder="Search item..."
                    />
                    
                    {/* Item Suggestions Dropdown */}
                    {showItemSuggestions[index] && itemSearchQueries[index] && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                        <div className="max-h-48 overflow-y-auto">
                          {getFilteredItems(itemSearchQueries[index]).map((suggestion) => (
                            <div
                              key={suggestion.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleItemSelect(index, suggestion)}
                            >
                              <div className="font-medium">{suggestion.name}</div>
                              <div className="text-sm text-gray-500">${suggestion.rate}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label>Rate</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                      readOnly={item.rate > 0}
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <Label>Amount: ${item.amount.toFixed(2)}</Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Net Amount */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <Label className="text-lg font-semibold">Net Amount</Label>
          <div className="text-lg font-semibold">${netAmount.toFixed(2)}</div>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Enter notes"
          />
        </div>

        <Button type="submit" className="w-full">Submit {type}</Button>
      </form>
    )
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

  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm">
          Page {currentPage} of {totalPages}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [showAutoComplete, setShowAutoComplete] = useState(false)

  // Filter contacts based on search query and type (customer/vendor)
  const getFilteredContacts = (query, type) => {
    return contacts.filter(contact => 
      contact.type === type && 
      contact.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5) // Limit to 5 suggestions
  }

  // Add this new component inside TransactionsPage
  const SearchWithAutocomplete = ({ placeholder, type }) => {
    const [localQuery, setLocalQuery] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    
    const filteredContacts = contacts.filter((contact) => 
      contact.type === type &&
      contact.name.toLowerCase().includes(localQuery.toLowerCase())
    ).slice(0, 5)

    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 shrink-0 opacity-50" />
          <input
            value={selectedContact ? selectedContact.name : localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value)
              setShowSuggestions(true)
              if (!e.target.value) {
                setSelectedContact(null)
              }
            }}
            className="flex h-11 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>
        
        {showSuggestions && localQuery && !selectedContact && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            <div className="py-2">
              {filteredContacts.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white">
                  {filteredContacts.map((contact) => (
                    <p
                      key={contact.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                      onClick={() => {
                        setSelectedContact(contact)
                        setLocalQuery("")
                        setShowSuggestions(false)
                      }}
                    >
                      {contact.name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-2 text-sm text-muted-foreground">No results found.</p>
              )}
            </div>
          </div>
        )}
        {selectedContact && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2.5"
            onClick={() => {
              setSelectedContact(null)
              setLocalQuery("")
            }}
          >
            ×
          </Button>
        )}
      </div>
    )
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
                  <SearchWithAutocomplete
                    placeholder="Search customer..."
                    type="customer"
                  />
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
                  {paginatedTransactions.map((transaction) => (
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
              <PaginationControls />
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
                  <SearchWithAutocomplete
                    placeholder="Search vendor..."
                    type="vendor"
                  />
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
                  {paginatedTransactions.map((transaction) => (
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
              <PaginationControls />
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

