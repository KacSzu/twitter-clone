export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto flex justify-between">
      <aside>Sidebar</aside>
      <main>{children}</main>
      <div>News</div>
    </section>
  );
}
