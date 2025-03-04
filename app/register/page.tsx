import { RegisterForm } from "@/components/auth/register-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        Create Your SolMeet Account
      </h1>
      <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}

