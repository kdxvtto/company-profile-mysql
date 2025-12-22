import { ArrowRight, CheckCircle2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

const highlights = [
  "Full-stack web & mobile development",
  "Cloud-native deployment and observability",
  "Product strategy with rapid prototyping",
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-slate-100 text-slate-900">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-semibold">
              KP
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Company Profile
              </p>
              <p className="text-sm text-slate-600">Building digital experiences</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <Button variant="ghost" size="sm">
              Our work
            </Button>
            <Button size="sm">
              Contact us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm ring-1 ring-slate-200">
              Digital craftsmanship
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              We design, build, and scale products that people love to use.
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              From strategy to shipping, our team partners with you to create polished, performant
              experiences using modern stacks like React, Tailwind, and Node.js.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                Schedule a call
                <Mail className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View capabilities
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-lg bg-white p-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 blur-2xl opacity-20" />
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl ring-1 ring-black/10">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                </div>
                <p className="text-xs text-white/70">Live preview</p>
              </div>
              <div className="space-y-4 px-6 py-6">
                <p className="text-xl font-semibold">Next-gen company site</p>
                <p className="text-sm text-white/80">
                  Layered layouts, shadcn/ui components, and Tailwind theming give you a flexible,
                  on-brand presence that is easy to evolve.
                </p>
                <div className="grid gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Stack</p>
                    <p className="mt-2 text-sm text-white">
                      React + Vite · Tailwind CSS · shadcn/ui · Node.js backend
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus</p>
                    <p className="mt-2 text-sm text-white">
                      Performance, accessibility, and clean design that stays on brand.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="secondary" size="sm" className="text-slate-900">
                    Explore demo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Read case study
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
