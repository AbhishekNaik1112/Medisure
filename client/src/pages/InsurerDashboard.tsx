import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import {
  LogOut,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  Link as LinkIcon,
  RotateCw,
} from "lucide-react"
import { Badge } from "../components/ui/badge"

interface Claim {
  _id: string
  amount: number
  approvedAmount?: number
  status: string
  createdAt: string
  patientName: string
  patientEmail: string
  description: string
  supportingDocuments?: string[]
}

const InsurerDashboard = () => {
  const navigate = useNavigate()
  const [claims, setClaims] = useState<Claim[]>([])
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [filter, setFilter] = useState("all")
  const [approvedAmount, setApprovedAmount] = useState("")
  const [insurerComments, setInsurerComments] = useState("")
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get("http://localhost:3000/claims", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setClaims(response.data)
      } catch (error) {
        console.error("Error fetching claims:", error)
      }
    }
    fetchClaims()
  }, [])

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

  const handleLogout = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    navigate("/")
  }

  const handleStatusUpdate = async (status: string): Promise<void> => {
    if (!selectedClaim) return
    const payload = { status, approvedAmount, insurerComments }
    try {
      await axios.patch(
        `http://localhost:3000/claims/${selectedClaim._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      // Refresh claims
      const response = await axios.get("http://localhost:3000/claims", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setClaims(response.data)
      setIsReviewOpen(false)
      setSelectedClaim(null)
      setApprovedAmount("")
      setInsurerComments("")
    } catch (error) {
      console.error("Error updating claim:", error)
    }
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

  const openReviewDialog = (claim: Claim) => {
    setSelectedClaim(claim)
    setApprovedAmount(claim.approvedAmount?.toString() || "")
    setInsurerComments("")
    setIsReviewOpen(true)
  }

  const filteredClaims = claims.filter(
    (claim) => filter === "all" || claim.status.toLowerCase() === filter
  )

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <FileCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Insurer Dashboard</h1>
        </div>
        <div className="flex gap-4">
        <Button variant="outline" onClick={fetchClaims} disabled={isLoading}>
            <RotateCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      </div>
      <div className="mb-6">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Claims</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
        </CardHeader>
        <CardContent>
          {claims.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg text-muted-foreground">
                No claims available for review.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim._id}>
                    <TableCell>
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{claim.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {claim.patientEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>₹{claim.amount}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewDialog(claim)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Claim</DialogTitle>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-6">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Patient</Label>
                  <div className="col-span-3">
                    <p className="font-medium">{selectedClaim.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedClaim.patientEmail}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Amount</Label>
                  <div className="col-span-3">
                    <p className="font-medium">₹{selectedClaim.amount}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Description</Label>
                  <div className="col-span-3">
                    <p>{selectedClaim.description}</p>
                  </div>
                </div>
                {(selectedClaim.supportingDocuments ?? []).length > 0 && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Documents</Label>
                    <div className="col-span-3 space-y-2">
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
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="approvedAmount" className="text-right">
                    Approved Amount
                  </Label>
                  <Input
                    id="approvedAmount"
                    type="number"
                    value={approvedAmount}
                    onChange={(e) => setApprovedAmount(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comments" className="text-right">
                    Comments
                  </Label>
                  <Textarea
                    id="comments"
                    value={insurerComments}
                    onChange={(e) => setInsurerComments(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="destructive"
                  onClick={() => handleStatusUpdate("rejected")}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleStatusUpdate("approved")}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InsurerDashboard