import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="border mx-auto container">
        <nav className="flex justify-center gap-10">
            <Link href={'/'}>Main</Link>
            <Link href={'/about'}>About</Link>
        </nav>
      </header>
    </>
  )
}
