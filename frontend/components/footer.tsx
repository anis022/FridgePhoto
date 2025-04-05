import { Logo } from '@/components/logo'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'

const links = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Analyse',
        href: '/analyse',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link href="/" aria-label="go home" className="mx-auto block size-fit">
                    <Logo />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href} className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="https://github.com/anis022/MariHacks" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary block">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <GithubIcon className="size-6" />
                        </svg>
                    </Link>
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} FridgePhoto, All rights reserved</span>
            </div>
        </footer>
    )
}
