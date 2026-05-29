
"use client"

import { useRouter } from "next/navigation"

export default function DemoLogin() {
  const router = useRouter()

  function login() {
    document.cookie =
      "parallex-demo-auth=true; path=/"

    router.push("/admin")
  }

  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        bg-[#071521]
        text-white
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-[#10263D]
          rounded-[32px]
          border border-[#17314D]
          p-8
        "
      >
        <div
          className="
            w-20 h-20
            rounded-3xl
            bg-gradient-to-br
            from-[#00D492]
            to-[#0EA5E9]
            mb-8
          "
        />

        <h1
          className="
            text-4xl
            font-black
          "
        >
          Parallex Demo
        </h1>

        <p
          className="
            text-gray-400
            mt-3
          "
        >
          Executive simulation access
        </p>

        <div className="mt-8 space-y-4">
          <input
            defaultValue="executive@parallex.demo"
            className="
              w-full
              bg-[#081B2E]
              rounded-2xl
              p-5
            "
          />

          <input
            defaultValue="123456"
            type="password"
            className="
              w-full
              bg-[#081B2E]
              rounded-2xl
              p-5
            "
          />
        </div>

        <button
          onClick={login}
          className="
            mt-8
            w-full
            py-5
            rounded-2xl
            bg-[#00D492]
            text-[#071521]
            font-bold
          "
        >
          Access Command Center
        </button>
      </div>
    </main>
  )
}
