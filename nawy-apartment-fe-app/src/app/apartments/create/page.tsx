import ApartmentForm from "@/components/apartment/apartmentForm";

export default function CreateApartmentPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Apartment</h1>
            <ApartmentForm />
        </div>
    );
}
