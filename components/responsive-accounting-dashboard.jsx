import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Home, FileText, BookOpen, Users, Receipt } from 'lucide-react'
import Link from 'next/link';

export default function ResponsiveAccountingDashboard() {
  const transactions = [
    { date: "2023-12-01", vendor: "ABC Corp", type: "Payment", amount: 1200 },
    { date: "2023-12-02", vendor: "XYZ Ltd", type: "Receipt", amount: 2300 },
    { date: "2023-12-03", vendor: "DEF Inc", type: "Payment", amount: 650 },
    { date: "2023-12-04", vendor: "GHJ Inc", type: "Receipt", amount: 800 },
    { date: "2023-12-05", vendor: "JKL Corp", type: "Payment", amount: 2000 },
  ]

  const TransactionForm = ({
    type
  }) => (
    <form className="space-y-4">
      <div>
        <Label htmlFor={`${type.toLowerCase()}-amount`}>Amount</Label>
        <Input
          id={`${type.toLowerCase()}-amount`}
          type="number"
          placeholder="Enter amount" />
      </div>
      <div>
        <Label htmlFor={`${type.toLowerCase()}-date`}>Date</Label>
        <Input id={`${type.toLowerCase()}-date`} type="date" />
      </div>
      <div>
        <Label htmlFor={`${type.toLowerCase()}-method`}>Method</Label>
        <Select>
          <SelectTrigger id={`${type.toLowerCase()}-method`}>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="bank">Bank</SelectItem>
            <SelectItem value="card">Card</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`${type.toLowerCase()}-name`}>{type === 'Receipt' ? 'Customer' : 'Vendor'} Name</Label>
        <Select>
          <SelectTrigger id={`${type.toLowerCase()}-name`}>
            <SelectValue placeholder={`Select ${type === 'Receipt' ? 'customer' : 'vendor'}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="abc-corp">ABC Corp</SelectItem>
            <SelectItem value="xyz-ltd">XYZ Ltd</SelectItem>
            <SelectItem value="def-inc">DEF Inc</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`${type.toLowerCase()}-notes`}>Notes</Label>
        <Input id={`${type.toLowerCase()}-notes`} placeholder="Enter notes" />
      </div>
      <Button type="submit" className="w-full">Submit {type}</Button>
    </form>
  )

  return (
    (<div className="container mx-auto p-4 space-y-6 max-w-7xl pb-20 lg:pb-24">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Accounting Dashboard</h1>
      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-1/3 space-y-4 mb-6 lg:mb-0">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <span className="text-2xl md:text-3xl">$</span>
              </div>
              <div className="text-sm md:text-base text-muted-foreground">Payments</div>
              <div className="text-xl md:text-2xl font-semibold mt-1">$5,000</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <Receipt className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
              </div>
              <div className="text-sm md:text-base text-muted-foreground">Receipts</div>
              <div className="text-xl md:text-2xl font-semibold mt-1">$8,000</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
              </div>
              <div className="text-sm md:text-base text-muted-foreground">Balance</div>
              <div className="text-xl md:text-2xl font-semibold mt-1">$3,000</div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-2/3">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">Date</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={`${transaction.date}-${transaction.vendor}`}>
                        <TableCell className="font-medium">{transaction.date}</TableCell>
                        <TableCell>{transaction.vendor}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className="text-right">${transaction.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
   
    </div>)
  );
}

