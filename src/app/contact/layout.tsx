import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description:
        'Get in touch with the LaabhMitra team. Report bugs, suggest features, or help us improve scheme information.',
    alternates: { canonical: 'https://laabhmitra.in/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
