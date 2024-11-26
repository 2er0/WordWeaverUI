'use client';

export function GetReadyView() {
    // Overlay ui with spinner to indicate loading
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center">Get Ready</h2>
                <p className="text-center mt-4">The game is about to start...</p>
            </div>
        </div>
    );
}