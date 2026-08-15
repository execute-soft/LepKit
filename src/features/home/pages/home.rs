use leptos::prelude::*;

#[component]
pub fn Home() -> impl IntoView {
    view! {
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="bg-white p-8 rounded-xl shadow-lg">
                <h1 class="text-3xl font-bold text-gray-900">"Hello Leptos!"</h1>

                <p class="mt-4 text-gray-600">"Leptos + Tailwind CSS"</p>

                <button class="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700">
                    "Get Started"
                </button>
            </div>
        </div>
    }
}