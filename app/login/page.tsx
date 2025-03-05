import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="container mx-auto px-4 py-12 flex-grow">
                <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome to SolMeet
                </h1>
                <LoginForm />
                <div className="text-center mt-4">
                    New to SolMeet?{" "}
                    <a href="/register" className="text-blue-400 hover:underline">
                        Create Account
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    )
}

