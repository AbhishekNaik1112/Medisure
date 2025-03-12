import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Shield,
  FileCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Wallet,
  BadgeCheck,
} from "lucide-react"

const Landing = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Quick Processing",
      description: "Get your claims processed within 24-48 hours",
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-primary" />,
      title: "Health First",
      description: "Focus on recovery while we handle the paperwork",
    },
    {
      icon: <Wallet className="h-6 w-6 text-primary" />,
      title: "Easy Reimbursement",
      description: "Direct deposits to your preferred bank account",
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-primary" />,
      title: "Trusted Service",
      description: "Over 10,000 claims processed successfully",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Insurance Claims{" "}
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Submit and manage your insurance claims with ease. Our streamlined
            process ensures quick approvals and faster reimbursements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
     
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Experience a hassle-free claims process with our modern platform
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              Three simple steps to process your claim
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">1. Submit Claim</h3>
                <p className="text-muted-foreground">
                  Fill out our simple form and upload your documents
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">2. Quick Review</h3>
                <p className="text-muted-foreground">
                  Our team reviews your claim within 24 hours
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">3. Get Reimbursed</h3>
                <p className="text-muted-foreground">
                  Receive your payment directly in your account
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-[600px] mx-auto">
            Join thousands of satisfied customers who have simplified their
            insurance claims process with us.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/login")}
            className="text-lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Landing