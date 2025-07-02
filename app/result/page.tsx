"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, RotateCcw, Music } from "lucide-react"

const resultData = {
  tiger: {
    emoji: "🐅",
    title: "호랑이형",
    subtitle: "용맹하고 열정적인 락 스피릿",
    description:
      "당신은 호랑이처럼 용맹하고 열정적인 락 정신을 가지고 있습니다! 즉흥적이고 에너지 넘치며, 음악을 통해 자유로운 영혼을 표현하는 것을 좋아해요. 페스티벌에서는 항상 앞줄에서 신나게 즐기며, 아티스트와 함께 호흡하는 것을 중시합니다.",
    traits: ["용맹한", "열정적", "소통왕", "에너지 폭발", "자유로운 영혼"],
    color: "orange",
    artists: [
      { name: "해 (Hae)", genre: "Hard Rock", reason: "폭발적인 에너지로 무대를 장악" },
      { name: "달 (Dal)", genre: "Punk Rock", reason: "직설적이고 열정적인 사운드" },
      { name: "범 (Beom)", genre: "Alternative Rock", reason: "관객과의 호흡이 돋보이는 라이브" },
    ],
  },
  moon: {
    emoji: "🌙",
    title: "달님형",
    subtitle: "은은하고 감성적인 락 시인",
    description:
      "당신은 달빛처럼 은은하고 감성적인 락의 깊이를 추구하는 타입이에요. 조용히 음악에 몰입하며, 가사와 멜로디의 세밀한 부분까지 음미하는 것을 좋아합니다. 혼자만의 시간에 음악을 들으며 마음 깊은 곳의 감정을 탐구해요.",
    traits: ["감성적", "몰입형", "섬세한 마음", "내성적", "깊이 있는"],
    color: "blue",
    artists: [
      { name: "해 (Hae)", genre: "Shoegaze", reason: "몽환적인 톤으로 몰입감 극대화" },
      { name: "달 (Dal)", genre: "Dream Pop", reason: "잔잔하고 아름다운 멜로디" },
      { name: "범 (Beom)", genre: "Post Rock", reason: "서정적이면서도 웅장한 사운드" },
    ],
  },
  sun: {
    emoji: "🌞",
    title: "해님형",
    subtitle: "밝고 체계적인 락 마에스트로",
    description:
      "당신은 해처럼 밝고 체계적인 락의 완성도를 중시하는 타입입니다! 꼼꼼하고 분석적이며, 음악의 구성과 연출을 세심하게 살펴보는 것을 좋아해요. 플레이리스트 정리와 음악 정보 수집에 남다른 열정을 보입니다.",
    traits: ["체계적", "분석적", "완벽주의", "계획적", "정보통"],
    color: "yellow",
    artists: [
      { name: "해 (Hae)", genre: "Progressive Rock", reason: "치밀한 구성과 완성도 높은 사운드" },
      { name: "달 (Dal)", genre: "Art Rock", reason: "예술적 콘셉트와 창의성" },
      { name: "범 (Beom)", genre: "Technical Metal", reason: "정교한 연주력과 구성" },
    ],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") as keyof typeof resultData) || "tiger"
  const result = resultData[type]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${result.emoji} ${result.title}!`,
          text: `락 성향 테스트 결과: ${result.subtitle}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("공유 실패:", err)
      }
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 클립보드에 복사되었습니다!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <div className="text-center mb-12">
            <div className="text-8xl mb-4 drop-shadow-lg">{result.emoji}</div>
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 ${
                result.color === "orange"
                  ? "text-orange-600"
                  : result.color === "blue"
                    ? "text-blue-600"
                    : "text-yellow-600"
              }`}
            >
              {result.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">{result.subtitle}</p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{result.description}</p>
          </div>

          {/* Traits */}
          <Card className="bg-white/90 border-gray-200 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Music className="w-5 h-5" />
                당신의 락 성향 특징
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait, index) => (
                  <Badge
                    key={index}
                    className={`${
                      result.color === "orange"
                        ? "bg-orange-100 text-orange-700 border-orange-200"
                        : result.color === "blue"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    } border`}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Artists */}
          <Card className="bg-white/90 border-gray-200 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-gray-800">
                {result.emoji} {result.title}에게 추천하는 아티스트
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {result.artists.map((artist, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{artist.name}</h3>
                    <Badge
                      className={`${
                        index === 0 ? "bg-orange-500" : index === 1 ? "bg-blue-500" : "bg-yellow-500"
                      } text-white mb-3`}
                    >
                      {artist.genre}
                    </Badge>
                    <p className="text-gray-600 text-sm">{artist.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-md"
            >
              <Share2 className="w-4 h-4 mr-2" />
              결과 공유하기
            </Button>

            <Link href="/test">
              <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-white/80">
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 테스트하기
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-white/80">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-white text-xl">결과를 불러오는 중...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
