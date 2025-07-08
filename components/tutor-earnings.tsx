import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TutorEarningsProps {
  tutorId: string
}

export function TutorEarnings({ tutorId }: TutorEarningsProps) {
  // Mock earnings data
  const earningsData = {
    currentMonth: {
      total: 1250,
      sessions: 18,
      averagePerSession: 69.44,
      pendingPayment: 350,
      paid: 900,
    },
    previousMonth: {
      total: 1100,
      sessions: 16,
      averagePerSession: 68.75,
      pendingPayment: 0,
      paid: 1100,
    },
    yearToDate: {
      total: 4850,
      sessions: 72,
      averagePerSession: 67.36,
      pendingPayment: 350,
      paid: 4500,
    },
    recentPayments: [
      {
        id: "payment-1",
        amount: 900,
        date: "2023-05-01",
        status: "completed",
        sessions: 13,
      },
      {
        id: "payment-2",
        amount: 1100,
        date: "2023-04-01",
        status: "completed",
        sessions: 16,
      },
      {
        id: "payment-3",
        amount: 950,
        date: "2023-03-01",
        status: "completed",
        sessions: 14,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Month</TabsTrigger>
          <TabsTrigger value="previous">Previous Month</TabsTrigger>
          <TabsTrigger value="ytd">Year to Date</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${earningsData.currentMonth.total}</p>
                <p className="text-sm text-muted-foreground">From {earningsData.currentMonth.sessions} sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Per Session</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${earningsData.currentMonth.averagePerSession.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Based on {earningsData.currentMonth.sessions} sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Paid:</span>
                    <span className="font-medium">${earningsData.currentMonth.paid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending:</span>
                    <span className="font-medium">${earningsData.currentMonth.pendingPayment}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="previous" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <CardDescription>Previous month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${earningsData.previousMonth.total}</p>
                <p className="text-sm text-muted-foreground">From {earningsData.previousMonth.sessions} sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Per Session</CardTitle>
                <CardDescription>Previous month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${earningsData.previousMonth.averagePerSession.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Based on {earningsData.previousMonth.sessions} sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                <CardDescription>Previous month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Paid:</span>
                    <span className="font-medium">${earningsData.previousMonth.paid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending:</span>
                    <span className="font-medium">${earningsData.previousMonth.pendingPayment}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="ytd" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${earningsData.yearToDate.total}</p>
                <p className="text-sm text-muted-foreground">From {earningsData.yearToDate.sessions} sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Per Session</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${earningsData.yearToDate.averagePerSession.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Based on {earningsData.yearToDate.sessions} sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Paid:</span>
                    <span className="font-medium">${earningsData.yearToDate.paid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending:</span>
                    <span className="font-medium">${earningsData.yearToDate.pendingPayment}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Payments</h3>
        <div className="border rounded-md">
          <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium text-sm">
            <div>Date</div>
            <div>Amount</div>
            <div>Sessions</div>
            <div>Status</div>
          </div>
          {earningsData.recentPayments.map((payment) => (
            <div key={payment.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 text-sm">
              <div>{new Date(payment.date).toLocaleDateString()}</div>
              <div>${payment.amount}</div>
              <div>{payment.sessions} sessions</div>
              <div className="capitalize">{payment.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Download Tax Statement</Button>
      </div>
    </div>
  )
}
