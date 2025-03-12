import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  LogOut,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Eye,
  Link as LinkIcon,
  RotateCw,
} from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"

interface Claim {
  _id: string
  amount: number
  approvedAmount: number
  status: string
  createdAt: string
  description: string
  patientName: string
  patientEmail: string
  insurerComments?: string
  supportingDocuments?: string[]
}

const PatientDashboard = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<{
    name: string
    email: string
    amount: string
    approvedAmount?: string
    description: string
    file: File | null
  }>({
    name: "",
    email: "",
    amount: "",
    approvedAmount: "",
    description: "",
    file: null,
  })

  const [claims, setClaims] = useState<Claim[]>([])

  const fetchClaims = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:3000/claims", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setClaims(response.data)
    } catch (error) {
      console.error("Failed to fetch claims", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClaims()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files
      setForm({
        ...form,
        file: files?.[0] || null,
      })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("patientName", form.name)
    formData.append("patientEmail", form.email)
    formData.append("amount", form.amount)
    formData.append("description", form.description)
    if (form.file) formData.append("file", form.file)

    try {
      await axios.post("http://localhost:3000/claims", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      setIsOpen(false)
      setForm({ name: "", email: "", amount: "", description: "", file: null, approvedAmount: "" })
      fetchClaims()
    } catch (error) {
      console.error("Claim submission failed", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    navigate("/")
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-4 h-4 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const viewClaimDetails = (claim: Claim) => {
    setSelectedClaim(claim)
    setIsDetailsOpen(true)
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={fetchClaims} disabled={isLoading}>
            <RotateCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit a New Claim</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Claim Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter claim amount"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your claim"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Supporting Document</Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Claim
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Claims History</CardTitle>
        </CardHeader>
        <CardContent>
          {claims.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg text-muted-foreground">
                No claims submitted yet.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit your first claim
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approved Amount</TableHead>
                  <TableHead>Insurer Comments</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow key={claim._id}>
                    <TableCell>
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₹{claim.amount}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      {claim.approvedAmount
                        ? `₹${claim.approvedAmount}`
                        : "Pending"}
                    </TableCell>
                    <TableCell>
                      {claim.insurerComments ? (
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {claim.insurerComments}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">No comments yet</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewClaimDetails(claim)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Claim Details</DialogTitle>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  {getStatusBadge(selectedClaim.status)}
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Claim Amount</h3>
                    <p>₹{selectedClaim.amount}</p>
                  </div>
                  {selectedClaim.approvedAmount && (
                    <div>
                      <h3 className="font-semibold mb-2">Approved Amount</h3>
                      <p className="text-green-600">
                      ₹{selectedClaim.approvedAmount}
                      </p>
                    </div>
                  )}
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {selectedClaim.description}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Patient Information</h3>
                  <p>{selectedClaim.patientName}</p>
                  <p className="text-muted-foreground">
                    {selectedClaim.patientEmail}
                  </p>
                </div>
                {selectedClaim.insurerComments && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Insurer Comments</h3>
                      <p className="text-muted-foreground">
                        {selectedClaim.insurerComments}
                      </p>
                    </div>
                  </>
                )}
                {(selectedClaim.supportingDocuments ?? []).length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Supporting Documents</h3>
                      <div className="space-y-2">
                        {selectedClaim.supportingDocuments?.map((doc, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            asChild
                          >
                            <a
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkIcon className="mr-2 h-4 w-4" />
                              Document {index + 1}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PatientDashboard