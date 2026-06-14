import Hero from '@/components/ui/Hero/Hero';
import Contribution from '@/components/ui/Contribution/Contribution';
import BeforeAfter from '@/components/ui/BeforeAfter/BeforeAfter';
import Timeline from '@/components/ui/Timeline/Timeline';
import HumanCost from '@/components/ui/HumanCost/HumanCost';
import GenerationWaiting from '@/components/ui/GenerationWaiting/GenerationWaiting';
import Silence from '@/components/ui/Silence/Silence';
import Voices from '@/components/ui/Voices/Voices';
import Solutions from '@/components/ui/Solutions/Solutions';
import Movement from '@/components/ui/Movement/Movement';
import CTA from '@/components/ui/CTA/CTA';

export default function Home() {
  return (
    <>
      {/* 1. Hero — Do You Remember Manipur? */}
      <Hero />

      {/* 2. What Manipur Gave India */}
      <Contribution />

      {/* 3. Before vs After — Same Land. Different Reality. */}
      <BeforeAfter />

      {/* 4. What Happened — Timeline */}
      <Timeline />

      {/* 5. The Human Cost */}
      <HumanCost />

      {/* 6. A Generation Waiting */}
      <GenerationWaiting />

      {/* 7. The Silence — Reflection */}
      <Silence />

      {/* 8. Voices of Manipur */}
      <Voices />

      {/* 9. What Needs To Happen */}
      <Solutions />

      {/* 10. India For Manipur Movement */}
      <Movement />

      {/* Final CTA */}
      <CTA />
    </>
  );
}
