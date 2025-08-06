import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Star, 
  Calculator, 
  Heart, 
  Briefcase, 
  Calendar, 
  User, 
  Mail, 
  Phone,
  Sparkles,
  Eye,
  Zap,
  Crown,
  Gem
} from 'lucide-react'
import './App.css'

function App() {
  const [lifePathResult, setLifePathResult] = useState(null)
  const [birthDate, setBirthDate] = useState('')

  const calculateLifePath = () => {
    if (!birthDate) return
    
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    // Simple life path calculation
    const sum = day + month + year
    const digits = sum.toString().split('').map(Number)
    let result = digits.reduce((a, b) => a + b, 0)
    
    // Reduce to single digit (except master numbers 11, 22, 33)
    while (result > 9 && result !== 11 && result !== 22 && result !== 33) {
      const newDigits = result.toString().split('').map(Number)
      result = newDigits.reduce((a, b) => a + b, 0)
    }
    
    setLifePathResult(result)
  }

  const services = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Life Path Reading",
      description: "Discover your core personality, strengths, and life purpose through your birth date analysis.",
      price: "$75",
      features: ["Complete personality analysis", "Life purpose guidance", "Strengths & challenges", "Career insights"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Name Numerology",
      description: "Unlock the vibrational power of your name and discover hidden meanings and corrections.",
      price: "$65",
      features: ["Name vibration analysis", "Lucky name suggestions", "Business name guidance", "Signature optimization"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compatibility Analysis",
      description: "Explore relationship compatibility and understand the dynamics between you and your partner.",
      price: "$85",
      features: ["Relationship compatibility", "Communication insights", "Conflict resolution", "Future potential"]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business Numerology",
      description: "Optimize your business success with numerological insights for names, dates, and strategies.",
      price: "$120",
      features: ["Business name analysis", "Launch date selection", "Success strategies", "Financial insights"]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Personal Year Reading",
      description: "Get detailed insights into what the current year holds for you and how to navigate it.",
      price: "$55",
      features: ["Annual forecast", "Monthly guidance", "Opportunity timing", "Challenge preparation"]
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Complete Numerology Profile",
      description: "Comprehensive analysis covering all aspects of your numerological blueprint.",
      price: "$200",
      features: ["All core numbers", "Detailed report", "Life guidance", "1-hour consultation"]
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The life path reading was incredibly accurate and gave me clarity on my career direction. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      text: "The business numerology consultation helped me choose the perfect name for my startup. Sales increased by 40%!",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      text: "The compatibility analysis saved my relationship. We now understand each other so much better.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="number-circle w-10 h-10 text-sm">
                <Gem className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-glow">Mystic Numbers</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="text-foreground hover:text-accent transition-colors">Home</a>
              <a href="#services" className="text-foreground hover:text-accent transition-colors">Services</a>
              <a href="#calculator" className="text-foreground hover:text-accent transition-colors">Calculator</a>
              <a href="#about" className="text-foreground hover:text-accent transition-colors">About</a>
              <a href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
            </div>
            <Button className="cosmic-gradient text-white">Book Consultation</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 particle-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
              Unlock Your Destiny Through Numbers
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Professional numerology services to guide your life path, relationships, and business success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cosmic-gradient text-white glow-effect">
                <Calculator className="w-5 h-5 mr-2" />
                Free Life Path Calculator
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Star className="w-5 h-5 mr-2" />
                Book Reading
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sacred-geometry">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-glow">Numerology Services</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the power of numbers in every aspect of your life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-accent">{service.icon}</div>
                    <Badge variant="secondary" className="cosmic-gradient text-white">
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Zap className="w-4 h-4 mr-2 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 cosmic-gradient text-white">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 glow-effect">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-glow">Free Life Path Calculator</CardTitle>
                <CardDescription>
                  Discover your Life Path Number and get insights into your personality and destiny
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="birthdate">Enter Your Birth Date</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={calculateLifePath} 
                  className="w-full cosmic-gradient text-white"
                  disabled={!birthDate}
                >
                  Calculate My Life Path
                </Button>
                
                {lifePathResult && (
                  <div className="text-center p-6 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="number-circle mx-auto mb-4">
                      {lifePathResult}
                    </div>
                    <h4 className="text-xl font-bold mb-2">Your Life Path Number: {lifePathResult}</h4>
                    <p className="text-muted-foreground">
                      This is just a basic calculation. Book a full reading for detailed insights and guidance.
                    </p>
                    <Button className="mt-4 cosmic-gradient text-white">
                      Get Full Reading
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 particle-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-glow">What Clients Say</h3>
            <p className="text-xl text-muted-foreground">
              Real experiences from people who discovered their path through numerology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sacred-geometry">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-8 text-glow">About Your Numerologist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <p className="text-lg text-muted-foreground">
                  With over 15 years of experience in numerology and spiritual guidance, I help individuals 
                  unlock their potential through the ancient wisdom of numbers.
                </p>
                <p className="text-lg text-muted-foreground">
                  My approach combines traditional numerological principles with modern insights to provide 
                  practical guidance for life decisions, relationships, and personal growth.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Certified Numerologist</Badge>
                  <Badge variant="secondary">15+ Years Experience</Badge>
                  <Badge variant="secondary">1000+ Readings</Badge>
                  <Badge variant="secondary">Spiritual Counselor</Badge>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-primary to-accent opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="w-24 h-24 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 text-glow">Get In Touch</h3>
              <p className="text-xl text-muted-foreground">
                Ready to discover your numerological blueprint? Let's connect.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <span>info@mysticnumbers.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold">Consultation Hours</h4>
                    <p className="text-sm text-muted-foreground">Monday - Friday: 9 AM - 7 PM</p>
                    <p className="text-sm text-muted-foreground">Saturday: 10 AM - 4 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: By appointment</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Book a Consultation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <select className="w-full p-2 rounded-md border border-border bg-background">
                      <option>Life Path Reading</option>
                      <option>Name Numerology</option>
                      <option>Compatibility Analysis</option>
                      <option>Business Numerology</option>
                      <option>Complete Profile</option>
                    </select>
                  </div>
                  <Button className="w-full cosmic-gradient text-white">
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="number-circle w-8 h-8 text-sm">
                <Gem className="w-4 h-4" />
              </div>
              <h4 className="text-xl font-bold text-glow">Mystic Numbers</h4>
            </div>
            <p className="text-muted-foreground mb-4">
              Guiding souls through the wisdom of numbers since 2009
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Mystic Numbers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

