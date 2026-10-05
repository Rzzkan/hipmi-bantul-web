import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { FormBlockType } from '@/types/cms'

import { RegistrationForm } from './RegistrationForm'

export function FormBlock({ formType, introContent, successMessage, options }: FormBlockType) {
  return (
    <section className="surface relative py-20">
      <Container className="max-w-3xl">
        <SectionIntro html={introContent} center />
        <div className="relative">
          {/* glow tri-warna di belakang kartu, seperti kotak pencarian katalog */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-accent to-coral opacity-20 blur-lg" aria-hidden />
          <div className="card relative rounded-3xl p-6 md:p-10">
            <RegistrationForm formType={formType} options={options} successMessage={successMessage} />
          </div>
        </div>
      </Container>
    </section>
  )
}
