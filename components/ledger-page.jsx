import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronUp, Download, Search } from 'lucide-react'

export default function LedgerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [expandedRows, setExpandedRows] = useState(new Set())

  // Mock data for ledger entries
  const ledgerEntries = [
    { id: '1', date: new Date('2023-12-01'), description: 'Office Supplies', amount: -200, type: 'payment', vendor: 'Office Depot', notes: 'Monthly stationery purchase' },
    { id: '2', date: new Date('2023-12-03'), description: 'Client Payment', amount: 1500, type: 'receipt', vendor: 'ABC Corp', notes: 'Project completion payment' },
    { id: '3', date: new Date('2023-12-05'), description: 'Rent', amount: -2000, type: 'payment', vendor: 'XYZ Properties', notes: 'Monthly office rent' },
    { id: '4', date: new Date('2023-12-10'), description: 'Consulting Services', amount: 3000, type: 'receipt', vendor: 'Smith Consulting', notes: 'Strategic planning session' },
    { id: '5', date: new Date('2023-12-15'), description: 'Utility Bill', amount: -150, type: 'payment', vendor: 'City Power Co', notes: 'Electricity bill for December' },
  ]

  const filteredEntries = ledgerEntries.filter(entry => 
    entry.vendor.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!startDate || entry.date >= startDate) &&
    (!endDate || entry.date <= endDate))

  const toggleRowExpansion = (id) => {
    setExpandedRows(prevExpandedRows => {
      const newExpandedRows = new Set(prevExpandedRows)
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id)
      } else {
        newExpandedRows.add(id)
      }
      return newExpandedRows
    })
  }

  const calculateRunningBalance = (entries) => {
    let balance = 0
    return entries.map(entry => {
      balance += entry.amount
      return { ...entry, balance }
    });
  }

  const entriesWithBalance = calculateRunningBalance(filteredEntries)

  const handleGenerateLedger = () => {
    // Implement ledger generation logic here
    console.log('Generating ledger...')
  }

  const handleExport = (format) => {
    // Implement export logic here
    console.log(`Exporting as ${format}...`)
  }

  return (
    (<div className="container mx-auto p-4 space-y-6 max-w-7xl">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Ledger</h1>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="search">Search Vendor/Customer</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8" />
              </div>
            </div>
            <div>
              <Label>Date Range</Label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={handleGenerateLedger} className="w-full">Generate Ledger</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right w-[120px]">Amount</TableHead>
                  <TableHead className="text-right w-[120px]">Balance</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entriesWithBalance.map((entry) => (
                 <>
                    <TableRow>
                      <TableCell className="font-medium">{format(entry.date, 'yyyy-MM-dd')}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell
                        className={cn("text-right", entry.type === 'payment' ? 'text-red-500' : 'text-green-500')}>
                        ${Math.abs(entry.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">${entry.balance.toFixed(2)}</TableCell>
                     
                    </TableRow>
                   
                    </>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => handleExport('excel')} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
            <Button onClick={() => handleExport('pdf')} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}

