<x-pulse>
    <!-- Logout Button -->
    <div class="mt-3">
        <form action="{{ route('logout') }}" method="POST" class="d-inline">
            @csrf
            <button type="submit" class="btn btn-danger"
                style="background-color: #ff4d4f; border-color: #d43535; color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px; transition: background-color 0.3s ease, transform 0.3s ease;">Logout</button>
        </form>
    </div>
    <livewire:pulse.servers cols="full" />

    <livewire:pulse.usage cols="4" rows="2" />

    <livewire:pulse.queues cols="4" />

    <livewire:pulse.cache cols="4" />

    <livewire:pulse.slow-queries cols="8" />

    <livewire:pulse.exceptions cols="6" />

    <livewire:pulse.slow-requests cols="6" />

    <livewire:pulse.slow-jobs cols="6" />

    <livewire:pulse.slow-outgoing-requests cols="6" />
</x-pulse>
