<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function successfully_register_user()
    {
        $this->post(
            '/api/auth/register',
            [
                'name' => 'Márcio da Silva',
                'email' => 'marcio@mail.com',
                'password' => '123456a',
                'password_confirmation' => '123456a'
            ]
        )->assertStatus(201);
    }

    /**
     * @test
     * @depends successfully_register_user
     */
    public function successfully_login()
    {
        $this->post(
            '/api/auth/register',
            [
                'name' => 'Márcio da Silva',
                'email' => 'marcio@mail.com',
                'password' => '123456a',
                'password_confirmation' => '123456a'
            ]
            );

        $this->post(
            '/api/auth/login',
            [
                'email' => 'marcio@mail.com',
                'password' => '123456a'
            ]
        )->assertStatus(200);
    }

}
