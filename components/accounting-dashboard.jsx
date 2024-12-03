import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Receipt, CreditCard, BookOpen, Users, User } from 'lucide-react'

export default function AccountingDashboard() {
  const transactions = [
    { date: "2023-12-01", vendor: "ABC Corp", type: "Payment", amount: 1200 },
    { date: "2023-12-02", vendor: "XYZ Ltd", type: "Receipt", amount: 2300 },
    { date: "2023-12-03", vendor: "DEF Inc", type: "Payment", amount: 650 },
    { date: "2023-12-04", vendor: "GHJ Inc", type: "Receipt", amount: 800 },
    { date: "2023-12-05", vendor: "JKL Corp", type: "Payment", amount: 2000 },
  ]

  return (
    (<div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Accounting Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-2">
              <span className="text-2xl">$</span>
            </div>
            <div className="text-sm text-muted-foreground">Payments</div>
            <div className="text-xl font-semibold mt-1">$5,000</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-2">
              <Receipt className="w-6 h-6 mx-auto" />
            </div>
            <div className="text-sm text-muted-foreground">Receipts</div>
            <div className="text-xl font-semibold mt-1">$8,000</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="mb-2">
            <BookOpen className="w-6 h-6 mx-auto" />
          </div>
          <div className="text-sm text-muted-foreground">Balance</div>
          <div className="text-xl font-semibold mt-1">$3,000</div>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
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
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="container max-w-md mx-auto">
          <div className="flex justify-between p-4">
            <button className="flex flex-col items-center text-sm text-primary">
              <Receipt className="w-6 h-6" />
              <span>Receipt</span>
            </button>
            <button className="flex flex-col items-center text-sm text-muted-foreground">
              <CreditCard className="w-6 h-6" />
              <span>Payment</span>
            </button>
            <button className="flex flex-col items-center text-sm text-muted-foreground">
              <BookOpen className="w-6 h-6" />
              <span>Ledger</span>
            </button>
            <button className="flex flex-col items-center text-sm text-muted-foreground">
              <Users className="w-6 h-6" />
              <span>Vendor</span>
            </button>
            <button className="flex flex-col items-center text-sm text-muted-foreground">
              <User className="w-6 h-6" />
              <span>Customer</span>
            </button>
          </div>
        </div>
      </div>
    </div>)
  );
}

