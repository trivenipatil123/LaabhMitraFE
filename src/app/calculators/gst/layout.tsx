import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GST Calculator — Calculate GST Inclusive & Exclusive Amounts',
    description:
        'Calculate GST for any amount at 5%, 12%, 18% or 28% rates. See CGST, SGST breakdown. Supports inclusive and exclusive modes. Free GST calculator.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/gst' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
