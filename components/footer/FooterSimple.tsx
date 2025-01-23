export default function FooterSimple() {
  return (
    <footer className="flex items-center justify-center gap-4 border-t-2 border-gray/10 p-6 text-center">
      <p className="text-sm font-medium capitalize text-gray">
        &copy; Part of Pharma Metrocity Group {new Date().getFullYear()}
      </p>
    </footer>
  );
}
