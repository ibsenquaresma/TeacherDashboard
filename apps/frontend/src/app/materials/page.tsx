import MaterialUploadForm from "@/components/Materials/MaterialUploadForm";

export default function MaterialsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Materiais</h1>
      <MaterialUploadForm />
    </main>
  );
}
