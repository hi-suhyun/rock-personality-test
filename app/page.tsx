import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Guitar, Headphones } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Guitar className="w-12 h-12 text-orange-500" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
                락 성향 테스트
              </h1>
              <Music className="w-12 h-12 text-blue-500" />
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">당신의 락 DNA를 발견해보세요 🎵</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              음악 취향과 페스티벌 성향을 통해 당신만의 락 스타일을 찾아드립니다
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Headphones className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">음악 성향</h3>
                <p className="text-gray-600 text-sm">당신의 음악 감상 스타일과 선호도를 분석합니다</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Music className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">페스티벌 성향</h3>
                <p className="text-gray-600 text-sm">페스티벌에서의 행동 패턴을 통해 성향을 파악합니다</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Guitar className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">맞춤 추천</h3>
                <p className="text-gray-600 text-sm">당신의 성향에 맞는 아티스트를 추천해드립니다</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link href="/test">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 hover:from-orange-600 hover:via-yellow-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🐅 락성향테스트 시작하기 🎵
              </Button>
            </Link>
            <p className="text-sm text-gray-400">총 6문항 • 약 2분 소요</p>
          </div>
        </div>
      </div>
    </div>
  )
}
