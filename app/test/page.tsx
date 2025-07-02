"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"

const questions = [
  {
    id: 1,
    category: "음악 성향",
    question: "처음 듣는 밴드의 음악을 접했을 때, 당신의 반응은?",
    options: [
      { text: '"와! 이거 뭐야!" 바로 몸을 흔들며 빠져든다', type: "tiger" },
      { text: '"가사 좀 들어볼까?" 조용히 감상하며 분위기를 느낀다', type: "moon" },
      { text: '"어디 밴드야?" 찾아보고 플레이리스트에 저장한다', type: "sun" },
    ],
  },
  {
    id: 2,
    category: "음악 성향",
    question: "당신이 가장 좋아하는 공연 스타일은?",
    options: [
      { text: "관객과 소통이 많은 무대, 외치고, 따라부르는 거 좋아!", type: "tiger" },
      { text: "조용히 집중해서 감상할 수 있는 공연", type: "moon" },
      { text: "세트리스트나 콘셉트가 치밀하게 기획된 공연", type: "sun" },
    ],
  },
  {
    id: 3,
    category: "음악 성향",
    question: "음악을 들을 때 당신은?",
    options: [
      { text: "무조건 라이브! 현장감이 생명이다", type: "tiger" },
      { text: "음질 좋은 이어폰으로 혼자만의 시간에", type: "moon" },
      { text: "플레이리스트를 꼼꼼히 정리해두고 듣는다", type: "sun" },
    ],
  },
  {
    id: 4,
    category: "페스티벌 성향",
    question: "페스티벌 전날 당신의 준비 스타일은?",
    options: [
      { text: "뭐 어때, 그날 느낌대로!", type: "tiger" },
      { text: "동선, 날씨, 필요한 물품 체크리스트 작성", type: "sun" },
      { text: "그냥 몸과 마음을 비워둔다", type: "moon" },
    ],
  },
  {
    id: 5,
    category: "페스티벌 성향",
    question: "메인 무대에서 공연이 시작됐다! 당신은?",
    options: [
      { text: "복소리(베이스/드럼)가 울리면 뛰쳐나간다", type: "tiger" },
      { text: "음향 상태 확인하며, 음악에 몰입", type: "moon" },
      { text: "무대 구성, 조명, 연출을 유심히 살핀다", type: "sun" },
    ],
  },
  {
    id: 6,
    category: "페스티벌 성향",
    question: "페스티벌 중간 쉬는 시간, 당신의 선택은?",
    options: [
      { text: "사람들과 어울려 맥주 한 잔하며 토크!", type: "tiger" },
      { text: "잔디밭에 앉아 혼자 멍 때린다", type: "moon" },
      { text: "굿즈존이나 플리마켓 부스 둘러본다", type: "sun" },
    ],
  },
]

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()

  const handleAnswer = (type: string) => {
    setSelectedOption(type)
  }

  const handleNext = () => {
    if (!selectedOption) return

    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 테스트 완료 - 결과 계산
      const counts = { tiger: 0, moon: 0, sun: 0 }
      newAnswers.forEach((answer) => {
        counts[answer as keyof typeof counts]++
      })

      const result = Object.entries(counts).reduce((a, b) =>
        counts[a[0] as keyof typeof counts] > counts[b[0] as keyof typeof counts] ? a : b,
      )[0]

      router.push(`/result?type=${result}`)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedOption("")
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-sm">
                {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-gray-700 text-sm">{Math.round(progress)}% 완료</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="bg-white/90 border-orange-200 shadow-lg mb-8">
            <CardHeader>
              <div className="text-orange-600 text-sm font-medium mb-2">{questions[currentQuestion].category}</div>
              <CardTitle className="text-gray-800 text-xl leading-relaxed">
                Q{currentQuestion + 1}. {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === option.type
                      ? "border-orange-400 bg-orange-50 text-gray-800 shadow-md"
                      : "border-gray-200 bg-white/70 text-gray-700 hover:border-orange-300 hover:bg-orange-25 hover:shadow-sm"
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option.text}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-white/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-md"
            >
              {currentQuestion === questions.length - 1 ? "결과 보기" : "다음"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
