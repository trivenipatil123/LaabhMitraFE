import { redirect } from 'next/navigation';

export default function StateSchemeRedirect() {
    redirect('/schemes?tab=state');
}
