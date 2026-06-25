export default function NewFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-1/2 mt-10">
            {children}
        </section>
    );
}