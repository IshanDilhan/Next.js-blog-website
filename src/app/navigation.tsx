import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/about">
        <>Go to About Pagess</>
      </Link>
    </div>
  );
}