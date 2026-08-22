export default function NewFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full mt-10 flex justify-center">
            {children}
        </section>
    );
}