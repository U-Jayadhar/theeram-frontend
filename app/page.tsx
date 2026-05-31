import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base flex flex-col justify-center items-center relative overflow-hidden font-body text-dark px-6">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-ocean/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 mt-12 md:mt-0">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/30 text-ocean text-sm font-semibold shadow-sm border border-sky/50">
          <span>🌊</span> RK Beach & Yarada Initiative
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-dark">
          Theeram
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-body">
          The eco-lifeline for Visakhapatnam. Instantly report rip currents, marine debris, and coastal hazards directly to the GVMC rapid response pipeline.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4">
          <Link
            href="/report"
            className="w-full sm:w-auto px-8 py-4 bg-ocean text-white font-bold rounded-xl shadow-lg hover:bg-ocean/90 hover:-translate-y-0.5 transition-all text-center"
          >
            Report an Incident
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white text-ocean font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-all text-center"
          >
            Supervisor Access
          </Link>
        </div>
      </div>
    </main>
  );
}