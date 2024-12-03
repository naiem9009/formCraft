'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Zap, Layers, BarChart3, Check, ArrowRight, Menu } from 'lucide-react'

export const FeatureCard = ({ icon, title, description } : {
    icon : React.ReactNode;
    title: string;
    description : string;
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-none text-white h-full overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
          <motion.div
            className="text-blue-400 mb-4"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {icon}
          </motion.div>
          <h4 className="text-xl md:text-2xl font-bold mb-2">{title}</h4>
          <p className="text-sm md:text-base text-gray-300">{description}</p>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </Card>
    </motion.div>
  )
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                FormCraft
              </h1>
            </motion.div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${isMenuOpen ? 'absolute top-full left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg p-4' : 'hidden md:flex'}`}
            >
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Button variant="outline" className="w-full md:w-auto text-white border-white hover:bg-white hover:text-blue-600">Log In</Button>
              <Button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">Sign Up</Button>
            </motion.div>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <section ref={heroRef} className="relative py-12 md:py-20 overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: parallaxY }}
          >
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
          </motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Craft Stunning Forms in Minutes
              </motion.h2>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Revolutionize your data collection with our intuitive drag-and-drop form builder. No coding required.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full">
                  Get Started for Free <ChevronRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full">
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-20 bg-gray-900 bg-opacity-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Features that Empower
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard
                icon={<Zap size={36} />}
                title="Lightning Fast"
                description="Build forms in minutes, not hours. Our intuitive interface makes form creation a breeze."
              />
              <FeatureCard
                icon={<Layers size={36} />}
                title="Drag & Drop"
                description="Effortlessly design your forms with our powerful drag-and-drop builder. No coding skills required."
              />
              <FeatureCard
                icon={<BarChart3 size={36} />}
                title="Advanced Analytics"
                description="Gain valuable insights from your form submissions with our comprehensive analytics dashboard."
              />
            </div>
          </div>
        </section>

        <section id="demo" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              See FormCraft in Action
            </h3>
            <div className="relative max-w-4xl mx-auto">
              <motion.div
                className="rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <img
                  src="/placeholder.svg?height=720&width=1280"
                  alt="FormCraft Demo"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg">
                  Start Building <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 md:py-20 bg-gray-900 bg-opacity-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Choose Your Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { name: "Basic", price: "$9", features: ["Up to 5 forms", "100 submissions/month", "Basic analytics", "Email support"] },
                { name: "Pro", price: "$29", features: ["Unlimited forms", "1000 submissions/month", "Advanced analytics", "Priority support", "Custom branding"] },
                { name: "Enterprise", price: "Custom", features: ["Unlimited everything", "Dedicated account manager", "Custom integrations", "SLA", "On-premise option"] },
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className={`bg-gray-800 text-white h-full flex flex-col ${index === 1 ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/20' : ''}`}>
                    <CardContent className="p-6 flex-grow">
                      <h4 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h4>
                      <p className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{plan.price}<span className="text-base md:text-lg font-normal text-gray-400">/month</span></p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm md:text-base">
                            <Check className="text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button className={`w-full ${index === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        Choose Plan
                      </Button>
                    </div>
                  </Card>
                
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Ready to Revolutionize Your Forms?
            </motion.h3>
            <motion.p
              className="text-lg md:text-xl mb-6 md:mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Join thousands of satisfied users and start building forms that convert.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full">
                  Start Creating for Free <ChevronRight className="ml-2" />
                </Button>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-auto max-w-xs bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2023 FormCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}