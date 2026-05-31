import NavigationBar from '@/components/NavigationBar'
import { Footer } from '@/components/Footer'
import { ApplicationForm } from '@/components/careers/ApplicationForm'
import { GENERAL_APPLICATION, getRoleById } from '@/lib/careers-data'

type PageProps = {
  searchParams: Promise<{ role?: string }>
}

export default async function CareersApplyPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams
  const role = getRoleById(roleParam ?? null)

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <NavigationBar />

      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 0%, oklch(0.55 0.22 253 / 0.07), transparent 55%)',
          }}
          aria-hidden
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 w-full">
          <article className="bg-white rounded-2xl md:rounded-3xl border border-gray-200/80 shadow-sm px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16">
            <ApplicationForm
              roleId={role?.id ?? null}
              roleTitle={role?.title ?? GENERAL_APPLICATION.title}
              roleDepartment={role?.department}
              roleLocation={role?.location}
              roleType={role?.type}
            />
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
