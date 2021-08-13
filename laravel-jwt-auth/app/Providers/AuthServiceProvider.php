<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject('[Remotely] Verificação de e-mail')
                ->line('Clique no botão abaixo para verificar seu e-mail.')
                ->action('Verificar e-mail', $url)
                ->line('Não se registrou no Remotely? Ignore esta mensagem.');
        });

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return 'http://localhost:8080/#/reset-password?email=' . $user->email . '&token='.$token;
        });
    }
}
