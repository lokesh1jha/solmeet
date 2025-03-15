import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"

async function getProfile(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      name: true,
      bio: true,
    },
  })

  return user
}

export default async function PublicProfilePage(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const profile = await getProfile(params.username)

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Profile Not Found
          </h1>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {profile.name}'s Profile
        </h1>
        <Card className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{profile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Bio</h2>
                <p className="text-gray-300">{profile.bio}</p>
              </div>
              {/* <div>
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-300">{profile.contactInfo}</p>
              </div> */}
            </div> 
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

