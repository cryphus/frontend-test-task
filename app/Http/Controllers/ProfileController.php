<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;

/**
 * Контракт API, который ждёт фронт (resources/js/services/avanti_api.js).
 * Поля пользователя (first_name, last_name, approved_amount, document_*, iban,
 * email_change_allowed) — пример; подставьте свои колонки/связи.
 */
class ProfileController extends Controller
{
    private const CODE_TTL_MINUTES = 15;

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $this->userPayload($request->user()),
            'steps' => $this->steps($request->user()),
            'consultant' => [
                'name' => 'Schierano Deborah',
                'avatar' => asset('images/avanti_consultant_avatar.jpg'),
                'message' => 'Salve. Mi chiamo Deborah, sarò la sua consulente personale per tutta la pratica.',
                'unread' => 2,
            ],
            'notifications' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function updateName(Request $request): JsonResponse
    {
        $data = $request->validate([
            'firstName' => ['required', 'string', 'max:100'],
            'lastName' => ['required', 'string', 'max:100'],
        ]);

        $request->user()->update(['first_name' => $data['firstName'], 'last_name' => $data['lastName']]);

        return response()->json(['user' => $this->userPayload($request->user())]);
    }

    public function updateEmail(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user->email_change_allowed, 422, "L'email può essere cambiata una sola volta.");

        $data = $request->validate([
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        $user->forceFill([
            'email' => $data['email'],
            'email_verified_at' => null,
            'email_change_allowed' => false,
        ])->save();

        return response()->json(['user' => $this->userPayload($user)]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'currentPassword' => ['required', 'current_password'],
            'password' => ['required', Password::min(8)],
            'passwordConfirmation' => ['required', 'same:password'],
        ]);

        $request->user()->update(['password' => Hash::make($request->input('password'))]);

        return response()->json([], 204);
    }

    public function sendVerificationCode(Request $request): JsonResponse
    {
        $user = $request->user();
        $code = (string) random_int(100000, 999999);
        Cache::put($this->codeKey($user->id), Hash::make($code), now()->addMinutes(self::CODE_TTL_MINUTES));

        Mail::raw("Il tuo codice di verifica Avanti: {$code}", fn ($m) => $m->to($user->email)->subject('Codice di verifica'));

        return response()->json([], 204);
    }

    public function confirmVerificationCode(Request $request): JsonResponse
    {
        $data = $request->validate(['code' => ['required', 'digits:6']]);
        $user = $request->user();
        $hash = Cache::get($this->codeKey($user->id));

        if (! $hash || ! Hash::check($data['code'], $hash)) {
            return response()->json([
                'message' => 'Codice non valido.',
                'errors' => ['code' => ['Codice non valido o scaduto.']],
            ], 422);
        }

        Cache::forget($this->codeKey($user->id));
        $user->markEmailAsVerified();

        return response()->json(['user' => $this->userPayload($user)]);
    }

    private function userPayload($user): array
    {
        return [
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'email' => $user->email,
            'emailVerified' => $user->hasVerifiedEmail(),
            'emailChangeAllowed' => (bool) $user->email_change_allowed,
            'avatar' => $user->avatar_url,
            'approvedAmount' => (int) $user->approved_amount,
            'documentType' => $user->document_type,
            'documentNumber' => $user->document_number,
            'iban' => $user->iban ?? '',
        ];
    }

    /** status: done | current | pending; icon: chart | shield | user | upload | pen */
    private function steps($user): array
    {
        return [
            ['key' => 'simulation', 'short' => 'Simul.', 'title' => 'Simulazione completata', 'icon' => 'chart', 'status' => 'done'],
            ['key' => 'approval', 'short' => 'Approv.', 'title' => 'Credito approvato', 'icon' => 'shield', 'status' => 'done'],
            ['key' => 'account', 'short' => 'Account', 'title' => 'Account creato', 'icon' => 'user', 'status' => 'done'],
            ['key' => 'documents', 'short' => 'Docum.', 'title' => 'Documenti caricati', 'icon' => 'upload', 'status' => 'current'],
            ['key' => 'signature', 'short' => 'Firma', 'title' => 'Contratto firmato', 'icon' => 'pen', 'status' => 'pending'],
        ];
    }

    private function codeKey(int $userId): string
    {
        return "email-verification-code:{$userId}";
    }
}
