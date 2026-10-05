import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { FormBlockType } from '@/types/cms'

import { RegistrationForm } from './RegistrationForm'

export function FormBlock({ formType, introContent, successMessage, options }: FormBlockType) {
  return (
    <section className="py-16 md:py-20">
      <Container className="max-w-3xl">
        <SectionIntro html={introContent} />
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <RegistrationForm formType={formType} options={options} successMessage={successMessage} />
        </div>
      </Container>
    </section>
  )
}
